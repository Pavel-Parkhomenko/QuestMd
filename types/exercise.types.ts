export interface IExercise {
  quest: string;
  answer: string;
}

export interface ICardQuestProps {
  quest: string;
  showAnswer: () => void;
}

export interface ICardAnswerProps {
  answer: string;
  quest: string;
  showQuest: () => void;
}

export interface ISwipeCardsProps {
  cards: string[];
}

export interface IListData {
  name: string;
  exercises: IExercise[];
}
