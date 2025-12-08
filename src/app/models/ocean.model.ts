import { Inhabitant } from './inhabitant.model';
import { QuizQuestion } from './quiz-question.model';

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
