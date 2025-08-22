# Leergut Manager

Electron + React (Vite + TypeScript). Moderner Client mit Topbar, Navigation und Leergut-Logik.
- Artikel: **Europalette**, **Gitterbox**, **Pendelverpackung**
- Lieferantenverwaltung
- Bewegungen (Eingang/Ausgang)
- Automatische Salden pro Lieferant
- Daten lokal via localStorage

## Lokal starten
```bash
npm install
npm run build        # baut das React-Frontend nach ./build
npm run electron:build  # erstellt Windows-Installer in ./release
```

## Entwicklung (Hot-Reload)
```bash
npm install
npm run dev          # startet Vite Dev-Server
# in zweitem Terminal:
npm run electron:dev
```

## GitHub Actions
Workflow erzeugt unter Windows einen Installer und lädt ihn als Artifact hoch.
