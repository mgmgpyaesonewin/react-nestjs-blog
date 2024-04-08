import CategoryType from './CategoryType';
import UserType from './UserType';

interface PostType {
  id: string;
  slug: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  category: CategoryType;
}

export default PostType;
