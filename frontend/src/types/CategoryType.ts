import type PostType from './PostType';

interface CategoryType {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface TrendingCategoryType extends CategoryType {
  postCount: number;
}

interface CategoryWithPostsType extends CategoryType {
  posts: PostType[];
}

export type {
  CategoryType,
  TrendingCategoryType,
  CategoryWithPostsType,
};
