import { Module } from '@nestjs/common';
import { PokemonService } from './application/pokemon.service';
import { PokemonController } from './infraestructure/pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './domain/entities/pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Pokemon.name,
        schema: PokemonSchema,
      },
    ]),
  ],

  exports: [MongooseModule],
})
export class PokemonModule {}
