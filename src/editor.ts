import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  getDeviceDisplayName,
  isPetkitLitterDevice,
} from "./resolve-entities";
import type {
  CardConfig,
  DeviceRegistryEntry,
  HomeAssistant,
  LovelaceCardConfig,
} from "./types";

@customElement("purobot-max-3-card-editor")
export class PurobotMax3CardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config?: CardConfig;

  public setConfig(config: LovelaceCardConfig): void {
    this._config = config as CardConfig;
  }

  private _devices(): DeviceRegistryEntry[] {
    if (!this.hass?.devices) return [];
    return Object.values(this.hass.devices)
      .filter(isPetkitLitterDevice)
      .sort((a, b) =>
        getDeviceDisplayName(a).localeCompare(getDeviceDisplayName(b)),
      );
  }

  private _update(patch: Partial<CardConfig>): void {
    if (!this._config) return;
    const next = { ...this._config, ...patch };
    this._config = next;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const devices = this._devices();

    return html`
      <div class="form">
        <label>
          Device
          <select
            .value=${this._config.device_id || ""}
            @change=${(ev: Event) => {
              const target = ev.target as HTMLSelectElement;
              this._update({ device_id: target.value });
            }}
          >
            <option value="" disabled ?selected=${!this._config.device_id}>
              Select Petkit litter device
            </option>
            ${devices.map(
              (d) => html`
                <option
                  value=${d.id}
                  ?selected=${d.id === this._config!.device_id}
                >
                  ${getDeviceDisplayName(d)}${d.model ? ` (${d.model})` : ""}
                </option>
              `,
            )}
          </select>
        </label>

        <label>
          Title (optional)
          <input
            type="text"
            .value=${this._config.title || ""}
            placeholder="Defaults to device name"
            @input=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._update({ title: target.value || undefined });
            }}
          />
        </label>

        ${!devices.length
          ? html`<p class="hint">
              No Petkit litter devices found. Install and configure
              <a
                href="https://github.com/Jezza34000/homeassistant_petkit"
                target="_blank"
                rel="noreferrer"
                >homeassistant_petkit</a
              >
              first.
            </p>`
          : nothing}
      </div>
    `;
  }

  static styles = css`
    .form {
      display: grid;
      gap: 12px;
      padding: 4px 0;
    }

    label {
      display: grid;
      gap: 4px;
      font-size: 0.9rem;
      color: var(--primary-text-color);
    }

    input,
    select {
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.35));
      background: var(--card-background-color, transparent);
      color: var(--primary-text-color);
      font: inherit;
    }

    .hint {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
      margin: 0;
    }

    a {
      color: var(--primary-color);
    }
  `;
}
