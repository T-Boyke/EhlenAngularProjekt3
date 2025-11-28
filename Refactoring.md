# Refactoring Dokumentation: EOL Projekt

Diese Datei dokumentiert die durchgeführten Änderungen am "Earth Ocean Learning" Projekt, um die Code-Qualität zu verbessern und die Integration in Grav CMS zu ermöglichen.

## 1. Grav CMS Integration (Routing)

### Was wurde gemacht?
Wir haben die Routing-Strategie von Angular geändert. Statt "normalen" URLs (z.B. `/quiz`) nutzen wir nun Hash-URLs (z.B. `/#/quiz`). Außerdem wurde der Basis-Pfad (`baseHref`) auf `./` gesetzt.

### Warum wurde es gemacht?
Das Grav CMS verwaltet die Haupt-URLs der Webseite. Wenn Angular versucht, eigene Pfade zu kontrollieren, kommt es zu Konflikten (404 Fehler), da der Server diese Pfade nicht kennt. Mit dem Hash (`#`) weiß der Browser, dass dieser Teil der URL nur für die Angular-App bestimmt ist und nicht vom Server geladen werden muss.

### Vorteil für das Projekt
Die App kann nun einfach als Ordner in das Grav CMS kopiert werden und funktioniert sofort, ohne dass am Server etwas konfiguriert werden muss.

---

## 2. CSS Refactoring (BEM & Global Styles)

### Was wurde gemacht?
Wir haben die Styles für die Ozean-Karten (`.ocean-card`) aus der `ocean-selection.component.css` entfernt und als globalen Block in `src/styles.css` definiert (ursprünglich geplant als separate Datei, aber zur Build-Stabilität inline behalten).

### Warum wurde es gemacht?
Vorher waren die Styles fest mit einer einzigen Komponente verbunden. Wenn wir die Karten an anderer Stelle nutzen wollten, hätten wir den Code kopieren müssen.

### Vorteil für das Projekt
- **Wiederverwendbarkeit:** Die Karten sehen überall gleich aus.
- **Wartbarkeit:** Änderungen am Design müssen nur noch an einer Stelle gemacht werden.
- **Stabilität:** Durch die zentrale Definition in `styles.css` werden Probleme mit Import-Reihenfolgen vermieden.

---

## 3. Komponenten-Kapselung (Shared Components)

### Was wurde gemacht?
Wir haben zwei neue "Shared Components" erstellt:
1. `OceanCardComponent`: Eine eigenständige Komponente nur für die Darstellung einer Karte.
2. `ProgressBarComponent`: Eine eigenständige Komponente für Ladebalken.

Die `OceanSelectionComponent` wurde so umgebaut, dass sie diese neuen Komponenten benutzt, anstatt alles selbst zu rendern.

### Warum wurde es gemacht?
Die `OceanSelectionComponent` war zu groß und hatte zu viele Aufgaben (Daten laden, Layout, Karten darstellen, Fortschritt berechnen). Das verletzte das "Single Responsibility Principle" (Prinzip der einzigen Verantwortung).

### Vorteil für das Projekt
- **Testbarkeit:** Die kleinen Komponenten können isoliert getestet werden.
- **Lesbarkeit:** Der Code der Hauptseite ist nun viel kürzer und verständlicher.
- **Konsistenz:** Der Fortschrittsbalken und die Karten können nun im gesamten Projekt einfach wiederverwendet werden.

---

## 4. Zentrales Fehler-Handling für Bilder

### Was wurde gemacht?
# Refactoring Dokumentation: EOL Projekt

Diese Datei dokumentiert die durchgeführten Änderungen am "Earth Ocean Learning" Projekt, um die Code-Qualität zu verbessern und die Integration in Grav CMS zu ermöglichen.

## 1. Grav CMS Integration (Routing)

### Was wurde gemacht?
Wir haben die Routing-Strategie von Angular geändert. Statt "normalen" URLs (z.B. `/quiz`) nutzen wir nun Hash-URLs (z.B. `/#/quiz`). Außerdem wurde der Basis-Pfad (`baseHref`) auf `./` gesetzt.

### Warum wurde es gemacht?
Das Grav CMS verwaltet die Haupt-URLs der Webseite. Wenn Angular versucht, eigene Pfade zu kontrollieren, kommt es zu Konflikten (404 Fehler), da der Server diese Pfade nicht kennt. Mit dem Hash (`#`) weiß der Browser, dass dieser Teil der URL nur für die Angular-App bestimmt ist und nicht vom Server geladen werden muss.

### Vorteil für das Projekt
Die App kann nun einfach als Ordner in das Grav CMS kopiert werden und funktioniert sofort, ohne dass am Server etwas konfiguriert werden muss.

---

## 2. CSS Refactoring (BEM & Global Styles)

### Was wurde gemacht?
Wir haben die Styles für die Ozean-Karten (`.ocean-card`) aus der `ocean-selection.component.css` entfernt und als globalen Block in `src/styles.css` definiert (ursprünglich geplant als separate Datei, aber zur Build-Stabilität inline behalten).

### Warum wurde es gemacht?
Vorher waren die Styles fest mit einer einzigen Komponente verbunden. Wenn wir die Karten an anderer Stelle nutzen wollten, hätten wir den Code kopieren müssen.

### Vorteil für das Projekt
- **Wiederverwendbarkeit:** Die Karten sehen überall gleich aus.
- **Wartbarkeit:** Änderungen am Design müssen nur noch an einer Stelle gemacht werden.
- **Stabilität:** Durch die zentrale Definition in `styles.css` werden Probleme mit Import-Reihenfolgen vermieden.

---

## 3. Komponenten-Kapselung (Shared Components)

### Was wurde gemacht?
Wir haben zwei neue "Shared Components" erstellt:
1. `OceanCardComponent`: Eine eigenständige Komponente nur für die Darstellung einer Karte.
2. `ProgressBarComponent`: Eine eigenständige Komponente für Ladebalken.

Die `OceanSelectionComponent` wurde so umgebaut, dass sie diese neuen Komponenten benutzt, anstatt alles selbst zu rendern.

### Warum wurde es gemacht?
Die `OceanSelectionComponent` war zu groß und hatte zu viele Aufgaben (Daten laden, Layout, Karten darstellen, Fortschritt berechnen). Das verletzte das "Single Responsibility Principle" (Prinzip der einzigen Verantwortung).

### Vorteil für das Projekt
- **Testbarkeit:** Die kleinen Komponenten können isoliert getestet werden.
- **Lesbarkeit:** Der Code der Hauptseite ist nun viel kürzer und verständlicher.
- **Konsistenz:** Der Fortschrittsbalken und die Karten können nun im gesamten Projekt einfach wiederverwendet werden.

---

## 4. Zentrales Fehler-Handling für Bilder

### Was wurde gemacht?
Wir haben eine `ImageFallbackDirective` erstellt. Diese wird einfach an ein `<img>`-Tag angehängt (z.B. `<img appImageFallback ...>`).

### Warum wurde es gemacht?
In der alten Version musste jede Komponente selbst prüfen, ob ein Bild geladen werden konnte, und manuell ein Ersatzbild setzen. Das führte zu viel doppeltem Code.

### Vorteil für das Projekt
- **Weniger Code:** Keine wiederholten `error`-Handler mehr in den Komponenten.
- **Schnelleres Laden:** Der Browser weiß jetzt sofort, welche Bilder wichtig sind.
- **Bessere User Experience:** Die Seite fühlt sich schneller an.
- **Automatische Optimierung:** Angular kümmert sich um Lazy Loading für Bilder, die gerade nicht sichtbar sind.
- **Responsive Bilder:** Durch das `sizes`-Attribut lädt der Browser nur die Bildgröße, die er wirklich braucht (spart Datenvolumen).
- **Sicherheit:** Es werden keine "kaputten" Bilder mehr angezeigt, selbst wenn wir vergessen, es manuell zu behandeln.
