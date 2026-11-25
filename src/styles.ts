import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
  }

  ha-card {
    padding: 12px 14px 14px;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.3;
    color: var(--primary-text-color);
  }

  .subtitle {
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    margin-top: 2px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: flex-end;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 0.75rem;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
    color: var(--primary-text-color);
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chip.error {
    background: color-mix(in srgb, var(--error-color, #db4437) 22%, transparent);
    color: var(--error-color, #db4437);
  }

  .chip.warn {
    background: color-mix(in srgb, var(--warning-color, #ffa600) 22%, transparent);
  }

  .chip.ok {
    background: color-mix(in srgb, var(--success-color, #43a047) 18%, transparent);
  }

  .section {
    margin-top: 12px;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--secondary-text-color);
    margin-bottom: 8px;
  }

  .gauges {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .gauge {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    border-radius: 10px;
    padding: 10px;
  }

  .gauge-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--secondary-text-color);
    margin-bottom: 6px;
  }

  .gauge-value {
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .bar {
    height: 8px;
    border-radius: 999px;
    background: rgba(127, 127, 127, 0.25);
    overflow: hidden;
  }

  .bar > span {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--primary-color);
  }

  .bar.warn > span {
    background: var(--warning-color, #ffa600);
  }

  .bar.danger > span {
    background: var(--error-color, #db4437);
  }

  .consumables {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 8px;
    margin-top: 8px;
  }

  .stat {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    border-radius: 10px;
    padding: 8px 10px;
  }

  .stat-label {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }

  .stat-value {
    font-size: 0.95rem;
    font-weight: 600;
    margin-top: 2px;
    color: var(--primary-text-color);
    word-break: break-word;
  }

  .actions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
    gap: 8px;
  }

  button.action {
    appearance: none;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
    background: var(--card-background-color, var(--ha-card-background, white));
    color: var(--primary-text-color);
    border-radius: 10px;
    padding: 10px 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font: inherit;
    font-size: 0.75rem;
    min-height: 64px;
  }

  button.action:hover:not(:disabled) {
    border-color: var(--primary-color);
  }

  button.action:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  button.action ha-icon {
    --mdc-icon-size: 22px;
    width: 22px;
    height: 22px;
  }

  .toggles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-height: 36px;
    padding: 2px 0;
  }

  .row-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: var(--primary-text-color);
  }

  .row-control {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  input[type="range"] {
    width: 110px;
  }

  select.ha-select {
    max-width: 150px;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.35));
    background: var(--card-background-color, transparent);
    color: var(--primary-text-color);
    font: inherit;
  }

  .switch {
    position: relative;
    width: 40px;
    height: 22px;
    flex-shrink: 0;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    inset: 0;
    cursor: pointer;
    background: rgba(127, 127, 127, 0.35);
    border-radius: 999px;
    transition: 0.15s;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background: white;
    border-radius: 50%;
    transition: 0.15s;
  }

  .switch input:checked + .slider {
    background: var(--primary-color);
  }

  .switch input:checked + .slider::before {
    transform: translateX(18px);
  }

  .switch input:disabled + .slider {
    opacity: 0.45;
    cursor: not-allowed;
  }

  details.more {
    margin-top: 12px;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
    padding-top: 8px;
  }

  details.more > summary {
    cursor: pointer;
    list-style: none;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    user-select: none;
  }

  details.more > summary::-webkit-details-marker {
    display: none;
  }

  .warning {
    padding: 12px;
    color: var(--error-color, #db4437);
    font-size: 0.9rem;
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 420px) {
    .gauges,
    .activity-grid {
      grid-template-columns: 1fr;
    }
  }
`;
