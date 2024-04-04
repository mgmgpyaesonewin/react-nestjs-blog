import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postsService.create(createPostDto);
    } catch (error) {
      throw new HttpException('Failed to create post', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.postsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch posts', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const postId = parseInt(id, 10);
    if (isNaN(postId)) {
      throw new HttpException('Invalid ID', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.postsService.findOne(+id);
    } catch (error) {
      throw new HttpException('Failed to fetch post', HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.update(+id, updatePostDto);
    } catch (error) {
      throw new HttpException('Failed to update post', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.postsService.remove(+id);
    } catch (error) {
      throw new HttpException('Failed to delete post', HttpStatus.BAD_REQUEST);
    }
  }
}
