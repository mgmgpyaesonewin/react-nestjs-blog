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
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Request() req: any) {
    try {
      console.log(req.user.id);
      return this.postsService.create(createPostDto, req.user.id);
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to create post', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    try {
      if (req.query.page && req.query.limit) {
        return this.postsService.paginate(req.query.page, req.query.limit);
      }
      return this.postsService.findAll();
    } catch (error) {
      throw new HttpException('Failed to fetch posts', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('own')
  async findOwn(@Request() req: any) {
    try {
      return this.postsService.paginateOwn(
        req.query.page,
        req.query.limit,
        req.user.id,
      );
    } catch (error) {
      throw new HttpException('Failed to fetch posts', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/slug/:slug')
  findOne(@Param('slug') slug: string) {
    try {
      return this.postsService.findOne(slug);
    } catch (error) {
      throw new HttpException('Failed to fetch post', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    try {
      return this.postsService.findOneById(+id);
    } catch (error) {
      throw new HttpException('Failed to fetch post', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any,
  ) {
    try {
      return this.postsService.update(+id, updatePostDto, req.user.id);
    } catch (error) {
      throw new HttpException('Failed to update post', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    try {
      return this.postsService.remove(+id, req.user.id);
    } catch (error) {
      throw new HttpException('Failed to delete post', HttpStatus.BAD_REQUEST);
    }
  }
}
