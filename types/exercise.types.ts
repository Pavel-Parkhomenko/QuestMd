export interface IExercise {
  quest: string;
  answer: string;
}

export interface CardProps {
  quest: string;
  answer: string;
  onSwipeUp?: () => void;
  onSwipeHor?: () => void;
  isCardAnswer: boolean;
}

export interface ISwipeCardsProps {
  cards: string[];
}
