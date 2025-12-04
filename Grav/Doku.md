# Änderungen an der IHK-Projektdokumentation

Dieses Dokument sammelt alle Punkte, die sich durch die Integration der Grav-Datenbank und des Lehrer-Dashboards an der ursprünglichen Projektdokumentation ändern oder ergänzt werden müssen.

## 1. Technische Analyse & Entwurf

### Datenhaltung (Neu)
*   **Alt:** Statische `ocean-data.json` Datei.
*   **Neu:** Grav **Flex Objects**.
    *   **Begründung:** Ermöglicht strukturierte Datenspeicherung (CRUD) ohne externe SQL-Datenbank. Passt perfekt zur Flat-File-Architektur von Grav.
    *   **Vorteil:** Daten sind versionierbar (Git), einfach zu sichern und performant.

### Architektur (Ergänzung)
*   **Hybrid-Ansatz:**
    *   **Frontend (Schüler):** Angular SPA (Single Page Application).
    *   **Frontend (Lehrer):** Grav Twig Templates mit Tailwind CSS (Server-Side Rendering mit dynamischen Komponenten).
    *   **Backend:** Grav CMS als Headless-CMS (via Plugin-API) UND als klassisches CMS (für Lehrer-Seite).

## 2. Implementierung

### Grav Plugin "EOL Manager"
*   Entwicklung eines eigenen Plugins zur Kapselung der Logik.
*   Bereitstellung von API-Endpunkten für die Angular-App (`/api/oceans`).
*   Handling der Formular-Daten aus dem Lehrer-Dashboard.

### Lehrer-Dashboard
*   Umsetzung als Frontend-Route (kein Admin-Panel Zwang).
*   Einsatz von modernen UI-Elementen (Cards, Modals) im "Quark" Theme-Kontext.
*   Authentifizierungsschutz (nur für Lehrer zugänglich).

## 3. Wirtschaftlichkeitsbetrachtung

*   **Kostenersparnis:** Keine externe Datenbank-Instanz (wie MySQL oder Firebase) notwendig. Hosting bleibt einfach (PHP-Standard).
*   **Wartung:** Alles in einem System (Grav). Updates zentral verwaltbar.

## 4. Fazit & Ausblick

*   Die Lösung ist skalierbar (einfaches Hinzufügen neuer Ozeane/Fakten).
*   Hohe Benutzerfreundlichkeit für Lehrkräfte durch maßgeschneidertes Dashboard statt komplexem generischen Backend.
