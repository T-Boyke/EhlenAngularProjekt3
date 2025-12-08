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
