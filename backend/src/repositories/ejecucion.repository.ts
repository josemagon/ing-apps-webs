import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Captura, Ejecucion, EjecucionRelations} from '../models';
import {CapturaRepository} from './captura.repository';

export class EjecucionRepository extends DefaultCrudRepository<
  Ejecucion,
  typeof Ejecucion.prototype.id,
  EjecucionRelations
> {

  public readonly capturas: HasManyRepositoryFactory<Captura, typeof Ejecucion.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CapturaRepository') protected capturaRepositoryGetter: Getter<CapturaRepository>,
  ) {
    super(Ejecucion, dataSource);
    this.capturas = this.createHasManyRepositoryFactoryFor('capturas', capturaRepositoryGetter,);
    this.registerInclusionResolver('capturas', this.capturas.inclusionResolver);
  }
}
