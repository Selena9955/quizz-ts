export type Option = {
  id: string;
  text: string;
};

export const QuizTypeType = {
  Single: 0,
  Multiple: 1,
  Flash: 2,
} as const;

export type QuizTypeValue = (typeof QuizTypeType)[keyof typeof QuizTypeType];

export type QuizSubmitData = {
  quizType: QuizTypeValue;
  title: string;
  titleDetail: string;
  options: Option[];
  singleAnswerId: string;
  multipleAnswerId: string[];
  flashAnswer: string;
  answerDetail: string;
  tags: string[];
};
