/**
 * Ein generischer Builder für Mock-Daten in Tests.
 * Ermöglicht das einfache Erstellen von Test-Objekten mit Standardwerten.
 *
 * @template T - Der Typ des zu erstellenden Objekts.
 */
export class MockBuilder<T> {
  private data: Partial<T> = {};

  constructor(private readonly defaults: T) {
    this.data = { ...defaults };
  }

  /**
   * Überschreibt bestimmte Eigenschaften des Objekts.
   *
   * @param overrides - Ein Objekt mit den zu überschreibenden Eigenschaften.
   * @returns Die Builder-Instanz (Fluent Interface).
   */
  with(overrides: Partial<T>): this {
    this.data = { ...this.data, ...overrides };
    return this;
  }

  /**
   * Erstellt das fertige Objekt.
   *
   * @returns Das erstellte Objekt vom Typ T.
   */
  build(): T {
    return this.data as T;
  }

  /**
   * Erstellt eine Liste von Objekten.
   *
   * @param count - Anzahl der zu erstellenden Objekte.
   * @param overrides - Optionale Überschreibungen für alle Objekte.
   * @returns Ein Array von Objekten.
   */
  buildList(count: number, overrides?: Partial<T>): T[] {
    return Array.from({ length: count }, () => {
      const item = { ...this.data, ...overrides };
      return item as T;
    });
  }
}
