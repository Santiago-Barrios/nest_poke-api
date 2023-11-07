import { IOrmRepository } from './orm.repository.interface';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { PaginationDto } from '../dto/pagination.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmMongooseRepository<T> implements IOrmRepository {
  private model: Model<T>;
  constructor(
    nameClass: string,
    @InjectConnection() private connection?: Connection,
  ) {
    this.model = this.connection.model(nameClass);
  }

  async findAll<T>(paginationDto: PaginationDto): Promise<T[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.model
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v')
      .then((documents: any) => {
        return documents.map((document) => document.toObject());
      });
  }

  create<T, K>(createDto: K): Promise<T> {
    throw new Error('Method not implemented.');
  }
  findOne<T>(term: string | number): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update<T, K>(term: string | number, updatePokemonDto: K): Promise<T> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
