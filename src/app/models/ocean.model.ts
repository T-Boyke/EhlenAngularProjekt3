export interface Inhabitant {
  name: string;
  description: string;
  image: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  quizimage: string;
  trivia: string;
  prequizdescription: string;
}

export interface Ocean {
  id: string;
  name: string;
  color: string;
  oceanimage: string;
  description: string;
  facts: string[];
  inhabitants: Inhabitant[];
  quiz: QuizQuestion[];
}
