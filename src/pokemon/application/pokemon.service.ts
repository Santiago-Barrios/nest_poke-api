import { Inject, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from '../infraestructure/dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../infraestructure/dto/update-pokemon.dto';
import { Pokemon } from '../domain/entities/pokemon.entity';
import { PaginationDto } from '../../common/domain/dto/pagination.dto';
import { IPokemonService } from './pokemon.service.interface';
import { PokemonRepository } from '../domain/repository/pokemon.repository';
import { IPokemonRepository } from '../domain/repository/pokemon.repository.interface';

@Injectable()
export class PokemonService implements IPokemonService {
  constructor(
    @Inject(PokemonRepository)
    private readonly pokemonRepository: IPokemonRepository,
  ) {}

  findAll(paginationDto: PaginationDto) {
    return this.pokemonRepository.findAll(paginationDto);
  }

  findOne(term: string): Promise<Pokemon> {
    return this.pokemonRepository.findOne(term);
  }

  create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonRepository.create(createPokemonDto);
  }

  update(
    term: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<{ name?: string; no?: number }> {
    return this.pokemonRepository.update(term, updatePokemonDto);
  }

  remove(id: string): Promise<void> {
    return this.pokemonRepository.remove(id);
  }
}
