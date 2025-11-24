**![INNUNG](BITLC.png)**

Abschlussprüfung “Angular” NE4NE8

Fachinformatiker für Anwendungsentwicklung

Dokumentation zur Kurs-Projektarbeit

# **Earth Oceans Learning APP**

Entwicklung einer kindgerechten Angular SPA zur Vermittlung von Wissen über die 5 Ozeane für Kinder (7-9 Jahre)

Abgabe der Dokumentation: 09.12.2025

Prüfling:

Tobias Boyke

Musterstraße 1

40470 Düsseldorf

Prüfungsnummer: 0001278495

**![BeispielGMBH](BeispielGMBH.png)**

Ausbildungsbetrieb:

Beispiel GmbH

Firmenweg 2

41460 Neuss

<div style="page-break-after: always;"></div>

## **Inhaltsverzeichnis**

[1. Einleitung](#1-einleitung)

[1.1. Ausgangssituation](#11-ausgangssituation)

[1.2. Projektidee und Zielsetzung](#12-projektidee-und-zielsetzung)

[1.3 Projektbegründung](#13-projektbegründung)

[2. Projektplanung](#2-projektplanung)

[2.1 Ist-Analyse](#21-ist-analyse)

[2.2. Zeitplanung (Gantt-Diagramm)](#22-zeitplanung-gantt-diagramm)

[2.3 Zeitplanung](#23-zeitplanung)

[2.4 Kostenplanung](#24-kostenplanung)

[3. Analyse & Entwurf](#3-analyse--entwurf)

[3.1 Anwendungsfalldiagramm (Use Cases)](#31-anwendungsfalldiagramm-use-cases)

[3.2 Architekturentwurf](#32-architekturentwurf)

[3.3 UI/UX Design](#33-uiux-design)

[3.4 Datenmodell](#34-datenmodell)

[3.5 Klassendiagramm (UML)](#35-klassendiagramm-uml)

[3.6 Datenschutz & Sicherheit (Privacy by Design)](#36-datenschutz--sicherheit-privacy-by-design)

[4. Realisierung](#4-realisierung)

[4.1 Entwicklungsumgebung](#41-entwicklungsumgebung)

[4.2 Implementierung der Hauptkomponenten](#42-implementierung-der-hauptkomponenten)

[4.2.1 Standalone Components](#421-standalone-components)

[4.2.2 State Management mit SignalStore](#422-state-management-mit-signalstore)

[4.2.3 Routing & Navigation](#423-routing--navigation)

[4.3 Herausforderungen & Lösungen](#43-herausforderungen--lösungen)

[5. Qualitätssicherung](#5-qualitätssicherung)

[5.1 Testplanung](#51-testplanung)

[5.2 Testdurchführung & Ergebnisse](#52-testdurchführung--ergebnisse)

[6. Wirtschaftlichkeitsbetrachtung](#6-wirtschaftlichkeitsbetrachtung)

[6.1 Soll-Ist-Vergleich (Zeit)](#61-soll-ist-vergleich-zeit)

[6.2 Nachkalkulation (Kosten)](#62-nachkalkulation-kosten)

[6.3 Amortisationsrechnung](#63-amortisationsrechnung)

[7. Fazit & Ausblick](#7-fazit--ausblick)

[7.1 Zusammenfassung](#71-zusammenfassung)

[7.2 Lessons Learned](#72-lessons-learned)

[7.3 Ausblick](#73-ausblick)

[8. Anhang](#8-anhang)

[8.1. Quellcode und Dateien](#81-quellcode-und-dateien)

[8.2. Mockups und Screenshots](#82-mockups-und-screenshots)

[9. Erklärung](#9-erklärung)

<div style="page-break-after: always;"></div>

## **Abbildungsverzeichnis**

[Abb. 1: Projektzeitplan (Gantt-Diagramm) (Kapitel 2.3)](#22-zeitplanung-gantt-diagramm)

[Abb. 2: Anwendungsfalldiagramm / Use Cases (Kapitel 3.1)](#31-anwendungsfalldiagramm-use-cases)

[Abb. 3: Architekturentwurf (Kapitel 3.2)](#32-architekturentwurf)

[Abb. 4: Entity Relationship Diagramm (Kapitel 3.4)](#34-datenmodell)

[Abb. 5: Klassendiagramm UML (Kapitel 3.5)](#35-klassendiagramm-uml)

## **Tabellenverzeichnis** {#tabellenverzeichnis}

[Tab. 1: Zeitplanung und Phasen (Kapitel 2.3)](#23-zeitplanung)

[Tab. 2: Herausforderungen & Lösungen (Kapitel 4.3)](#43-herausforderungen--lösungen)

[Tab. 3: Testdurchführung & Ergebnisse (Kapitel 5.2)](#52-testdurchführung--ergebnisse)

[Tab. 4: Soll-Ist-Vergleich Zeit (Kapitel 6.1)](#61-soll-ist-vergleich-zeit)

## **Listings** {#listings}

[Listing 1: JSON Datenstruktur (Kapitel 3.4)](#34-datenmodell)

[Listing 2: Standalone Component Definition (Kapitel 4.2.1)](#421-standalone-components)

[Listing 3: SignalStore Definition (Kapitel 4.2.2)](#422-state-management-mit-signalstore)

[Listing 4: Unit-Test Beispiel (Kapitel 5.1)](#51-testplanung)

<div style="page-break-after: always;"></div>

## **Glossar**

| Begriff              | Erklärung                                                                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SPA                  | Single Page Application \- Eine Webanwendung, die technisch aus einer einzigen HTML-Seite besteht. Inhalte werden dynamisch per JavaScript nachgeladen, ohne dass der Browser die Seite komplett neu aufbauen muss. Dies sorgt für ein flüssiges, App-ähnliches Nutzererlebnis. |
| Angular              | Ein von Google entwickeltes, TypeScript-basiertes Open-Source-Framework zur E rstellung von skalierbaren Webanwendungen. Es bietet eine umfassende Plattform mit integrierten Bibliotheken für Routing, Formularwesen und Client-Server-Kommunikation.                          |
| SignalStore          | Eine moderne State-Management-Lösung für Angular, basierend auf dem "Signals"-Konzept. Es ermöglicht eine reaktive, feingranulare Zustandsverwaltung ohne den hohen Boilerplate-Code klassischer Redux-Muster.                                                                  |
| Standalone Component | Ein Architekturkonzept in Angular, bei dem Komponenten, Direktiven und Pipes nicht mehr in NgModules deklariert werden müssen. Dies vereinfacht die Projektstruktur und ermöglicht "Lazy Loading" auf Komponentenebene.                                                         |
| MVVM                 | Model-View-ViewModel \- Ein Architekturmuster, das die grafische Benutzeroberfläche (View) von der Geschäftslogik (Model) trennt. Das ViewModel vermittelt zwischen beiden und stellt Daten für die View bereit (Data Binding).                                                 |
| CI/CD                | Continuous Integration / Continuous Delivery \- Eine Methode der Softwareentwicklung, bei der Code-Änderungen automatisch getestet und in Produktionsumgebungen bereitgestellt werden, um die Softwarequalität und Release-Geschwindigkeit zu erhöhen.                          |
| JSON                 | JavaScript Object Notation \- Ein kompaktes, textbasiertes Datenformat zum Datenaustausch zwischen Anwendungen. Es ist für Menschen einfach zu lesen und für Maschinen einfach zu parsen.                                                                                       |
| CMS                  | Content Management System \- Eine Software zur gemeinschaftlichen Erstellung, Bearbeitung und Organisation von Inhalten (Content), meist für Webseiten, ohne dass tiefgehende Programmierkenntnisse erforderlich sind (z.B. GRAV, WordPress).                                   |
| Tailwind CSS         | Ein "Utility-First" CSS-Framework, das statt vorgefertigter Komponenten (wie Bootstrap) kleine Hilfsklassen bereitstellt, mit denen Designs direkt im HTML-Markup zusammengesetzt werden können.                                                                                |
| TypeScript           | Eine von Microsoft entwickelte Programmiersprache, die auf JavaScript aufbaut und diese um statische Typisierung erweitert. Dies erhöht die Code-Qualität und erleichtert die Wartung großer Projekte.                                                                          |
| WCAG                 | Web Content Accessibility Guidelines \- Ein internationaler Standard zur barrierefreien Gestaltung von Internetangeboten, damit diese auch für Menschen mit Einschränkungen nutzbar sind.                                                                                       |
| LocalStorage         | Ein Teil der Web Storage API moderner Browser, der es ermöglicht, Daten (Key-Value-Paare) dauerhaft im Browser des Benutzers zu speichern, auch über das Schließen des Fensters hinaus.                                                                                         |

## **1\. Einleitung**

### **1.1. Ausgangssituation**

Im Rahmen der Umschulung zum Fachinformatiker für Anwendungsentwicklung, erläutert der Autor, welcher bei Herrn Ehlen sein Kurs-Element “Angular” absolvierte, den Ablauf seines hier folgenden Abschlussprojekts **bei einem fiktiven** Unternehmen.

Die **Beispiel GmbH** ist ein Start-up, mittelständisches IT-Dienstleistungsunternehmen mit Sitz im Herzen von Neuss. Seit ihrer Gründung im Jahr 2025 hat sich die Firma darauf spezialisiert, maßgeschneiderte Webanwendungen und anspruchsvolle CMS-Lösungen für Unternehmenskunden zu entwickeln. **14 Mitarbeiter**, bestehend aus Backend- und Frontend-Entwicklern, UI/UX-Designern, Projektmanagern und Content-Spezialisten, sind in der Beispiel GmbH beschäftigt und arbeiten vorwiegend für Kunden aus dem produzierenden Gewerbe, der Logistik und der Edutainment-Branche.

Die Beispiel GmbH wurde von einem Kunden, einer Umweltschutz-NGO, beauftragt, eine Browser Applikation für das spielerische Erlernen von Ozean-Fakten für Grundschulkinder zu entwickeln.

Zu den Stakeholdern des Projekts zählen:

- Der Auftraggeber (NGO): Vertreten durch Herrn Dr. Uwe Umwelt.

### **1.2. Projektidee und Zielsetzung**

Ziel des Projektes ist die Entwicklung einer Single Page Application (SPA) "Earth Ocean Learning". Die Anwendung soll Kindern spielerisch Wissen über die fünf Ozeane vermitteln. Kernfunktionen umfassen eine Auswahl der Ozeane, einen Lernbereich mit Informationen sowie ein Quiz-Modul zur Wissensüberprüfung.Optional soll die Anwendung muss als eigenständiges Modul (Standalone) konzipiert sein, um eine einfache Integration in bestehende CMS-Systeme (wie GRAV) zu ermöglichen.

### **1.3 Projektbegründung**

Die Digitalisierung im Bildungssektor erfordert moderne, webbasierte Lernlösungen, die plattformunabhängig funktionieren. Herkömmliche Lernmaterialien (PDFs, statische Webseiten) bieten oft nicht den nötigen Anreiz für die Zielgruppe (Kinder). Durch den Einsatz moderner Webtechnologien (Angular, SignalStore) soll eine performante, wartbare und zukunftssichere Lösung geschaffen werden, die gleichzeitig als Referenzprojekt für die Beispiel GmbH dient, um die Kompetenz im Bereich "Edutainment" zu unterstreichen.
<div style="page-break-after: always;"></div>

## **2\. Projektplanung**

### **2.1 Ist-Analyse**

Zum Zeitpunkt des Projektstarts existiert keine Softwarelösung für den genannten Anwendungsfall. Die Inhalte (Texte, Bilder zu Ozeanen) liegen lediglich in unstrukturierter Form (Textdokumente, Bilddateien) vor. Es gibt keinen bestehenden Codebase, auf dem aufgebaut werden kann ("Greenfield Project").

**Technische Ausgangslage:**

- Entwickler-Workstation mit Windows 11 und Rocky Linux 10\.
- Zugriff auf Standard-Entwicklungstools (VS Code, Sublime Text 4 (Build 4200), GitHub, Node.js, NPM.
- Keine bestehende CI/CD Pipeline für dieses spezifische Projekt.

### **2.2. Zeitplanung (Gantt-Diagramm)**

Es soll eine Webanwendung entwickelt werden, die folgende Anforderungen erfüllt:

**Funktionale Anforderungen:**

- **Ozean-Auswahl:** Visuelle Darstellung und Auswahl der 5 Weltmeere.
- **Lernmodus:** Anzeige von Fakten und Bewohnern pro Ozean (Carousel/Slider).
- **Quiz-System:** Multiple-Choice Fragen mit direktem Feedback.
- **Fortschritt:** Speicherung des Lernfortschritts (Sterne-System) im lokalen Browser-Storage (kein Backend-Zwang).
- **Master-Quiz:** Ein freischaltbarer Modus nach Abschluss aller Ozeane.

**Nicht-funktionale Anforderungen:**

- **Zielgruppe:** Kindgerechtes UI/UX (große Buttons, wenig Text, viel Bild).
- **Technologie:** Angular 21 (aktuellste Version), Nutzung von Standalone Components.
- **State Management:** Nutzung von Angular Signals / SignalStore für reaktives Datenmanagement.
- **Performance:** Kurze Ladezeiten, optimierte Assets.
- **Responsive Design:** Lauffähig auf Tablets und Desktops.
<div style="page-break-after: always;"></div>

### **2.3 Zeitplanung**

Der Durchführungszeitraum des Projektes ist vom 17.11.2025 bis 09.12.2025. Die geplante Gesamtzeit beträgt 70 Stunden.

| _Phase_                  | _Tätigkeit_                                     | _Geplante Zeit (h)_ |
| ------------------------ | ----------------------------------------------- | :-----------------: |
| _1\. Analyse & Planung_  |                                                 |       _11 h_        |
|                          | _Ist-Analyse & Soll-Konzept_                    |        _3 h_        |
|                          | _Erstellung Pflichtenheft / Fachkonzept_        |        _4 h_        |
|                          | _Wirtschaftlichkeitsbetrachtung (Planung)_      |        _2 h_        |
|                          | _Zeit- & Ressourcenplanung_                     |        _2 h_        |
| _2\. Entwurf_            |                                                 |       _12 h_        |
|                          | _UI/UX Design (Mockups)_                        |        _5 h_        |
|                          | _Software-Architektur & Datenmodellierung_      |        _4 h_        |
|                          | _Auswahl der Bibliotheken & Tools_              |        _3 h_        |
| _3\. Implementierung_    |                                                 |       _28 h_        |
|                          | _Aufsetzen der Entwicklungsumgebung_            |        _2 h_        |
|                          | _Implementierung Core-Komponenten & Routing_    |        _6 h_        |
|                          | _Implementierung Logik (SignalStore, Services)_ |        _8 h_        |
|                          | _Implementierung UI & Styling (Tailwind)_       |        _8 h_        |
|                          | _Integration der Daten (JSON)_                  |        _4 h_        |
| _4\. Qualitätssicherung_ |                                                 |        _9 h_        |
|                          | _Erstellung von Testfällen_                     |        _3 h_        |
|                          | _Durchführung Tests & Bugfixing_                |        _6 h_        |
| _5\. Dokumentation_      |                                                 |       _10 h_        |
|                          | _Erstellung Projektdokumentation_               |        _8 h_        |
|                          | _Erstellung Benutzerhandbuch_                   |        _2 h_        |
| **_Gesamt_**             |                                                 |     **_70 h_**      |

<div style="page-break-after: always;"></div>

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

### **2.4 Kostenplanung**

Die Kostenplanung basiert auf den internen Selbstkosten (Vollkostenrechnung inkl. Gemeinkostenzuschlag für Arbeitsplatz, Strom, Verwaltung).

**Personalkosten:**

Interner Stundensatz (Azubi im 3. LJ inkl. GK-Zuschlag): 35,00 €

- Geplante Stunden: 70 h

- Summe Personal: 70 h * 35,00 €/h = 2.450,00 €

**Sachmittelkosten:**

- Nutzung Entwicklungsumgebung (anteilig): 150,00 €

- Summe Sachmittel: 150,00 €

**Gesamtkosten (Plan): 2.600,00 €**
<div style="page-break-after: always;"></div>

## **3\. Analyse & Entwurf**

### **3.1 Anwendungsfalldiagramm (Use Cases)**

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
<div style="page-break-after: always;"></div>

### **3.2 Architekturentwurf**

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

**Angular 21:** In Absprache mit dem Ausbilder wurde die Entscheidung getroffen, die Version 21 zu verwenden. Ziel war es, das Projekt "State of the Art" umzusetzen und von den neuesten Performance-Optimierungen und der verbesserten Developer Experience (Signals) zu profitieren.

**SignalStore (@ngrx/signals):** Leichtgewichtiges State Management, ideal für die Komplexität der Anwendung, ohne den Boilerplate von Redux.

**Tailwind CSS:** Utility-First CSS Framework für schnelles Styling und einfache Responsivität.
<div style="page-break-after: always;"></div>

### **3.3 UI/UX Design**

Das Design wurde speziell für Kinder entwickelt:

- Farbpalette: Helle, freundliche Farben (Blau-, Türkis- und Sandtöne im Thema Ozean.
- Typografie: Gute Lesbarkeit durch serifenlose Schriftarten.
- Navigation: Große Knöpfe, intuitive "Weiter"-Buttons, visuelles Feedback bei Quiz-Antworten (Grün/Rot).
- Barrierefreiheit (Accessibility): Einhaltung grundlegender WCAG-Standards, wie z.B. ausreichende Farbkontraste für Texte und Buttons sowie Tastaturnavigation (Tab-Index) für eine bedienbare Oberfläche auch ohne Maus.
<div style="page-break-after: always;"></div>

### **3.4 Datenmodell**

Die Daten werden in einer JSON-Struktur gehalten, um Flexibilität zu gewährleisten und eine Datenbank-Abhängigkeit für diesen Prototypen zu vermeiden.

```mermaid
classDiagram
    direction TB
    note "JSON Dokumenten-Struktur"
    
    class OceanDataRoot {
        +String id
        +String name
        +String description
        +String image
        +Fact[] facts
        +Inhabitant[] inhabitants
        +QuizQuestion[] quizQuestions
    }

    class Fact {
        +String text
    }

    class Inhabitant {
        +String name
        +String image
    }

    class QuizQuestion {
        +String question
        +String[] options
        +String correctAnswer
    }

    OceanDataRoot *-- Fact : contains (nested)
    OceanDataRoot *-- Inhabitant : contains (nested)
    OceanDataRoot *-- QuizQuestion : contains (nested)

```json
_Da keine relationale Datenbank, sondern eine dokumentenorientierte Speicherung (JSON) verwendet wird, stellt die Abbildung die hierarchische Struktur des JSON-Objekts dar, nicht relationale Tabellenverknüpfungen._
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
<div style="page-break-after: always;"></div>

### **3.5 Klassendiagramm (UML)**

Das Klassendiagramm verdeutlicht die Abhängigkeiten zwischen den Standalone Components, dem SignalStore und den Daten-Services.

```mermaid
classDiagram
    class AppComponent {
        +title: string
    }
    class OceanSelectionComponent {
        +oceans: Signal<Ocean[]>
        +selectOcean(id: string)
    }
    class OceanFactsComponent {
        +ocean: Signal<Ocean>
        +nextFact()
    }
    class QuizComponent {
        +currentQuestion: Signal<QuizQuestion>
        +submitAnswer(answer: string)
    }
    class DataService {
        +getOceans(): Observable<Ocean[]>
        +getOceanById(id: string): Observable<Ocean>
    }
    class QuizStore {
        +state: Signal<QuizState>
        +unlockMasterQuiz()
        +addStar(oceanId: string)
    }

    AppComponent --> OceanSelectionComponent : routes to
    OceanSelectionComponent ..> QuizStore : uses
    OceanFactsComponent ..> QuizStore : uses
    QuizComponent ..> QuizStore : uses

    OceanSelectionComponent ..> DataService : injects
    OceanFactsComponent ..> DataService : injects
```
<div style="page-break-after: always;"></div>

### **3.6 Datenschutz & Sicherheit (Privacy by Design)**

Da sich die Anwendung an Kinder richtet, hat der Datenschutz höchste Priorität.

- Keine Datensammlung: Es werden keinerlei personenbezogene Daten (PII) erhoben oder an externe Server gesendet.
- Lokale Speicherung: Der Lernfortschritt wird ausschließlich im LocalStorage des Browsers auf dem Endgerät des Nutzers gespeichert.
- Offline-Fähigkeit: Die Anwendung lädt keine externen Tracker oder Analyse-Tools nach.
- _Das Klassendiagramm detailliert die Struktur der JavaScript-Module. Die Hanoi Visualizer-Klasse kapselt die gesamte Canvas-Logik. solver.js stellt eine reine Funktion bereit, während hanoi-main.js als Controller agiert._

## **4\. Realisierung**

### **4.1 Entwicklungsumgebung**

Die Entwicklung fand auf einem lokalen Windows-System statt. Folgende Tools kamen zum Einsatz:

- **IDE:** Visual Studio Code mit Angular Language Service.
- **Versionierung:** Github (Globales Privates Repository).
- **Framework:** Angular CLI Version 21.0.0.
- **Browser:** Google Chrome (für Debugging und Tests).

### **4.2 Implementierung der Hauptkomponenten**

#### **4.2.1 Standalone Components**

Das Projekt setzt vollständig auf Standalone Components, um die Komplexität von NgModules zu vermeiden.

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

_Die OceanFactsComponent, die alle notwendigen Abhängigkeiten (Imports) direkt im Component-Decorator definiert_
<div style="page-break-after: always;"></div>

#### **4.2.2 State Management mit SignalStore**

Für die Verwaltung des Anwendungszustands (z.B. "Welcher Ozean ist gewählt?", "Wie viele Sterne hat der User?") wurde der **NgRx SignalStore** verwendet. Dies ermöglicht eine reaktive und performante Datenhaltung ohne den Boilerplate klassischer Redux-Lösungen.

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
    },
  }))
);
```

_Der Store (QuizStore) hält den State und bietet Methoden (Updaters) zur Manipulation an_

#### **4.2.3 Routing & Navigation**

Das Routing wurde in der app.routes.ts definiert. Es ermöglicht die Navigation zwischen Startseite, Auswahl, Fakten und Quiz. Parameter (wie die id des Ozeans) werden über die URL übergeben (path: 'facts/:id') und in den Komponenten ausgelesen.
<div style="page-break-after: always;"></div>

### **4.3 Herausforderungen & Lösungen**

Während der Realisierungsphase traten verschiedene technische und konzeptionelle Herausforderungen auf. Diese wurden wie folgt gelöst:

| Herausforderung                                                                 | Lösungsansatz                                                                                                                              | Ergebnis                                                                       |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Persistierung des Fortschritts Datenverlust beim Neuladen der Seite (F5).       | Implementierung eines LocalStorageService, der den State des SignalStores bei jeder Änderung speichert und beim App-Start wiederherstellt. | Lernfortschritt (Sterne) bleibt dauerhaft erhalten.                            |
| Code-Qualität / Linting Inkompatibilität von ESLint mit Angular 21 (RC).        | Verzicht auf automatisierte Linter. Stattdessen: Strikte Nutzung der Angular-Compiler-Checks (strict: true) und manuelle Code-Reviews.     | Hohe Code-Qualität durch Disziplin, keine Build-Fehler.                        |
| SignalStore Einarbeitung Paradigmenwechsel von klassischen Services zu Signals. | Intensive Recherche der offiziellen Docs und Nutzung von computed() Signals für abgeleiteten State statt manueller Subscriptions.          | Sehr performanter, reaktiver Code mit deutlich weniger Boilerplate.            |
| Kindgerechte UX Interface muss ohne viel Text verständlich sein.                | Nutzung von großen Icons, intuitiven Farben (Grün/Rot) und Verzicht auf komplexe Menüstrukturen.                                           | Positive Rückmeldung bei ersten Tests mit der Zielgruppe (intuitiv bedienbar). |
| Datenmodellierung Abbildung komplexer Relationen in Flat-File JSON.             | Design einer verschachtelten JSON-Struktur mit Arrays für Fakten/Bewohner, die zur Laufzeit typisiert eingelesen wird.                     | Flexibles Datenmodell ohne Backend-Zwang, leicht erweiterbar.                  |
<div style="page-break-after: always;"></div>

## **5\. Qualitätssicherung**

### **5.1 Testplanung**

Aufgrund des begrenzten Zeitrahmens und des Fokus auf UI-Interaktion wurde der Schwerpunkt auf manuelle Systemtests gelegt. Dennoch wurden für kritische Logik-Komponenten Unit-Tests implementiert, um die Korrektheit der Geschäftslogik sicherzustellen.

**Beispiel Unit-Test (Jasmine/Karma):**

```typescript
it('should calculate correct score', () => {
  const service = TestBed.inject(QuizService);
  service.answerQuestion(true); // Correct
  service.answerQuestion(true); // Correct
  expect(service.score()).toBe(2);
});
```

### **5.2 Testdurchführung & Ergebnisse**

Die Tests wurden anhand eines vorab definierten Testprotokolls durchgeführt.

|    ID    | Testfall           | Erwartetes Ergebnis                                         | Status |
| :------: | ------------------ | ----------------------------------------------------------- | :----: |
| **TF01** | App-Start          | Startbildschirm wird geladen, "Los geht's" Button sichtbar. |   OK   |
| **TF02** | Ozean-Auswahl      | Klick auf Ozean öffnet korrekte Fakten-Seite.               |   OK   |
| **TF03** | Quiz-Logik         | Richtige Antwort \-\> Grün, Falsche Antwort \-\> Rot.       |   OK   |
| **TF04** | Fortschritt        | Nach 10 richtigen Antworten erscheint ein Stern.            |   OK   |
| **TF05** | Master-Quiz Unlock | Button erst aktiv, wenn 5 Sterne gesammelt.                 |   OK   |
| **TF06** | Responsivität      | Layout passt sich auf Tablet-Größe (iPad Air) an.           |   OK   |

_Alle kritischen Testfälle waren erfolgreich. Kleinere Layout-Fehler (z.B. überlappender Text bei sehr kleinen Bildschirmen) wurden während der Testphase behoben._
<div style="page-break-after: always;"></div>

### 5.3 Automatisierte Qualitätssicherung (CI/CD)**

Um eine gleichbleibend hohe Code-Qualität sicherzustellen und "Breaking Changes" frühzeitig zu erkennen, wurde eine CI/CD-Pipeline mittels GitHub Actions implementiert. Diese Pipeline wird bei jedem Push in das Repository (git push) automatisch getriggert und durchläuft folgende Phasen:
- Clean Install: Installation der Abhängigkeiten in einer sauberen Container-Umgebung (npm ci), um die Reproduzierbarkeit des Builds zu garantieren.
- Automatisierte Tests: Ausführung der Unit-Tests via Karma/Jasmine im ChromeHeadless-Modus. Schlägt auch nur ein Test fehl, wird der gesamte Build-Prozess abgebrochen.
- Production Build: Testweise Kompilierung der Anwendung (ng build). Dies stellt sicher, dass der TypeScript-Compiler (AOT) keine Fehler wirft und alle Assets korrekt referenziert sind.

Durch diesen "Quality Gate"-Ansatz wird verhindert, dass fehlerhafter Code in den main-Branch gemergt wird.
<div style="page-break-after: always;"></div>

## **6\. Wirtschaftlichkeitsbetrachtung**

### **6.1 Soll-Ist-Vergleich (Zeit)**

Die Projektdurchführung verlief weitgehend nach Plan.

| Phase              | Geplant (h) | Tatsächlich (h) | Abweichung |
| ------------------ | :---------: | :-------------: | :--------: |
| Analyse & Planung  |     11      |       10        |   \-1 h    |
| Entwurf            |     12      |       14        |   \+2 h    |
| Implementierung    |     28      |       29        |   \+1 h    |
| Qualitätssicherung |      9      |        8        |   \-1 h    |
| Dokumentation      |     10      |        9        |   \-1 h    |
| **Gesamt**         |  **70 h**   |    **70 h**     |  **0 h**   |

**Begründung der Abweichungen:**

- Der Entwurf dauerte etwas länger, da mehrere Iterationen für das kindgerechte Design nötig waren.
- Die Implementierung verzögerte sich leicht durch die Einarbeitung in den neuen SignalStore, konnte aber durch effizienteres Testen wieder ausgeglichen werden.

### **6.2 Nachkalkulation (Kosten)**

Da die Zeitvorgabe exakt eingehalten wurde, entsprechen die tatsächlichen Kosten den Plankosten.

- Personalkosten (Ist): 70 h \* 50,00 €/h \= 3.500,00 €
- Sachmittel (Ist): 150,00 €
- Gesamtkosten (Ist): 3.650,00 €
<div style="page-break-after: always;"></div>

### **6.3 Amortisationsrechnung**

Die Wirtschaftlichkeit des Projekts wird durch einen Vergleich der neuen digitalen Lösung mit dem bisherigen analogen Prozess der NGO (Druck von Lern-Broschüren für Schulen) ermittelt.
Ausgangslage (Ist-Zustand "Analog"): Die NGO druckt jährlich ca. 2.000 Lernbroschüren für Schulbesuche.

- Druckkosten: 2.000 Stück á 0,80 € = 1.600,00 € / Jahr
- Logistik/Versand an Schulen: ca. 400,00 € / Jahr
- Jährliche Kosten Analog: 2.000,00 €

Zielzustand (Soll-Zustand "App"): Die App ersetzt die Broschüren vollständig.

- Hosting & Domain (jährlich): 60,00 €
- Wartungspauschale (intern verrechnet): 200,00 €
- Jährliche Betriebskosten Digital: 260,00 €

**Berechnung der Amortisationsdauer:**
- Jährliche Einsparung: 2.000,00 € - 260,00 € = 1.740,00 €
- Einmalkosten Projekt (siehe 6.2): 2.600,00 €

$$Amortisationszeit = \frac{\text{Projektkosten}}{\text{Jährliche Einsparung}} = \frac{2.600,00 €}{1.740,00 €/Jahr} \approx 1,49 \text{ Jahre}$$

Fazit: Die Entwicklungskosten der App haben sich nach ca. 18 Monaten (1,5 Jahren) amortisiert. Danach spart der Kunde jährlich 1.740,00 € gegenüber dem klassischen Druckverfahren ein, bei gleichzeitig höherer Reichweite und Interaktivität.

**Qualitative Bewertung:** Wenn durch die App nur 2 neue Kundenprojekte im Jahr gewonnen werden (Deckungsbeitrag je ca. 5.000 €), hat sich die Investition bereits im ersten Jahr amortisiert.

## **7\. Fazit & Ausblick**

### **7.1 Zusammenfassung**

Das Projekt "Earth Ocean Learning" wurde erfolgreich und im geplanten Zeitrahmen umgesetzt. Alle funktionalen Anforderungen (Lernmodus, Quiz, Fortschritt) wurden erfüllt. Die Anwendung läuft stabil, ist performant und bietet durch das responsive Design eine gute User Experience auf verschiedenen Endgeräten.

### **7.2 Lessons Learned**

- **Angular Signals:** Die Nutzung von Signals hat den Code deutlich vereinfacht und lesbarer gemacht im Vergleich zu RxJS-Observables.
- **Angular Router:** Das Verständnis für Child-Routes und Parameter-Übergabe wurde vertieft.
- **CSS Flexbox:** Dynamisches Layout und Verankerung von Flex-Boxen für responsive Designs (z.B. Sticky Footer, zentrierte Inhalte) war eine wichtige Lernerfahrung.
- **Planung ist alles:** Das detaillierte Mockup in der Entwurfsphase hat viel Zeit bei der späteren CSS-Implementierung gespart.
<div style="page-break-after: always;"></div>

### **7.3 Ausblick**

Für zukünftige Versionen sind folgende Erweiterungen in der Roadmap:

- **Sound-Effekte:** Hintergrundmusik und Feedback-Sounds für das Quiz.
- **Backend-Anbindung:** Speicherung des Fortschritts in einer Datenbank (statt LocalStorage), um geräteübergreifendes Lernen zu ermöglichen.
- **PWA-Support:** Ausbau zur Progressive Web App, damit die Anwendung auch offline (z.B. auf Tablets in Schulen ohne WLAN) genutzt werden kann.
- **Mehrsprachigkeit (i18n):** Übersetzung der Inhalte ins Englische, um eine größere Zielgruppe zu erreichen.
<div style="page-break-after: always;"></div>

## **8\. Anhang**

### **8.1. Quellcode und Dateien**

Der vollständige und kommentierte Quellcode aller Projektdateien, Grafiken, Protokolle, Lasten-. und Pflichtenheft (.twig, .css, .js) befindet sich im beiliegenden digitalen Anhang (ZIP-Archiv).

### **8.2. Mockups und Screenshots**

**Startbildschirm der Anwendung:**

**Laufende Visualisierung:**
<div style="page-break-after: always;"></div>

## **9\. Erklärung**

Hiermit versichere ich, dass ich die vorliegende Arbeit selbstständig und ohne fremde Hilfe angefertigt und keine anderen als die angegebenen Quellen und Hilfsmittel verwendet habe.

Neuss, 08.12.2025 (Unterschrift Tobias Boyke)
