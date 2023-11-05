import {
  BadRequestException,
  // Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePokemonDto } from '../infraestructure/dto/create-pokemon.dto';
import { UpdatePokemonDto } from '../infraestructure/dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from '../domain/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { IPokemonService } from './pokemon.service.interface';
// import { PokemonRepository } from '../domain/repository/pokemon.repository';
// import { IPokemonRepository } from './../../../dist/pokemon/domain/repository/pokemon.respository.interface.d';

@Injectable()
export class PokemonService implements IPokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>, // @Inject(PokemonRepository)
    // private readonly pokemonModel: IPokemonRepository,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    return this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 })
      .select('-__v');
  }

  async findOne(term: string): Promise<Pokemon> {
    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //Mongo id
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    //Name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLocaleLowerCase().trim(),
      });
    }

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or no "${term}" not found`,
      );
    }

    return pokemon;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id);
    // await pokemon.deleteOne();

    // const deletePokemon = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id:${id} not found`);
    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    console.log(error);
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    );
  }

  // findAll(paginationDto: PaginationDto) {
  //   return this.pokemonModel.findAll(paginationDto);
  // }

  // create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
  //   throw new Error('Method not implemented.');
  // }
  // findOne(term: string): Promise<Pokemon> {
  //   throw new Error('Method not implemented.');
  // }
  // update(
  //   term: string,
  //   updatePokemonDto: UpdatePokemonDto,
  // ): Promise<{ name?: string; no?: number }> {
  //   throw new Error('Method not implemented.');
  // }
  // remove(id: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
}
