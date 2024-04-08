import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostStatus } from './entities/post-status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, userId: number) {
    const post = this.postRepository.create({
      ...createPostDto,
      user: { id: userId },
    });
    return await this.postRepository.save(post);
  }

  async paginate(page?: number, limit?: number) {
    const [result, total] = await this.postRepository.findAndCount({
      where: {
        status: PostStatus.PUBLISHED,
      },
      take: limit,
      skip: (page - 1) * limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: result,
      page: page ? +page : 1,
      totalPage: Math.ceil(total / limit),
      total,
      limit: limit ? +limit : 10,
    };
  }

  findAll() {
    return this.postRepository.find();
  }

  async paginateOwn(page?: number, limit?: number, userId?: number) {
    const [result, total] = await this.postRepository.findAndCount({
      where: {
        user: { id: userId },
      },
      take: limit,
      skip: (page - 1) * limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: result,
      page: page ? +page : 1,
      totalPage: Math.ceil(total / limit),
      total,
      limit: limit ? +limit : 10,
    };
  }

  findOne(slug: string) {
    return this.postRepository.findOneBy({
      slug,
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const postToUpdate = await this.postRepository.findOneBy({
      id,
    });

    if (postToUpdate.user.id !== userId) {
      throw new HttpException(
        'Only Author can update the post',
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.postRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      return null;
    }
    return this.postRepository.findOneBy({
      id,
    });
  }

  remove(id: number, userId: number) {
    return this.postRepository
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id AND userId = :userId', { id, userId })
      .execute();
  }
}
