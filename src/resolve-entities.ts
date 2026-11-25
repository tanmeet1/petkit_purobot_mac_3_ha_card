import {
  FRIENDLY_NAME_TO_ROLE,
  TRANSLATION_KEY_TO_ROLE,
  UNIQUE_ID_SUFFIX_TO_ROLE,
} from "./entity-map";
import type {
  DeviceRegistryEntry,
  EntityRegistryEntry,
  EntityRole,
  HassEntity,
  HomeAssistant,
  RoleMap,
} from "./types";

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/^petkit\s+/i, "")
    .replace(/^purobot\s+max\s*3\s*/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

type MatchStrength = 3 | 2 | 1;

function roleFromRegistry(
  entry: EntityRegistryEntry,
  state: HassEntity | undefined,
  deviceName: string | null,
): { role: EntityRole; strength: MatchStrength } | undefined {
  const key = entry.translation_key?.toLowerCase();
  if (key && TRANSLATION_KEY_TO_ROLE[key]) {
    return { role: TRANSLATION_KEY_TO_ROLE[key], strength: 3 };
  }

  if (entry.unique_id) {
    for (const [pattern, role] of UNIQUE_ID_SUFFIX_TO_ROLE) {
      if (pattern.test(entry.unique_id)) {
        return { role, strength: 2 };
      }
    }
  }

  const friendly =
    (state?.attributes.friendly_name as string | undefined) ||
    entry.name ||
    entry.original_name ||
    "";
  let cleaned = normalizeName(friendly);
  if (deviceName) {
    cleaned = normalizeName(cleaned.replace(normalizeName(deviceName), ""));
  }

  if (FRIENDLY_NAME_TO_ROLE[cleaned]) {
    return { role: FRIENDLY_NAME_TO_ROLE[cleaned], strength: 1 };
  }

  // Handle Pause / Resume variants that share translation keys in some builds
  if (cleaned.startsWith("pause ")) {
    if (cleaned.includes("dump")) return { role: "pause_dumping", strength: 1 };
    if (cleaned.includes("maintenance"))
      return { role: "pause_exit_maintenance", strength: 1 };
    if (cleaned.includes("clean")) return { role: "pause_cleaning", strength: 1 };
  }
  if (cleaned.startsWith("resume ")) {
    if (cleaned.includes("dump")) return { role: "resume_dumping", strength: 1 };
    if (cleaned.includes("maintenance"))
      return { role: "resume_exit_maintenance", strength: 1 };
  }

  return undefined;
}

function domainScore(entityId: string, role: EntityRole): number {
  const domain = entityId.split(".", 1)[0];
  if (role === "litter_level" && domain === "sensor") return 2;
  if (role === "wastebin" && domain === "binary_sensor") return 2;
  if (role === "litter" && domain === "binary_sensor") return 2;
  return 1;
}

export function getDevice(
  hass: HomeAssistant,
  deviceId: string,
): DeviceRegistryEntry | undefined {
  return hass.devices?.[deviceId];
}

export function getDeviceDisplayName(
  device: DeviceRegistryEntry | undefined,
): string {
  if (!device) return "Purobot Max 3";
  return (
    device.name_by_user ||
    device.name ||
    device.model ||
    "Purobot Max 3"
  );
}

export function resolveRoles(
  hass: HomeAssistant,
  deviceId: string,
): RoleMap {
  const device = getDevice(hass, deviceId);
  const deviceName = getDeviceDisplayName(device);
  const roles: RoleMap = {};
  const strengths: Partial<Record<EntityRole, number>> = {};

  const entries = Object.values(hass.entities || {}).filter(
    (e) => e.device_id === deviceId && !e.disabled_by,
  );

  for (const entry of entries) {
    const state = hass.states[entry.entity_id];
    const match = roleFromRegistry(entry, state, deviceName);
    if (!match) continue;

    const { role, strength } = match;
    const score = strength * 10 + domainScore(entry.entity_id, role);
    const existing = strengths[role] ?? -1;
    const existingState = roles[role] ? hass.states[roles[role]!] : undefined;

    if (!roles[role] || !existingState || score > existing) {
      roles[role] = entry.entity_id;
      strengths[role] = score;
    }
  }

  return roles;
}

/** Percent for gauges: supports %, 0–1 fractions, and 0–100 numbers. */
export function gaugePercent(state: HassEntity | undefined): number | null {
  if (!state || isUnavailable(state)) return null;
  const n = Number.parseFloat(state.state);
  if (!Number.isFinite(n)) return null;

  const unit = String(state.attributes.unit_of_measurement || "")
    .trim()
    .toLowerCase();

  if (unit === "%" || unit.includes("percent")) {
    return Math.max(0, Math.min(100, n));
  }
  // Some Petkit payloads briefly expose 0–1 fractions
  if (n > 0 && n <= 1) {
    return Math.round(n * 1000) / 10;
  }
  if (n >= 0 && n <= 100) {
    return n;
  }
  return null;
}

export function getState(
  hass: HomeAssistant,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!entityId) return undefined;
  return hass.states[entityId];
}

export function isUnavailable(state: HassEntity | undefined): boolean {
  if (!state) return true;
  return state.state === "unavailable" || state.state === "unknown";
}

export function isOn(state: HassEntity | undefined): boolean {
  return state?.state === "on" || state?.state === "true";
}

export function formatState(
  hass: HomeAssistant,
  state: HassEntity | undefined,
): string {
  if (!state) return "—";
  if (hass.formatEntityState) {
    try {
      return hass.formatEntityState(state);
    } catch {
      // fall through
    }
  }
  const unit = state.attributes.unit_of_measurement;
  if (unit) return `${state.state} ${unit}`;
  return state.state;
}

export function parseNumeric(state: HassEntity | undefined): number | null {
  if (!state || isUnavailable(state)) return null;
  const n = Number.parseFloat(state.state);
  return Number.isFinite(n) ? n : null;
}

/**
 * Device is considered busy when primary action buttons are unavailable
 * while power is on, or state text suggests an active cycle.
 */
export function isDeviceBusy(
  hass: HomeAssistant,
  roles: RoleMap,
): boolean {
  const state = getState(hass, roles.state);
  if (state && !isUnavailable(state)) {
    const s = state.state.toLowerCase();
    if (
      s.includes("clean") ||
      s.includes("dump") ||
      s.includes("maintenance") ||
      s.includes("level") ||
      s.includes("deodor") ||
      s.includes("working") ||
      s.includes("busy") ||
      s.includes("pause")
    ) {
      return true;
    }
    if (s === "idle" || s === "ok" || s === "standby" || s === "ready") {
      return false;
    }
  }

  const clean = getState(hass, roles.clean);
  if (clean && clean.state === "unavailable") {
    const power = getState(hass, roles.power);
    if (power && isOn(power)) return true;
  }

  const pauseRoles: EntityRole[] = [
    "pause_cleaning",
    "pause_dumping",
    "pause_exit_maintenance",
  ];
  return pauseRoles.some((role) => {
    const s = getState(hass, roles[role]);
    return s && !isUnavailable(s);
  });
}

export function isPetkitLitterDevice(device: DeviceRegistryEntry): boolean {
  const identifiers = device.identifiers || [];
  const isPetkit = identifiers.some(([domain]) => domain === "petkit");
  if (!isPetkit) return false;

  const haystack = [
    device.model,
    device.name,
    device.name_by_user,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Prefer Max 3 / litter boxes; still allow other Petkit litter devices
  return (
    haystack.includes("purobot") ||
    haystack.includes("pura") ||
    haystack.includes("litter") ||
    haystack.includes("max 3") ||
    haystack.includes("t4")
  );
}
