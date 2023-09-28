import {Entity, model, property} from '@loopback/repository';

@model()
export class Captura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'object',
    required: true,
  })
  contenido: object;

  @property({
    type: 'string',
  })
  imagen?: string;

  @property({
    type: 'string',
  })
  ejecucionId?: string;

  constructor(data?: Partial<Captura>) {
    super(data);
  }
}

export interface CapturaRelations {
  // describe navigational properties here
}

export type CapturaWithRelations = Captura & CapturaRelations;
