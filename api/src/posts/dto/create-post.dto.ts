import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { PostStatus } from '../entities/post-status.enum';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  content: string;

  @IsString({ message: 'Status must be a string' })
  status: PostStatus;

  @IsNotEmpty({ message: 'Category is required' })
  category: CreateCategoryDto;
}
