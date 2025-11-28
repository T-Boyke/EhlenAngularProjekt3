# Refactoring Dokumentation

## 1. Grav CMS Integration
**Was wurde gemacht?**
- Die Routing-Strategie wurde auf `HashLocationStrategy` geändert (URLs sehen nun so aus: `/#/selection`).
- Die `baseHref` in der Build-Konfiguration wurde auf `./` gesetzt.

**Warum wurde es gemacht?**
Grav CMS verwaltet die URLs selbst. Damit die Angular-App innerhalb einer Grav-Seite funktioniert, darf sie nicht versuchen, die "echten" URLs zu kontrollieren. Die Hash-Strategie und relative Pfade verhindern Konflikte mit dem Grav-Routing.

## 2. CSS Refactoring (BEM)
**Was wurde gemacht?**
- CSS-Klassen wurden nach der BEM-Methodik (Block Element Modifier) benannt (z.B. `.ocean-card__title` statt nur `.title`).
- Globale Karten-Styles wurden in `src/styles.css` zentralisiert.

**Warum wurde es gemacht?**
BEM verhindert, dass Styles versehentlich andere Elemente beeinflussen (Kapselung). Zentralisierte Styles erleichtern die Wiederverwendung und Wartung.

## 3. Komponenten-Kapselung
**Was wurde gemacht?**
- Neue Komponenten `OceanCardComponent` und `ProgressBarComponent` wurden erstellt.
- `OceanSelectionComponent` wurde aufgeräumt und nutzt nun diese neuen Komponenten.

**Warum wurde es gemacht?**
Dies macht den Code übersichtlicher und modularer. Die Karte und der Ladebalken können nun überall in der App einfach wiederverwendet werden.

## 4. Fehlerbehandlung (Image Fallback)
**Was wurde gemacht?**
- Eine `appImageFallback` Direktive wurde erstellt.

**Warum wurde es gemacht?**
Wenn ein Bild nicht geladen werden kann (z.B. falscher Pfad), wird automatisch ein Platzhalter-Bild angezeigt, statt eines kaputten Bild-Icons. Das verbessert die User Experience.

## 5. Performance Optimierung (LCP)
**Was wurde gemacht?**
- Die Angular `NgOptimizedImage` Direktive (`ngSrc`) wird nun für Bilder genutzt.
- Die ersten 4 Bilder auf der Auswahlseite werden priorisiert geladen (`priority`).
- Das `sizes` Attribut wurde hinzugefügt, um dem Browser mitzuteilen, wie groß das Bild angezeigt wird.

**Warum wurde es gemacht?**
Dies beschleunigt das Laden der Seite erheblich (LCP - Largest Contentful Paint). Der Browser lädt wichtige Bilder früher und wählt automatisch die passende Dateigröße für das jeweilige Gerät (Handy vs. Desktop).

## 6. Tastatur-Navigation
**Was wurde gemacht?**
- **Fakten-Seite**: Pfeiltasten (Links/Rechts) zum Blättern, Leertaste zum Quiz-Start, Escape zum Zurückgehen.
- **Auswahl-Seite**: Pfeiltasten zum Navigieren zwischen den Karten, Enter zum Auswählen.
- **Quiz-Seite**: Pfeiltasten zum Auswählen der Antwort, Enter zum Bestätigen.

**Warum wurde es gemacht?**
Dies verbessert die Barrierefreiheit und ermöglicht eine schnellere Bedienung der App ohne Maus.
