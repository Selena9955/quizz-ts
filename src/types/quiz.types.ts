import type { TagData } from "./tag.types";

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

export const QuizTypeLabels: Record<QuizTypeValue, string> = {
  [QuizTypeType.Single]: "單選題",
  [QuizTypeType.Multiple]: "多選題",
  [QuizTypeType.Flash]: "單字卡",
};

export type FilterType = "ALL" | "SINGLE" | "MULTIPLE" | "FLASH";

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

export type QuizListData = {
  id: number;
  authorId: number;
  authorName: string;
  avatarUrl: string;
  quizType: QuizTypeValue;
  title: string;
  tags: string[];
  quizStats: QuizStats;
};

export type QuizStats = {
  correctCount: number;
  correctRate: number;
  totalCount: number;
};

export type QuizDetailData = {
  id: number;
  quizType: QuizTypeValue;
  title: string;
  titleDetail: string;
  answerDetail: string;
  tags: TagData[];
  authorName: string;
  authorAvatarUrl: string;
  createTime: string;
  updateTime: string;
  options: Option[];
  singleAnswerId: string;
  multipleAnswerId: string[];
  flashAnswer: string;
};

export type QuizRecordStats = {
  totalCount: number;
  correctCount: number;
  correctRate: number;
};

export type userRecordData = {
  totalCount: number;
  correctCount: number;
  correctRate: number; // 百分比形式
  recentQuizzes: {
    id: number;
    title: string;
  }[];
};
