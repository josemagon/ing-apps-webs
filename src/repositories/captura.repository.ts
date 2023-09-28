import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {InmemoryDataSource} from '../datasources';
import {Captura, CapturaRelations} from '../models';

export class CapturaRepository extends DefaultCrudRepository<
  Captura,
  typeof Captura.prototype.id,
  CapturaRelations
> {
  constructor(
    @inject('datasources.inmemory') dataSource: InmemoryDataSource,
  ) {
    super(Captura, dataSource);
  }
}
