import { PaginationDto } from '../dto/pagination.dto';

export interface IOrmRepository {
  findAll<T>(paginationDto: PaginationDto): Promise<T[]>;
  create<T, K>(createDto: K): Promise<T>;
  findOne<T>(term: string | number): Promise<T>;
  update<T, K>(term: string | number, updatePokemonDto: K): Promise<T>;
  remove(id: string): Promise<void>;
}
