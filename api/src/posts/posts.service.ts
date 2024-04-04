import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const result = await this.postRepository.update(id, updatePostDto);
    if (result.affected === 0) {
      return null;
    }
    return this.postRepository.findOneBy({
      id,
    });
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }
}
