/**
 * Repräsentiert einen Bewohner eines Ozeans.
 * Diese Schnittstelle definiert die Struktur für Tiere oder Pflanzen,
 * die in der Detailansicht eines Ozeans angezeigt werden.
 */
export interface Inhabitant {
  /** Der Name des Bewohners (z.B. "Clownfisch"). */
  name: string;
  /** Eine kurze Beschreibung oder interessante Fakten über den Bewohner. */
  description: string;
  /** Pfad zum Bild des Bewohners (relativ zu assets). */
  image: string;
}

/**
 * Repräsentiert eine einzelne Quizfrage.
 * Jede Frage gehört zu einem spezifischen Ozean und enthält
 * mehrere Antwortmöglichkeiten, von denen genau eine richtig ist.
 */
export interface QuizQuestion {
  /** Der Text der Frage. */
  question: string;
  /**
   * Ein Array von Antwortmöglichkeiten.
   * Sollte idealerweise 4 Optionen enthalten (Single Choice).
   */
  options: string[];
  /** Die korrekte Antwort (muss exakt mit einer der Optionen übereinstimmen). */
  answer: string;
  /** Pfad zu einem Bild, das die Frage visualisiert. */
  quizimage: string;
  /**
   * Zusatzinformation, die nach Beantwortung der Frage angezeigt wird
   * (egal ob richtig oder falsch), um den Lerneffekt zu verstärken.
   */
  trivia: string;
  // prequizdescription: string; // Veraltet/Nicht mehr genutzt
}

/**
 * Hauptmodell für einen Ozean.
 * Diese Struktur dient als zentrale Datenbasis für die gesamte Anwendung.
 * Sie bündelt allgemeine Infos, Fakten, Bewohner und das zugehörige Quiz.
 */
export interface Ocean {
  /** Eindeutige ID des Ozeans (z.B. 'pacific'), genutzt für Routing und Logik. */
  id: string;
  /** Der anzuzeigende Name des Ozeans (z.B. "Pazifischer Ozean"). */
  name: string;
  // color: string; // Veraltet: Farben werden jetzt über CSS-Klassen/Tailwind gesteuert
  /** Pfad zum Hauptbild des Ozeans. */
  oceanimage: string;
  /** Kurze Einleitung oder Zusammenfassung für die Auswahl-Karte. */
  description: string;
  /** Eine Liste von interessanten Fakten, die im Lern-Modus durchgeblättert werden. */
  facts: string[];
  /** Liste der Bewohner dieses Ozeans. */
  inhabitants: Inhabitant[];
  /** Die Sammlung der Quizfragen für diesen Ozean. */
  quiz: QuizQuestion[];
}
