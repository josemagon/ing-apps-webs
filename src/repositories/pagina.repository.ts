import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {InmemoryDataSource} from '../datasources';
import {Pagina, PaginaRelations, Ejecucion} from '../models';
import {EjecucionRepository} from './ejecucion.repository';

export class PaginaRepository extends DefaultCrudRepository<
  Pagina,
  typeof Pagina.prototype.id,
  PaginaRelations
> {

  public readonly ejecuciones: HasManyRepositoryFactory<Ejecucion, typeof Pagina.prototype.id>;

  constructor(
    @inject('datasources.inmemory') dataSource: InmemoryDataSource, @repository.getter('EjecucionRepository') protected ejecucionRepositoryGetter: Getter<EjecucionRepository>,
  ) {
    super(Pagina, dataSource);
    this.ejecuciones = this.createHasManyRepositoryFactoryFor('ejecuciones', ejecucionRepositoryGetter,);
  }
}
