import { Model } from 'mongoose';
import { Pokemon } from '../entities/pokemon.entity';
import {
  CreatePokemonDto,
  UpdatePokemonDto,
} from 'src/pokemon/infraestructure/dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export interface IPokemonRepository {
  create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
  findAll(paginationDto: PaginationDto): Promise<Pokemon[]>;
  findOne(term: string): Promise<Pokemon>;
  update(
    term: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<{ name?: string; no?: number }>;
  remove(id: string): Promise<void>;
}

export interface PokemonRepositoryDependencies {
  pokemonModel: Model<Pokemon>;
}
