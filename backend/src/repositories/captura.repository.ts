import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Captura, CapturaRelations} from '../models';

export class CapturaRepository extends DefaultCrudRepository<
  Captura,
  typeof Captura.prototype.id,
  CapturaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Captura, dataSource);
  }
}
