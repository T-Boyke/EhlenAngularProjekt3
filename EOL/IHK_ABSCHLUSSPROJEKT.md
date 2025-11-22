# Dokumentation zur betrieblichen Projektarbeit
**Ausbildungsberuf:** Fachinformatiker für Anwendungsentwicklung

## Thema der Projektarbeit
**Entwicklung einer interaktiven Webanwendung ("Earth Ocean Learning") zur spielerischen Vermittlung von Ozean-Wissen für Grundschulkinder.**

---

## Inhaltsverzeichnis

1.  [Einleitung](#1-einleitung)
    *   1.1 [Ausgangssituation & Projektumfeld](#11-ausgangssituation--projektumfeld)
    *   1.2 [Projektziel](#12-projektziel)
    *   1.3 [Projektbegründung](#13-projektbegründung)
2.  [Projektplanung](#2-projektplanung)
    *   2.1 [Ist-Analyse](#21-ist-analyse)
    *   2.2 [Soll-Konzept](#22-soll-konzept)
    *   2.3 [Zeitplanung](#23-zeitplanung)
    *   2.4 [Kostenplanung](#24-kostenplanung)
3.  [Analyse & Entwurf](#3-analyse--entwurf)
    *   3.1 [Anwendungsfalldiagramm (Use Cases)](#31-anwendungsfalldiagramm-use-cases)
    *   3.2 [Architekturentwurf](#32-architekturentwurf)
    *   3.3 [UI/UX Design](#33-uiux-design)
    *   3.4 [Datenmodell](#34-datenmodell)
4.  [Realisierung](#4-realisierung)
5.  [Qualitätssicherung](#5-qualitätssicherung)
6.  [Wirtschaftlichkeitsbetrachtung](#6-wirtschaftlichkeitsbetrachtung)
7.  [Fazit & Ausblick](#7-fazit--ausblick)

Die Beispiel GmbH wurde von einem Kunden, einer Umweltschutz-NGO, beauftragt, eine Browser-Applikation für das spielerische Erlernen von Ozean-Fakten für Grundschulkinder zu entwickeln. Das Unternehmen nutzt für ihre interne Ausbildung und auch für Kundenprojekte häufig das Flat-File-CMS GRAV. Aktuell fehlt es an interaktiven, technischen Demonstrations-Anwendungen, die zur Auflockerung von Inhalten oder zur Veranschaulichung von Algorithmen in Blogbeiträgen eingebettet werden können.

Zu den Stakeholdern des Projekts zählen:
*   **Der Auftraggeber (NGO)**: Vertreten durch Herrn Dr. Uwe Umwelt.
*   **Die Marketing-Mitarbeiter der NGO**: Welche die Anwendung zukünftig nutzen und bewerben werden.
*   **Die Endnutzer**: Grundschulkinder im Alter von 7-9 Jahren.

### 1.2 Projektziel
Ziel des Projektes ist die Entwicklung einer Single Page Application (SPA) namens "Earth Ocean Learning". Die Anwendung soll Kindern spielerisch Wissen über die fünf Weltmeere vermitteln. Kernfunktionen umfassen eine interaktive Auswahl der Ozeane, einen Lernbereich mit Fakten und Bewohnern sowie ein Quiz-Modul zur Wissensüberprüfung. Die Anwendung muss als eigenständiges Modul (Standalone) konzipiert sein, um eine einfache Integration in bestehende CMS-Systeme (wie GRAV) zu ermöglichen.

### 1.3 Projektbegründung
Die Digitalisierung im Bildungssektor erfordert moderne, webbasierte Lernlösungen, die plattformunabhängig funktionieren. Herkömmliche Lernmaterialien (PDFs, statische Webseiten) bieten oft nicht den nötigen Anreiz für die Zielgruppe (Kinder). Durch den Einsatz moderner Webtechnologien (Angular, SignalStore) soll eine performante, wartbare und zukunftssichere Lösung geschaffen werden, die gleichzeitig als Referenzprojekt für die Beispiel GmbH dient, um die Kompetenz im Bereich "Edutainment" zu unterstreichen.

---

## 2. Projektplanung

### 2.1 Ist-Analyse
Zum Zeitpunkt des Projektstarts existiert keine Softwarelösung für den genannten Anwendungsfall. Die Inhalte (Texte, Bilder zu Ozeanen) liegen lediglich in unstrukturierter Form (Textdokumente, Bilddateien) vor. Es gibt keinen bestehenden Codebase, auf dem aufgebaut werden kann ("Greenfield Project").

**Technische Ausgangslage:**
*   Entwickler-Workstation mit Windows 11 und Rocky Linux 10.
*   Zugriff auf Standard-Entwicklungstools (VS Code, GitHub, Node.js, NPM).
*   Keine bestehende CI/CD Pipeline für dieses spezifische Projekt.

### 2.2 Soll-Konzept
Es soll eine Webanwendung entwickelt werden, die folgende Anforderungen erfüllt:

**Funktionale Anforderungen:**
*   **Ozean-Auswahl**: Visuelle Darstellung und Auswahl der 5 Weltmeere.
*   **Lernmodus**: Anzeige von Fakten und Bewohnern pro Ozean (Carousel/Slider).
*   **Quiz-System**: Multiple-Choice Fragen mit direktem Feedback.
*   **Fortschritt**: Speicherung des Lernfortschritts (Sterne-System) im lokalen Browser-Storage (kein Backend-Zwang).
*   **Master-Quiz**: Ein freischaltbarer Modus nach Abschluss aller Ozeane.

**Nicht-funktionale Anforderungen:**
*   **Zielgruppe**: Kindgerechtes UI/UX (große Buttons, wenig Text, viel Bild).
*   **Technologie**: Angular 21 (aktuellste Version), Nutzung von Standalone Components.
*   **State Management**: Nutzung von Angular Signals / SignalStore für reaktives Datenmanagement.
*   **Performance**: Kurze Ladezeiten, optimierte Assets.
*   **Responsive Design**: Lauffähig auf Tablets und Desktops.

### 2.3 Zeitplanung
Der Durchführungszeitraum des Projektes ist vom **17.11.2025 bis 09.12.2025**.
Die geplante Gesamtzeit beträgt **70 Stunden**.

| Phase | Tätigkeit | Geplante Zeit (h) |
| :--- | :--- | :--- |
| **1. Analyse & Planung** | | **11 h** |
| | Ist-Analyse & Soll-Konzept | 3 h |
| | Erstellung Pflichtenheft / Fachkonzept | 4 h |
| | Wirtschaftlichkeitsbetrachtung (Planung) | 2 h |
| | Zeit- & Ressourcenplanung | 2 h |
| **2. Entwurf** | | **12 h** |
| | UI/UX Design (Mockups) | 5 h |
| | Software-Architektur & Datenmodellierung | 4 h |
| | Auswahl der Bibliotheken & Tools | 3 h |
| **3. Implementierung** | | **28 h** |
| | Aufsetzen der Entwicklungsumgebung | 2 h |
| | Implementierung Core-Komponenten & Routing | 6 h |
| | Implementierung Logik (SignalStore, Services) | 8 h |
| | Implementierung UI & Styling (Tailwind) | 8 h |
| | Integration der Daten (JSON) | 4 h |
| **4. Qualitätssicherung** | | **9 h** |
| | Erstellung von Testfällen | 3 h |
| | Durchführung Tests & Bugfixing | 6 h |
| **5. Dokumentation** | | **10 h** |
| | Erstellung Projektdokumentation | 8 h |
| | Erstellung Benutzerhandbuch | 2 h |
| **Gesamt** | | **70 h** |

### Gantt-Diagramm (Zeitverlauf)

```mermaid
gantt
    title Projektzeitplan Earth Ocean Learning
    dateFormat  YYYY-MM-DD
    axisFormat  %d.%m.
    
    section Analyse & Planung
    Ist-Analyse & Soll-Konzept       :a1, 2025-11-17, 1d
    Pflichtenheft & Fachkonzept      :a2, after a1, 1d
    Wirtschaftlichkeitsbetrachtung   :a3, after a2, 1d
    
    section Entwurf
    UI/UX Design (Mockups)           :b1, 2025-11-20, 2d
    Architektur & Datenmodell        :b2, after b1, 1d
    
    section Implementierung
    Setup & Core Components          :c1, 2025-11-23, 2d
    Logik (SignalStore)              :c2, after c1, 3d
    UI & Styling (Tailwind)          :c3, after c2, 3d
    Daten-Integration                :c4, after c3, 1d
    
    section QA & Doku
    Tests & Bugfixing                :d1, 2025-12-03, 3d
    Dokumentation                    :d2, 2025-12-06, 3d
```

### 2.4 Kostenplanung
Die Kostenplanung basiert auf einem fiktiven internen Verrechnungssatz.

**Personalkosten:**
*   Stundensatz (Auszubildender/Junior): 50,00 €
*   Geplante Stunden: 70 h
*   **Summe Personal:** 70 h * 50,00 €/h = **3.500,00 €**

**Sachmittelkosten:**
*   Nutzung vorhandener Hardware/Software (anteilig): pauschal 150,00 €
*   Lizenzen (Open Source): 0,00 €
*   **Summe Sachmittel:** **150,00 €**

**Gesamtkosten (Plan):** **3.650,00 €**

---

## 3. Analyse & Entwurf

### 3.1 Anwendungsfalldiagramm (Use Cases)
Der Benutzer (Kind) interagiert primär lesend und spielend mit dem System.

```mermaid
graph LR
    Kind((Kind / User))
    subgraph "Earth Ocean Learning"
        UC1(Ozean auswählen)
        UC2(Fakten ansehen)
        UC3(Quiz spielen)
        UC4(Fortschritt einsehen)
        UC5(Master-Quiz spielen)
    end
    Kind --> UC1
    Kind --> UC2
    Kind --> UC3
    Kind --> UC4
    Kind --> UC5
    UC5 -.->|include| UC4
```

### 3.2 Architekturentwurf
Die Anwendung folgt einer **MVVM (Model-View-ViewModel)** ähnlichen Architektur, die durch Angular und den SignalStore realisiert wird.

```mermaid
graph TD
    subgraph "View (UI)"
        Comp[Components]
        Templ[Templates]
    end
    
    subgraph "ViewModel (State)"
        Store[SignalStore]
    end
    
    subgraph "Model (Data)"
        Interfaces[Interfaces]
        Service[DataService]
    end
    
    User((User)) --> Comp
    Comp --> Store
    Store --> Service
    Service --> Interfaces
    Service -- JSON --> Data[(ocean-data.json)]
```

**Technologie-Entscheidungen:**
*   **Angular 21**: Nutzung der neuesten Features wie Signals und Standalone Components für zukunftssicheren Code.
*   **SignalStore (@ngrx/signals)**: Leichtgewichtiges State Management, ideal für die Komplexität der Anwendung, ohne den Boilerplate von Redux.
*   **Tailwind CSS**: Utility-First CSS Framework für schnelles Styling und einfache Responsivität.

### 3.3 UI/UX Design
Das Design wurde speziell für Kinder entwickelt:
*   **Farbpalette**: Helle, freundliche Farben (Blau-, Türkis- und Sandtöne), die zum Thema Ozean passen.
*   **Typografie**: Gute Lesbarkeit durch serifenlose Schriftarten.
*   **Navigation**: Große Klickflächen, intuitive "Weiter"-Buttons, visuelles Feedback bei Quiz-Antworten (Grün/Rot).

### 3.4 Datenmodell
Die Daten werden in einer JSON-Struktur gehalten, um Flexibilität zu gewährleisten und eine Datenbank-Abhängigkeit für diesen Prototypen zu vermeiden.

```mermaid
erDiagram
    OCEAN ||--|{ FACT : contains
    OCEAN ||--|{ INHABITANT : contains
    OCEAN ||--|{ QUIZ_QUESTION : contains

    OCEAN {
        string id
        string name
        string description
        string image
    }
    FACT {
        string text
    }
    INHABITANT {
        string name
        string image
    }
    QUIZ_QUESTION {
        string question
        string[] options
        string correctAnswer
    }
```

**Auszug Datenstruktur (JSON):**
```json
{
  "id": "pacific",
  "name": "Pazifischer Ozean",
  "facts": [ ... ],
  "inhabitants": [ ... ],
  "quizQuestions": [
    {
      "question": "Wie tief ist der Marianengraben?",
      "options": ["11.000m", "5.000m", "2.000m", "8.000m"],
      "correctAnswer": "11.000m"
    }
  ]
}
```

---

## 4. Realisierung

### 4.1 Entwicklungsumgebung
Die Entwicklung fand auf einem lokalen Windows-System statt. Folgende Tools kamen zum Einsatz:
*   **IDE**: Visual Studio Code mit Angular Language Service.
*   **Versionierung**: Git (lokales Repository).
*   **Framework**: Angular CLI Version 21.0.0.
*   **Browser**: Google Chrome (für Debugging und Tests).

### 4.2 Implementierung der Hauptkomponenten

#### 4.2.1 Standalone Components
Das Projekt setzt vollständig auf **Standalone Components**, um die Komplexität von NgModules zu vermeiden. Ein Beispiel ist die `OceanFactsComponent`, die alle notwendigen Abhängigkeiten (Imports) direkt im Component-Decorator definiert:

```typescript
@Component({
  selector: 'app-ocean-facts',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './ocean-facts.component.html',
  styleUrl: './ocean-facts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OceanFactsComponent { ... }
```

#### 4.2.2 State Management mit SignalStore
Für die Verwaltung des Anwendungszustands (z.B. "Welcher Ozean ist gewählt?", "Wie viele Sterne hat der User?") wurde der **NgRx SignalStore** verwendet. Dies ermöglicht eine reaktive und performante Datenhaltung ohne den Boilerplate klassischer Redux-Lösungen.

Der Store (`QuizStore`) hält den State und bietet Methoden (`updaters`) zur Manipulation an:

```typescript
export const QuizStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    unlockMasterQuiz() {
      patchState(store, { masterQuizUnlocked: true });
    },
    addStar(oceanId: string) {
      // Logik zum Hinzufügen eines Sterns
    }
  }))
);
```

#### 4.2.3 Routing & Navigation
Das Routing wurde in der `app.routes.ts` definiert. Es ermöglicht die Navigation zwischen Startseite, Auswahl, Fakten und Quiz. Parameter (wie die `id` des Ozeans) werden über die URL übergeben (`path: 'facts/:id'`) und in den Komponenten ausgelesen.

### 4.3 Herausforderungen & Lösungen
**Herausforderung**: Persistierung des Fortschritts beim Neuladen der Seite.
**Lösung**: Implementierung eines `LocalStorageService`, der den State des SignalStores bei jeder Änderung im Browser-Storage speichert und beim Start der App wiederherstellt. Dies stellt sicher, dass gesammelte Sterne nicht verloren gehen.

---

## 5. Qualitätssicherung

### 5.1 Testplanung
Aufgrund des begrenzten Zeitrahmens und des Fokus auf UI-Interaktion wurde der Schwerpunkt auf **manuelle Systemtests** gelegt. Unit-Tests wurden exemplarisch für kritische Logik (z.B. Score-Berechnung) angedacht, aber nicht flächendeckend umgesetzt.

### 5.2 Testdurchführung & Ergebnisse
Die Tests wurden anhand eines vorab definierten Testprotokolls durchgeführt.

| ID | Testfall | Erwartetes Ergebnis | Status |
| :--- | :--- | :--- | :--- |
| **TF01** | App-Start | Startbildschirm wird geladen, "Los geht's" Button sichtbar. | **OK** |
| **TF02** | Ozean-Auswahl | Klick auf Ozean öffnet korrekte Fakten-Seite. | **OK** |
| **TF03** | Quiz-Logik | Richtige Antwort -> Grün, Falsche Antwort -> Rot. | **OK** |
| **TF04** | Fortschritt | Nach 10 richtigen Antworten erscheint ein Stern. | **OK** |
| **TF05** | Master-Quiz Unlock | Button erst aktiv, wenn 5 Sterne gesammelt. | **OK** |
| **TF06** | Responsivität | Layout passt sich auf Tablet-Größe (iPad Air) an. | **OK** |

Alle kritischen Testfälle waren erfolgreich. Kleinere Layout-Fehler (z.B. überlappender Text bei sehr kleinen Bildschirmen) wurden während der Testphase behoben.

---

## 6. Wirtschaftlichkeitsbetrachtung

### 6.1 Soll-Ist-Vergleich (Zeit)
Die Projektdurchführung verlief weitgehend nach Plan.

| Phase | Geplant (h) | Tatsächlich (h) | Abweichung |
| :--- | :--- | :--- | :--- |
| Analyse & Planung | 11 | 10 | -1 h |
| Entwurf | 12 | 14 | +2 h |
| Implementierung | 28 | 29 | +1 h |
| Qualitätssicherung | 9 | 8 | -1 h |
| Dokumentation | 10 | 9 | -1 h |
| **Gesamt** | **70 h** | **70 h** | **0 h** |

**Begründung der Abweichungen**:
*   Der Entwurf dauerte etwas länger, da mehrere Iterationen für das kindgerechte Design nötig waren.
*   Die Implementierung verzögerte sich leicht durch die Einarbeitung in den neuen SignalStore, konnte aber durch effizienteres Testen wieder ausgeglichen werden.

### 6.2 Nachkalkulation (Kosten)
Da die Zeitvorgabe exakt eingehalten wurde, entsprechen die tatsächlichen Kosten den Plankosten.

*   **Personalkosten (Ist)**: 70 h * 50,00 €/h = **3.500,00 €**
*   **Sachmittel (Ist)**: **150,00 €**
*   **Gesamtkosten (Ist)**: **3.650,00 €**

### 6.3 Amortisationsrechnung
Da es sich um ein internes Projekt bzw. ein Auftragsprojekt für eine NGO handelt, ist eine direkte monetäre Amortisation (ROI) schwer messbar. Der Nutzen liegt primär in:
1.  **Marketing-Wert**: Die App wird als "Lead-Magnet" auf der Webseite der NGO eingesetzt, um neue Spender zu gewinnen.
2.  **Kompetenzaufbau**: Die Beispiel GmbH kann die App als Referenz für "Modern Angular Development" nutzen, was zu neuen Aufträgen führen kann.

**Qualitative Bewertung**:
Wenn durch die App nur 2 neue Kundenprojekte im Jahr gewonnen werden (Deckungsbeitrag je ca. 5.000 €), hat sich die Investition bereits im ersten Jahr amortisiert.

---

## 7. Fazit & Ausblick

### 7.1 Zusammenfassung
Das Projekt "Earth Ocean Learning" wurde erfolgreich und im geplanten Zeitrahmen umgesetzt. Alle funktionalen Anforderungen (Lernmodus, Quiz, Fortschritt) wurden erfüllt. Die Anwendung läuft stabil, ist performant und bietet durch das responsive Design eine gute User Experience auf verschiedenen Endgeräten.

### 7.2 Lessons Learned
*   **Angular Signals**: Die Nutzung von Signals hat den Code deutlich vereinfacht und lesbarer gemacht im Vergleich zu RxJS-Observables.
*   **Angular Router**: Das Verständnis für Child-Routes und Parameter-Übergabe wurde vertieft.
*   **CSS Flexbox**: Dynamisches Layout und Verankerung von Flex-Boxen für responsive Designs (z.B. Sticky Footer, zentrierte Inhalte) war eine wichtige Lernerfahrung.
*   **Planung ist alles**: Das detaillierte Mockup in der Entwurfsphase hat viel Zeit bei der späteren CSS-Implementierung gespart.

### 7.3 Ausblick
Für zukünftige Versionen sind folgende Erweiterungen denkbar:
*   **Sound-Effekte**: Hintergrundmusik und Feedback-Sounds für das Quiz.
*   **Backend-Anbindung**: Speicherung des Fortschritts in einer Datenbank (statt LocalStorage), um geräteübergreifendes Lernen zu ermöglichen.
*   **PWA-Support**: Ausbau zur Progressive Web App, damit die Anwendung auch offline (z.B. auf Tablets in Schulen ohne WLAN) genutzt werden kann.
*   **Mehrsprachigkeit (i18n)**: Übersetzung der Inhalte ins Englische, um eine größere Zielgruppe zu erreichen.
