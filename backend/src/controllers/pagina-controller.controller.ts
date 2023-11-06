import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pagina} from '../models';
import {PaginaRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { SecurityBindings, securityId, UserProfile } from '@loopback/security'

@authenticate({
  strategy : 'auth0-jwt',
  options : {
    scopes : ['pagina']
  }
})
export class PaginaControllerController {
  constructor(
    @inject(SecurityBindings.USER)
    currentUserProfile : UserProfile,
    @repository(PaginaRepository)
    public paginaRepository : PaginaRepository,
  ) {}

  @post('/paginas')
  @response(200, {
    description: 'Pagina model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pagina)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagina, {
            title: 'NewPagina',
            exclude: ['id'],
          }),
        },
      },
    })
    pagina: Omit<Pagina, 'id'>,
  ): Promise<Pagina> {
    return this.paginaRepository.create(pagina);
  }

  @get('/paginas/count')
  @response(200, {
    description: 'Pagina model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pagina) where?: Where<Pagina>,
  ): Promise<Count> {
    return this.paginaRepository.count(where);
  }

  @get('/paginas')
  @response(200, {
    description: 'Array of Pagina model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pagina, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pagina) filter?: Filter<Pagina>,
  ): Promise<Pagina[]> {
    return this.paginaRepository.find(filter);
  }

  @patch('/paginas')
  @response(200, {
    description: 'Pagina PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagina, {partial: true}),
        },
      },
    })
    pagina: Pagina,
    @param.where(Pagina) where?: Where<Pagina>,
  ): Promise<Count> {
    return this.paginaRepository.updateAll(pagina, where);
  }

  @get('/paginas/{id}')
  @response(200, {
    description: 'Pagina model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pagina, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pagina, {exclude: 'where'}) filter?: FilterExcludingWhere<Pagina>
  ): Promise<Pagina> {
    return this.paginaRepository.findById(id, filter);
  }

  @patch('/paginas/{id}')
  @response(204, {
    description: 'Pagina PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pagina, {partial: true}),
        },
      },
    })
    pagina: Pagina,
  ): Promise<void> {
    await this.paginaRepository.updateById(id, pagina);
  }

  @put('/paginas/{id}')
  @response(204, {
    description: 'Pagina PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pagina: Pagina,
  ): Promise<void> {
    await this.paginaRepository.replaceById(id, pagina);
  }

  @del('/paginas/{id}')
  @response(204, {
    description: 'Pagina DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.paginaRepository.deleteById(id);
  }
}
