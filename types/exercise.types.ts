export interface IExercise {
  quest: string;
  answer: string;
}

export interface ICardQuestProps {
  quest: string;
  onSwipeUp?: () => void;
}

export interface ICardAnswerProps {
  answer: string;
  quest: string;
  onSwipeHor?: () => void;
}

export interface ISwipeCardsProps {
  cards: string[];
}
