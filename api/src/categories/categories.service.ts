import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findAllWithPosts() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.posts', 'posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('posts.status = :published', { published: 'PUBLISHED' })
      .getMany();
  }

  findOne(id: number) {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.posts', 'posts')
      .leftJoinAndSelect('posts.user', 'user')
      .where('category.id = :id', { id })
      .where('posts.status = :published', { published: 'PUBLISHED' })
      .getOne();
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.categoryRepository.update(id, updateCategoryDto);
    if (result.affected === 0) {
      return null;
    }
    return this.categoryRepository.findOneBy({
      id,
    });
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  findTrending() {
    return this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.posts', 'posts')
      .where('posts.status = :published', { published: 'PUBLISHED' })
      .select('category.*, COUNT(posts.id) as postCount')
      .groupBy('category.id')
      .orderBy('postCount', 'DESC')
      .take(10)
      .getRawMany();
  }
}
