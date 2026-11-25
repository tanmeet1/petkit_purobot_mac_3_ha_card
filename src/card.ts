import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ROLE_ICONS, ROLE_LABELS } from "./entity-map";
import {
  formatState,
  gaugePercent,
  getDevice,
  getDeviceDisplayName,
  getState,
  isDeviceBusy,
  isOn,
  isUnavailable,
  parseNumeric,
  resolveRoles,
} from "./resolve-entities";
import { cardStyles } from "./styles";
import type {
  CardConfig,
  EntityRole,
  HassEntity,
  HomeAssistant,
  LovelaceCardConfig,
  RoleMap,
} from "./types";

@customElement("purobot-max-3-card")
export class PurobotMax3Card extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: CardConfig;
  @state() private _moreOpen = false;

  public static getStubConfig(
    _hass: HomeAssistant,
    _entities: string[],
    _entitiesFallback: string[],
    deviceId?: string,
  ): Partial<CardConfig> {
    return {
      type: "custom:purobot-max-3-card",
      device_id: deviceId || "",
    };
  }

  public setConfig(config: LovelaceCardConfig): void {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration");
    }
    if (!("device_id" in config) || !config.device_id) {
      throw new Error("Please define a Petkit device_id");
    }
    this._config = config as CardConfig;
  }

  public getCardSize(): number {
    return 6;
  }

  public static async getConfigElement() {
    await import("./editor");
    return document.createElement("purobot-max-3-card-editor");
  }

  protected shouldUpdate(): boolean {
    return Boolean(this._config && this.hass);
  }

  private _roles(): RoleMap {
    if (!this.hass || !this._config) return {};
    return resolveRoles(this.hass, this._config.device_id);
  }

  private async _call(
    domain: string,
    service: string,
    entityId: string,
    data: Record<string, unknown> = {},
  ): Promise<void> {
    await this.hass.callService(domain, service, {
      entity_id: entityId,
      ...data,
    });
  }

  private async _press(entityId: string | undefined): Promise<void> {
    if (!entityId) return;
    await this._call("button", "press", entityId);
  }

  private async _toggle(entityId: string | undefined): Promise<void> {
    if (!entityId) return;
    await this._call("switch", "toggle", entityId);
  }

  private async _setNumber(
    entityId: string | undefined,
    value: number,
  ): Promise<void> {
    if (!entityId) return;
    await this._call("number", "set_value", entityId, { value });
  }

  private async _selectOption(
    entityId: string | undefined,
    option: string,
  ): Promise<void> {
    if (!entityId) return;
    await this._call("select", "select_option", entityId, { option });
  }

  private _entity(
    roles: RoleMap,
    role: EntityRole,
  ): HassEntity | undefined {
    return getState(this.hass, roles[role]);
  }

  private _has(roles: RoleMap, role: EntityRole): boolean {
    return Boolean(roles[role] && this.hass.states[roles[role]!]);
  }

  private _hasAny(roles: RoleMap, roleList: EntityRole[]): boolean {
    return roleList.some((role) => this._has(roles, role));
  }

  private _gaugeTone(
    value: number | null,
    invert = false,
  ): "ok" | "warn" | "danger" {
    if (value === null) return "ok";
    if (!invert) {
      if (value <= 15) return "danger";
      if (value <= 35) return "warn";
      return "ok";
    }
    // wastebin: higher is worse
    if (value >= 90) return "danger";
    if (value >= 70) return "warn";
    return "ok";
  }

  private _renderGauge(
    label: string,
    state: HassEntity | undefined,
    invert = false,
  ): TemplateResult | typeof nothing {
    if (!state) return nothing;

    const domain = state.entity_id.split(".", 1)[0];

    // Wastebin / litter-low are binary problem sensors, not fill %
    if (domain === "binary_sensor") {
      const problem = isOn(state);
      const display = invert
        ? problem
          ? "Full"
          : "OK"
        : problem
          ? "Low"
          : "OK";
      const tone = problem ? "danger" : "ok";
      const pct = invert ? (problem ? 100 : 5) : problem ? 10 : 100;
      return html`
        <div class="gauge" title=${state.entity_id}>
          <div class="gauge-label">
            <span>${label}</span>
            <span class="gauge-value">${display}</span>
          </div>
          <div class="bar ${tone === "ok" ? "" : tone}">
            <span style="width: ${pct}%"></span>
          </div>
        </div>
      `;
    }

    const value = gaugePercent(state);
    const pct = value === null ? 0 : value;
    const tone = this._gaugeTone(value, invert);
    const display =
      value === null
        ? formatState(this.hass, state)
        : `${Math.round(pct)}%`;

    return html`
      <div class="gauge" title=${state.entity_id}>
        <div class="gauge-label">
          <span>${label}</span>
          <span class="gauge-value">${display}</span>
        </div>
        <div class="bar ${tone === "ok" ? "" : tone}">
          <span style="width: ${value === null ? 0 : pct}%"></span>
        </div>
      </div>
    `;
  }

  private _renderAction(
    roles: RoleMap,
    role: EntityRole,
    label?: string,
  ): TemplateResult | typeof nothing {
    if (!this._has(roles, role)) return nothing;
    const entityId = roles[role]!;
    const state = this._entity(roles, role);
    const disabled = isUnavailable(state);
    const icon = ROLE_ICONS[role] || "mdi:circle";
    return html`
      <button
        class="action"
        ?disabled=${disabled}
        title=${ROLE_LABELS[role]}
        @click=${() => this._press(entityId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label || ROLE_LABELS[role]}</span>
      </button>
    `;
  }

  private _renderSwitch(
    roles: RoleMap,
    role: EntityRole,
  ): TemplateResult | typeof nothing {
    if (!this._has(roles, role)) return nothing;
    const entityId = roles[role]!;
    const state = this._entity(roles, role)!;
    const disabled = isUnavailable(state);
    return html`
      <div class="row">
        <div class="row-label">${ROLE_LABELS[role]}</div>
        <label class="switch">
          <input
            type="checkbox"
            .checked=${isOn(state)}
            ?disabled=${disabled}
            @change=${() => this._toggle(entityId)}
          />
          <span class="slider"></span>
        </label>
      </div>
    `;
  }

  private _renderNumber(
    roles: RoleMap,
    role: EntityRole,
  ): TemplateResult | typeof nothing {
    if (!this._has(roles, role)) return nothing;
    const entityId = roles[role]!;
    const state = this._entity(roles, role)!;
    const disabled = isUnavailable(state);
    const min = Number(state.attributes.min ?? 0);
    const max = Number(state.attributes.max ?? 100);
    const step = Number(state.attributes.step ?? 1);
    const value = parseNumeric(state) ?? min;
    const unit = state.attributes.unit_of_measurement || "";

    return html`
      <div class="row">
        <div class="row-label">
          ${ROLE_LABELS[role]}
          <span class="stat-label">${formatState(this.hass, state)}</span>
        </div>
        <div class="row-control">
          <input
            type="range"
            .min=${String(min)}
            .max=${String(max)}
            .step=${String(step)}
            .value=${String(value)}
            ?disabled=${disabled}
            @change=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._setNumber(entityId, Number(target.value));
            }}
          />
          ${unit ? html`<span class="stat-label">${unit}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _renderSelect(
    roles: RoleMap,
    role: EntityRole,
  ): TemplateResult | typeof nothing {
    if (!this._has(roles, role)) return nothing;
    const entityId = roles[role]!;
    const state = this._entity(roles, role)!;
    const disabled = isUnavailable(state);
    const options = (state.attributes.options as string[] | undefined) || [];

    return html`
      <div class="row">
        <div class="row-label">${ROLE_LABELS[role]}</div>
        <select
          class="ha-select"
          ?disabled=${disabled}
          .value=${state.state}
          @change=${(ev: Event) => {
            const target = ev.target as HTMLSelectElement;
            this._selectOption(entityId, target.value);
          }}
        >
          ${options.length
            ? options.map(
                (opt) =>
                  html`<option value=${opt} ?selected=${opt === state.state}>
                    ${opt}
                  </option>`,
              )
            : html`<option value=${state.state}>${state.state}</option>`}
        </select>
      </div>
    `;
  }

  private _renderStat(
    roles: RoleMap,
    role: EntityRole,
  ): TemplateResult | typeof nothing {
    if (!this._has(roles, role)) return nothing;
    const state = this._entity(roles, role);
    return html`
      <div class="stat">
        <div class="stat-label">${ROLE_LABELS[role]}</div>
        <div class="stat-value">${formatState(this.hass, state)}</div>
      </div>
    `;
  }

  private _renderActions(roles: RoleMap): TemplateResult {
    const busy = isDeviceBusy(this.hass, roles);

    if (busy) {
      const pauseResume = html`
        ${this._renderAction(roles, "pause_cleaning")}
        ${this._renderAction(roles, "pause_dumping")}
        ${this._renderAction(roles, "pause_exit_maintenance")}
        ${this._renderAction(roles, "clean", "Resume")}
        ${this._renderAction(roles, "resume_dumping")}
        ${this._renderAction(roles, "resume_exit_maintenance")}
      `;
      return html`<div class="actions">${pauseResume}</div>`;
    }

    return html`
      <div class="actions">
        ${this._renderAction(roles, "clean")}
        ${this._renderAction(roles, "level")}
        ${this._renderAction(roles, "dump")}
        ${this._renderAction(roles, "deodorize")}
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html``;
    }

    const device = getDevice(this.hass, this._config.device_id);
    if (!device) {
      return html`
        <ha-card>
          <div class="warning">
            Device not found. Check <code>device_id</code> for your Petkit
            Purobot Max 3.
          </div>
        </ha-card>
      `;
    }

    const roles = this._roles();
    const title =
      this._config.title || getDeviceDisplayName(device);
    const state = this._entity(roles, "state");
    const error = this._entity(roles, "error");
    const power = this._entity(roles, "power");
    const errorText =
      error && !isUnavailable(error) && error.state.toLowerCase() !== "ok"
        ? formatState(this.hass, error)
        : null;
    const powerOn = power ? isOn(power) : true;

    return html`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${title}</div>
            ${device.model
              ? html`<div class="subtitle">${device.model}</div>`
              : nothing}
          </div>
          <div class="chips">
            ${power
              ? html`<span class="chip ${powerOn ? "ok" : ""}"
                  >${powerOn ? "Online" : "Off"}</span
                >`
              : nothing}
            ${state
              ? html`<span class="chip">${formatState(this.hass, state)}</span>`
              : nothing}
            ${errorText
              ? html`<span class="chip error">${errorText}</span>`
              : nothing}
          </div>
        </div>

        <div class="section">
          <div class="gauges">
            ${this._renderGauge(
              "Litter level",
              this._entity(roles, "litter_level"),
            )}
            ${this._renderGauge(
              "Wastebin",
              this._entity(roles, "wastebin"),
              true,
            )}
          </div>
          <div class="consumables">
            ${this._renderStat(roles, "litter")}
            ${this._renderStat(roles, "n50")}
            ${this._renderStat(roles, "n60")}
            ${this._renderStat(roles, "litter_weight")}
          </div>
        </div>

        ${this._hasAny(roles, [
          "clean",
          "level",
          "dump",
          "deodorize",
          "pause_cleaning",
          "pause_dumping",
          "pause_exit_maintenance",
          "resume_dumping",
          "resume_exit_maintenance",
        ])
          ? html`
              <div class="section">
                <div class="section-title">Actions</div>
                ${this._renderActions(roles)}
              </div>
            `
          : nothing}

        ${this._hasAny(roles, [
          "auto_clean",
          "avoid_repeat",
          "auto_deodor",
          "do_not_disturb",
        ])
          ? html`
              <div class="section">
                <div class="section-title">Quick toggles</div>
                <div class="toggles">
                  ${this._renderSwitch(roles, "auto_clean")}
                  ${this._renderSwitch(roles, "avoid_repeat")}
                  ${this._renderSwitch(roles, "auto_deodor")}
                  ${this._renderSwitch(roles, "do_not_disturb")}
                </div>
              </div>
            `
          : nothing}

        ${this._hasAny(roles, [
          "periodic_cleaning",
          "cleaning_delay",
          "cleaning_interval",
          "periodic_deodorizing",
        ])
          ? html`
              <div class="section">
                <div class="section-title">Schedule</div>
                <div class="toggles">
                  ${this._renderSwitch(roles, "periodic_cleaning")}
                  ${this._renderNumber(roles, "cleaning_delay")}
                  ${this._renderSelect(roles, "cleaning_interval")}
                  ${this._renderSwitch(roles, "periodic_deodorizing")}
                </div>
              </div>
            `
          : nothing}

        ${this._hasAny(roles, [
          "last_used_by",
          "last_event",
          "times_used",
          "average_use",
        ])
          ? html`
              <div class="section">
                <div class="section-title">Activity</div>
                <div class="activity-grid">
                  ${this._renderStat(roles, "last_used_by")}
                  ${this._renderStat(roles, "last_event")}
                  ${this._renderStat(roles, "times_used")}
                  ${this._renderStat(roles, "average_use")}
                </div>
              </div>
            `
          : nothing}

        <details
          class="more"
          ?open=${this._moreOpen}
          @toggle=${(ev: Event) => {
            this._moreOpen = (ev.target as HTMLDetailsElement).open;
          }}
        >
          <summary>More</summary>
          <div class="section">
            <div class="actions">
              ${this._renderAction(roles, "start_maintenance")}
              ${this._renderAction(roles, "exit_maintenance")}
              ${this._renderAction(roles, "reset_n50")}
              ${this._renderAction(roles, "reset_n60")}
            </div>
          </div>
          <div class="toggles">
            ${this._renderSwitch(roles, "child_lock")}
            ${this._renderSwitch(roles, "display")}
            ${this._renderSwitch(roles, "kitten_mode")}
            ${this._renderSwitch(roles, "continuous_rotation")}
            ${this._renderSwitch(roles, "deep_cleaning")}
            ${this._renderSwitch(roles, "deep_deodor")}
            ${this._renderSwitch(roles, "enhanced_adsorption")}
            ${this._renderSwitch(roles, "light_weight")}
            ${this._renderSelect(roles, "litter_type")}
          </div>
        </details>
      </ha-card>
    `;
  }

  static styles = cardStyles;
}
