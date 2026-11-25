# Purobot Max 3 Card

Purpose-built Home Assistant Lovelace card for the **Petkit Purobot Max 3**, tightly coupled to [Jezza34000/homeassistant_petkit](https://github.com/Jezza34000/homeassistant_petkit).

## Features

- Status chips (power / state / error)
- Litter level & wastebin gauges, N50/N60 consumables
- Actions: Clean, Level, Dump, Deodorize (shown when entities exist)
- Busy-state Pause / Resume controls
- Quick toggles: Auto clean, Avoid repeat, Auto deodorize, Do not disturb
- Schedule: Periodic cleaning, Cleaning delay, Cleaning interval, Periodic deodorizing
- Activity: last used by, last event, times used, average use
- More: maintenance, reset N50/N60, child lock, display, kitten mode, and advanced switches

Configure with a single Petkit `device_id`. Entities are matched by Petkit `translation_key` / unique_id suffix, with friendly-name fallbacks.

## Requirements

- Home Assistant 2024.1+
- [homeassistant_petkit](https://github.com/Jezza34000/homeassistant_petkit) with a Purobot Max 3 (or compatible T4-family litter box)

## Installation

### HACS (recommended)

1. HACS → Frontend → ⋮ → Custom repositories
2. Add this repository URL, category **Dashboard**
3. Install **Purobot Max 3 Card**
4. Restart Home Assistant / refresh the browser cache if needed

### Manual

1. Download `purobot-max-3-card.js` from the latest release (or build locally)
2. Copy to `config/www/purobot-max-3-card/purobot-max-3-card.js`
3. Add a Lovelace resource:

```yaml
url: /local/purobot-max-3-card/purobot-max-3-card.js
type: module
```

## Configuration

### UI editor

Add card → **Custom: Purobot Max 3 Card** → pick your Petkit litter device.

### YAML

```yaml
type: custom:purobot-max-3-card
device_id: YOUR_HA_DEVICE_ID
title: Living Room Litter  # optional
```

### Finding `device_id`

1. Settings → Devices & services → Devices → open **PETKIT PUROBOT MAX 3**
2. Copy the last segment of the URL:

```text
/config/devices/device/0123456789abcdef0123456789abcdef
                      └──────────── device_id ────────────┘
```

Or use Developer tools → Template:

```text
{{ device_id('sensor.your_litter_level_entity') }}
```

## Development

```bash
npm install
npm run build
```

Output: `dist/purobot-max-3-card.js`

## License

MIT
