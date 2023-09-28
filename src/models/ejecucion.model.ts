import {Entity, model, property, hasMany} from '@loopback/repository';
import {Captura} from './captura.model';

@model()
export class Ejecucion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  hora?: string;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'string',
  })
  paginaId?: string;

  @hasMany(() => Captura)
  capturas: Captura[];

  constructor(data?: Partial<Ejecucion>) {
    super(data);
  }
}

export interface EjecucionRelations {
  // describe navigational properties here
}

export type EjecucionWithRelations = Ejecucion & EjecucionRelations;
