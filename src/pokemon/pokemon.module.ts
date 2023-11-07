import { Module } from '@nestjs/common';
import { PokemonService } from './application/pokemon.service';
import { PokemonController } from './infraestructure/pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './domain/entities/pokemon.entity';
import { PokemonRepository } from './domain/repository/pokemon.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
    CommonModule,
  ],

  exports: [MongooseModule],
})
export class PokemonModule {}
