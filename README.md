<a name="readme-top"></a>

<!-- PROJEKT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/T-Boyke/EhlenAngularProjekt3">
    <img src="/docs/assets/logo.webp" alt="Logo" width="320" height="160">
  </a>

  <h3 align="center">Earth Ocean Learning (EOL)</h3>

  <p align="center">
    Eine interaktive Lern-App für Kinder (7-9 Jahre) zum Entdecken der Weltmeere.
    <br />
   <a href="docs/BENUTZERHANDBUCH.md"><strong>Dokumentation (Handbuch) »</strong></a>
    <br />
    <br />
    <a href="#-demo">Live Demo</a>
    ·
    <a href="https://github.com/T-Boyke/EhlenAngularProjekt3/issues/new?template=bug_report.md">Bug melden</a>
    ·
    <a href="https://github.com/T-Boyke/EhlenAngularProjekt3/issues/new?template=feature_request.md">Feature anfragen</a>
  </p>
</div>

<!-- INHALTSVERZEICHNIS -->
<details>
  <summary>Inhaltsverzeichnis</summary>
  <ol>
    <li>
      <a href="#-über-das-projekt">Über das Projekt</a>
      <ul>
        <li><a href="#-technologie-stack">Technologie Stack</a></li>
        <li><a href="#-projektstruktur">Projektstruktur</a></li>
      </ul>
    </li>
<li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#voraussetzungen">Voraussetzungen</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#-backend-optional">Backend (Optional)</a></li>
      </ul>
    </li>
    <li><a href="#-nutzung">Nutzung</a></li>
    <li><a href="#-entwicklung--commands">Entwicklung & Commands</a></li>
    <li><a href="#-lizenz">Lizenz</a></li>
    <li><a href="#-kontakt--support">Kontakt</a></li>
  </ol>
</details>

<!-- ÜBER DAS PROJEKT -->
## ℹ️ Über das Projekt

**Earth Ocean Learning** ist eine interaktive Single Page Application (SPA), die Grundschulkindern die fünf Weltmeere spielerisch näherbringt.

Das Projekt wurde als simulierte Abschlussarbeit für die **IHK Fachinformatiker für Anwendungsentwicklung** Zertifizierung entwickelt. Es bietet eine kindgerechte Benutzeroberfläche, Gamification-Elemente und legt großen Wert auf Datenschutz (lokale Speicherung).

👉 **Detaillierte Dokumentation:** Siehe [Boyke-Tobias-Angular-EOL-App-20251209.pdf](docs/Boyke-Tobias-Angular-EOL-App-20251209.pdf).

📋 **Projektmanagement:** [Hier geht's zum Kanban Board](https://github.com/users/T-Boyke/projects/4) (Agile Planung via GitHub Projects).

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

### 🛠 Technologie Stack

Dieses Projekt basiert auf folgenden Technologien:

*   [![Angular][Angular.io]][Angular-url] **Angular 21**
*   [![TailwindCSS][TailwindCSS.com]][TailwindCSS-url] **Tailwind CSS 4**
*   [![NodeJS][Node.js]][Node-url] **Node.js**
*   [![Vitest][Vitest-badge]][Vitest-url] **Vitest**
*   [![Playwright][Playwright-badge]][Playwright-url] **Playwright**
*   **Angular Signals** (State Management)
*   **TypeScript**

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

### 📂 Projektstruktur

Das Projekt folgt einer modularen Architektur mit Standalone Components:

*   `src/app/features/`: Feature-Module (Ozean-Auswahl, Quiz, etc.)
*   `src/app/models/`: TypeScript Interfaces und Typen
*   `src/app/services/`: Services für Daten und Logik
*   `src/app/store/`: State Management mit SignalStore
*   `tests/`: E2E Tests (Playwright)

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- GETTING STARTED -->
## 🚀 Getting Started

Folge diesen Schritten, um eine lokale Kopie des Projekts zum Laufen zu bringen.

### Voraussetzungen

*   **Node.js**: (Empfohlen: Aktuelle LTS Version - v22+)
*   **npm**: Wird normalerweise mit Node.js installiert.

### Installation

1.  Repo klonen
    ```sh
    git clone https://github.com/T-Boyke/EhlenAngularProjekt3.git
    ```
2.  NPM Pakete installieren
    ```sh
    npm install
    # oder für sauberen Install:
    npm ci
    ```

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- NUTZUNG -->
## 💻 Nutzung

Starte den Entwicklungsserver:

```sh
npm start
# oder
ng serve
```

Navigiere zu `http://localhost:4200/`. Die Anwendung lädt automatisch neu, wenn Quellcode-Dateien geändert werden.

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- ENTWICKLUNG -->
## 👨‍💻 Entwicklung & Commands

**Build für Produktion:**

```sh
npm run build
```

Die Artefakte werden im `dist/` Verzeichnis gespeichert.

**Unit Tests (Vitest):**

```sh
npm test
```

**Code Coverage:**

```sh
npm run test:coverage
```

**E2E Tests (Playwright):**

```sh
npm run test:e2e
```

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

### 🔌 Backend (Optional)

Das Projekt ist für die Anbindung an ein **Grav CMS Backend (EOL Manager)** vorbereitet, um Inhalte dynamisch zu verwalten.
* Standardmäßig nutzt die App die lokale `assets/data/ocean-data.json` (Fallback-Strategie).
* Ist das Backend unter `http://127.0.0.1:8000` erreichbar, werden die Daten live von der API geladen.
* Backend-Repository: [Link zum eol-manager Repo]

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- LIZENZ -->
## 📝 Lizenz

Verteilt unter der MIT Lizenz. Siehe `LICENSE` für weitere Informationen.

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- KONTAKT -->
## 👤 Kontakt & Support

**T-Boyke** - Developer

Projektlink: [https://github.com/T-Boyke/EhlenAngularProjekt3](https://github.com/T-Boyke/EhlenAngularProjekt3)

<p align="right">(<a href="#readme-top">zurück nach oben</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.dev/
[TailwindCSS.com]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Vitest-badge]: https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white
[Vitest-url]: https://vitest.dev/
[Playwright-badge]: https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white
[Playwright-url]: https://playwright.dev/
