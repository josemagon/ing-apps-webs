import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Ejecucion, Pagina, PaginaRelations} from '../models';
import {EjecucionRepository} from './ejecucion.repository';

export class PaginaRepository extends DefaultCrudRepository<
  Pagina,
  typeof Pagina.prototype.id,
  PaginaRelations
> {

  public readonly ejecuciones: HasManyRepositoryFactory<Ejecucion, typeof Pagina.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EjecucionRepository') protected ejecucionRepositoryGetter: Getter<EjecucionRepository>,
  ) {
    super(Pagina, dataSource);
    this.ejecuciones = this.createHasManyRepositoryFactoryFor('ejecuciones', ejecucionRepositoryGetter,);
  }
}
