import { version } from "../package.json";
import "./card";
import "./editor";

window.customCards = window.customCards || [];
window.customCards.push({
  type: "purobot-max-3-card",
  name: "Purobot Max 3 Card",
  description:
    "Purpose-built control card for the Petkit Purobot Max 3 (Jezza34000/homeassistant_petkit).",
  preview: true,
  documentationURL:
    "https://github.com/tsb3500/purobot_max_3_ha_card",
});

console.info(
  `%c PUROBOT-MAX-3-CARD %c ${version} `,
  "color:#fff;background:#2e7d32;font-weight:700",
  "color:#2e7d32;background:transparent;font-weight:700",
);
