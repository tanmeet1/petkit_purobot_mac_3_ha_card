export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface CardConfig extends LovelaceCardConfig {
  type: "custom:purobot-max-3-card";
  device_id: string;
  title?: string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    unit_of_measurement?: string;
    icon?: string;
    options?: string[];
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface EntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  unique_id?: string;
  translation_key?: string | null;
  platform?: string;
  entity_category?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
  name?: string | null;
  original_name?: string | null;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  area_id?: string | null;
  identifiers?: [string, string][];
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  localize: (key: string, ...args: unknown[]) => string;
  language: string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
}

export type EntityRole =
  | "state"
  | "error"
  | "power"
  | "rssi"
  | "litter_level"
  | "litter"
  | "litter_weight"
  | "wastebin"
  | "wastebin_presence"
  | "bag_state"
  | "package_used"
  | "n50"
  | "n60"
  | "last_event"
  | "last_used_by"
  | "times_used"
  | "average_use"
  | "total_use"
  | "clean"
  | "dump"
  | "level"
  | "deodorize"
  | "start_maintenance"
  | "exit_maintenance"
  | "reset_n50"
  | "reset_n60"
  | "pause_cleaning"
  | "pause_dumping"
  | "pause_exit_maintenance"
  | "resume_dumping"
  | "resume_exit_maintenance"
  | "auto_clean"
  | "avoid_repeat"
  | "periodic_cleaning"
  | "auto_deodor"
  | "periodic_deodorizing"
  | "deep_deodor"
  | "cleaning_delay"
  | "cleaning_interval"
  | "continuous_rotation"
  | "deep_cleaning"
  | "enhanced_adsorption"
  | "light_weight"
  | "child_lock"
  | "display"
  | "do_not_disturb"
  | "kitten_mode"
  | "litter_type";

export type RoleMap = Partial<Record<EntityRole, string>>;

declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }

  interface HTMLElementTagNameMap {
    "purobot-max-3-card": HTMLElement;
    "purobot-max-3-card-editor": HTMLElement;
    "hui-error-card": HTMLElement;
    "ha-card": HTMLElement;
    "ha-icon": HTMLElement;
  }
}
