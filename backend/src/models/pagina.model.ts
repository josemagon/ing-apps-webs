import {Entity, hasMany, model, property} from '@loopback/repository';
import {Ejecucion} from './ejecucion.model';

@model()
export class Pagina extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'boolean',
    required: true,
    default: 0
  })
  running: boolean;

  @property({
    type: 'string',
    required: true,
  })
  titulo: string;

  @property({
    type: 'number',
    required: true,
  })
  profundidad: number;

  @property({
    type: 'string'
  })
  imagen?: string;

  @property({
    type: 'string',
    required: true,
  })
  frecuencia: string;

  @property({
    type: 'string'
  })
  request_extractor?: string;

  @property({
    type: 'string'
  })
  document_extractor?: string;

  @hasMany(() => Ejecucion)
  ejecuciones: Ejecucion[];

  constructor(data?: Partial<Pagina>) {
    super(data);
  }
}

export interface PaginaRelations {
  // describe navigational properties here
}

export type PaginaWithRelations = Pagina & PaginaRelations;
