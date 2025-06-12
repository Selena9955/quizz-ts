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

export type QuizValidationInput = {
  quizType: QuizTypeValue;
  title: string;
  titleDetail: string | null;
  options: Option[];
  singleAnswerId: string | null;
  multipleAnswerId: string[] | null;
  flashAnswer: string | null;
  answerDetail: string | null;
};
