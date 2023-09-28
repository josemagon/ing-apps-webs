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
  Pagina,
  Ejecucion,
} from '../models';
import {PaginaRepository} from '../repositories';

export class PaginaEjecucionController {
  constructor(
    @repository(PaginaRepository) protected paginaRepository: PaginaRepository,
  ) { }

  @get('/paginas/{id}/ejecucions', {
    responses: {
      '200': {
        description: 'Array of Pagina has many Ejecucion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ejecucion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ejecucion>,
  ): Promise<Ejecucion[]> {
    return this.paginaRepository.ejecuciones(id).find(filter);
  }

  @post('/paginas/{id}/ejecucions', {
    responses: {
      '200': {
        description: 'Pagina model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ejecucion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pagina.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ejecucion, {
            title: 'NewEjecucionInPagina',
            exclude: ['id'],
            optional: ['paginaId']
          }),
        },
      },
    }) ejecucion: Omit<Ejecucion, 'id'>,
  ): Promise<Ejecucion> {
    return this.paginaRepository.ejecuciones(id).create(ejecucion);
  }

  @patch('/paginas/{id}/ejecucions', {
    responses: {
      '200': {
        description: 'Pagina.Ejecucion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ejecucion, {partial: true}),
        },
      },
    })
    ejecucion: Partial<Ejecucion>,
    @param.query.object('where', getWhereSchemaFor(Ejecucion)) where?: Where<Ejecucion>,
  ): Promise<Count> {
    return this.paginaRepository.ejecuciones(id).patch(ejecucion, where);
  }

  @del('/paginas/{id}/ejecucions', {
    responses: {
      '200': {
        description: 'Pagina.Ejecucion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ejecucion)) where?: Where<Ejecucion>,
  ): Promise<Count> {
    return this.paginaRepository.ejecuciones(id).delete(where);
  }
}
