# EOL Grav Integration

Dieses Verzeichnis enthält alle notwendigen Komponenten, um das "Earth Ocean Learning" (EOL) Projekt in eine Grav CMS Installation zu integrieren.

## Inhalt

*   **plugins/eol-manager**: Ein benutzerdefiniertes Grav-Plugin.
    *   Definiert die Datenstruktur für Ozeane (Flex Objects).
    *   Stellt eine API für die Angular-App bereit.
    *   Verwaltet das Lehrer-Dashboard.
*   **themes/eol-quark**: Ein Child-Theme von Quark.
    *   Enthält die speziellen Templates für das Lehrer-Dashboard.
    *   Nutzt Tailwind CSS für modernes Design.

## Installation

1.  Kopieren Sie den Ordner `plugins/eol-manager` in Ihr Grav-Verzeichnis unter `user/plugins/`.
2.  Kopieren Sie den Ordner `themes/eol-quark` in Ihr Grav-Verzeichnis unter `user/themes/`.
3.  Aktivieren Sie das Plugin und das Theme im Grav Admin-Panel oder via CLI:
    ```bash
    bin/gpm install flex-objects
    bin/plugin enable eol-manager
    ```
4.  Setzen Sie `eol-quark` als aktives Theme in der `user/config/system.yaml`.

## Features

*   **Flex Objects**: Speicherung der Ozean-Daten als Flat-Files (YAML), aber mit Datenbank-ähnlichen Features.
*   **Lehrer-Dashboard**: Ein Frontend-Interface (erreichbar unter `/lehrer`), um Daten zu bearbeiten, ohne ins Admin-Panel zu müssen.
*   **API**: JSON-Endpunkt für die Angular-App.
