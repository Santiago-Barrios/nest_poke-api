import { CreatePokemonDto } from '../infraestructure/dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../infraestructure/dto/update-pokemon.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Pokemon } from '../domain/entities/pokemon.entity';
import { Model } from 'mongoose';

export interface IPokemonService {
  create(createPokemonDto: CreatePokemonDto): Promise<Pokemon>;
  findAll(paginationDto: PaginationDto): Promise<Pokemon[]>;
  findOne(term: string): Promise<Pokemon>;
  update(
    term: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<{ name?: string; no?: number }>;
  remove(id: string): Promise<void>;
}

export interface PokemonServiceDependencies {
  pokemonModel: Model<Pokemon>;
}
