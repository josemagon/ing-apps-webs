import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  OrClause,
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
  RestBindings,
  Request,
} from '@loopback/rest';
import {Captura} from '../models';
import {CapturaRepository, ClientRepository} from '../repositories';
import { inject } from '@loopback/core';

export class CapturaControllerController {
  constructor(
    @repository(CapturaRepository)
    public capturaRepository : CapturaRepository,
  ) {}

  @post('/capturas')
  @response(200, {
    description: 'Captura model instance',
    content: {'application/json': {schema: getModelSchemaRef(Captura)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {
            title: 'NewCaptura',
            exclude: ['id'],
          }),
        },
      },
    })
    captura: Omit<Captura, 'id'>,
  ): Promise<Captura> {
    return this.capturaRepository.create(captura);
  }

  @get('/capturas/count')
  @response(200, {
    description: 'Captura model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Captura) where?: Where<Captura>,
  ): Promise<Count> {
    return this.capturaRepository.count(where);
  }

  @get('/capturas')
  @response(200, {
    description: 'Array of Captura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Captura, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Captura) filter?: Filter<Captura>,
  ): Promise<Captura[]> {
    return this.capturaRepository.find(filter);
  }

  @get('/client-search')
  @response(200, {
    description: 'Array of Captura model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Captura, {includeRelations: true}),
        },
      },
    },
  })
  async clientSearch(
    @inject(RestBindings.Http.REQUEST) req: Request,
    @repository(ClientRepository) clientRepository: ClientRepository
  ): Promise<Captura[]> {
    let q = req.query.q as String
    if(!q)
      return []
      
    let palabras: string[] = q.split(' ')

    let token = this.getToken(req)
    if(!token)
      return []
    
    let apiKeyExists = await clientRepository.findOne({
      where : {
        api_key : token + ""
      }
    })

    if(!apiKeyExists)
      return []

    // interface ContenidoLikeCondition {
    //   contenido: {
    //     like: string;
    //   };
    // }

    // let contenidoLikeConditions: ContenidoLikeCondition[] = []
    // palabras.forEach( (palabra:string) => {
    //   contenidoLikeConditions.push({
    //     contenido : {
    //       like : palabra
    //     }
    //   })
    // });

    // let orClauses: Where<Captura>[] = palabras.map((palabra) => {
    //   return {
        
    //   }
    // })
    
    return this.capturaRepository.find({
      where : {
        contenido : {
          regexp : new RegExp(palabras.join('|'), 'i')
        }
      }
    });
  }

  @patch('/capturas')
  @response(200, {
    description: 'Captura PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {partial: true}),
        },
      },
    })
    captura: Captura,
    @param.where(Captura) where?: Where<Captura>,
  ): Promise<Count> {
    return this.capturaRepository.updateAll(captura, where);
  }

  @get('/capturas/{id}')
  @response(200, {
    description: 'Captura model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Captura, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Captura, {exclude: 'where'}) filter?: FilterExcludingWhere<Captura>
  ): Promise<Captura> {
    return this.capturaRepository.findById(id, filter);
  }

  @patch('/capturas/{id}')
  @response(204, {
    description: 'Captura PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Captura, {partial: true}),
        },
      },
    })
    captura: Captura,
  ): Promise<void> {
    await this.capturaRepository.updateById(id, captura);
  }

  @put('/capturas/{id}')
  @response(204, {
    description: 'Captura PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() captura: Captura,
  ): Promise<void> {
    await this.capturaRepository.replaceById(id, captura);
  }

  @del('/capturas/{id}')
  @response(204, {
    description: 'Captura DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.capturaRepository.deleteById(id);
  }

  private getToken(req: Request){
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.access_token) {
      return req.query.access_token;
    }
    return null;
  }
}
