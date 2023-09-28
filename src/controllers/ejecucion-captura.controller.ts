import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ejecucion,
  Captura,
} from '../models';
import {EjecucionRepository} from '../repositories';

export class EjecucionCapturaController {
  constructor(
    @repository(EjecucionRepository) protected ejecucionRepository: EjecucionRepository,
  ) { }

  @get('/ejecucions/{id}/capturas', {
    responses: {
      '200': {
        description: 'Array of Ejecucion has many Captura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Captura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Captura>,
  ): Promise<Captura[]> {
    return this.ejecucionRepository.capturas(id).find(filter);
  }

  @post('/ejecucions/{id}/capturas', {
    responses: {
      '200': {
        description: 'Ejecucion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Captura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ejecucion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {
            title: 'NewCapturaInEjecucion',
            exclude: ['id'],
            optional: ['ejecucionId']
          }),
        },
      },
    }) captura: Omit<Captura, 'id'>,
  ): Promise<Captura> {
    return this.ejecucionRepository.capturas(id).create(captura);
  }

  @patch('/ejecucions/{id}/capturas', {
    responses: {
      '200': {
        description: 'Ejecucion.Captura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {partial: true}),
        },
      },
    })
    captura: Partial<Captura>,
    @param.query.object('where', getWhereSchemaFor(Captura)) where?: Where<Captura>,
  ): Promise<Count> {
    return this.ejecucionRepository.capturas(id).patch(captura, where);
  }

  @del('/ejecucions/{id}/capturas', {
    responses: {
      '200': {
        description: 'Ejecucion.Captura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Captura)) where?: Where<Captura>,
  ): Promise<Count> {
    return this.ejecucionRepository.capturas(id).delete(where);
  }
}
