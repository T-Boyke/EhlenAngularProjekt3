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
