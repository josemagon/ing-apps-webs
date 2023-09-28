import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InmemoryDataSource} from '../datasources';
import {Ejecucion, EjecucionRelations, Captura} from '../models';
import {CapturaRepository} from './captura.repository';

export class EjecucionRepository extends DefaultCrudRepository<
  Ejecucion,
  typeof Ejecucion.prototype.id,
  EjecucionRelations
> {

  public readonly capturas: HasManyRepositoryFactory<Captura, typeof Ejecucion.prototype.id>;

  constructor(
    @inject('datasources.inmemory') dataSource: InmemoryDataSource, @repository.getter('CapturaRepository') protected capturaRepositoryGetter: Getter<CapturaRepository>,
  ) {
    super(Ejecucion, dataSource);
    this.capturas = this.createHasManyRepositoryFactoryFor('capturas', capturaRepositoryGetter,);
    this.registerInclusionResolver('capturas', this.capturas.inclusionResolver);
  }
}
