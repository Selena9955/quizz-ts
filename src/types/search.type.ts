export const SearchType = {
  QUIZ: 0,
  ARTICLE: 1,
  USER: 2,
} as const;

export type SearchType = (typeof SearchType)[keyof typeof SearchType];
export type SearchTypeKey = keyof typeof SearchType;
export type SearchTypeValue = (typeof SearchType)[SearchTypeKey];
