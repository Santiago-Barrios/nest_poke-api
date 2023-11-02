import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  // id: string // mongo lo da automáticamente

  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
