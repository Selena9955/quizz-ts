export type CreateArticlePayload = {
  title: string;
  content: string;
  previewContent: string;
  tags: string[];
};

export type ArticleListType = {
  id: number;
  title: string;
  previewContent: string;
  createTime: string;
  tags: string[];
  author: {
    id: number;
    username: string;
  };
};

export type ArticleDetailType = {
  id: number;
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  tags: string[];
  author: {
    id: number;
    username: string;
  };
};
