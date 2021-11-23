import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Provider, ProviderRelations, Company} from '../models';
import {CompanyRepository} from './company.repository';

export class ProviderRepository extends DefaultCrudRepository<
  Provider,
  typeof Provider.prototype.id,
  ProviderRelations
> {

  public readonly companies: HasManyRepositoryFactory<Company, typeof Provider.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Provider, dataSource);
    this.companies = this.createHasManyRepositoryFactoryFor('companies', companyRepositoryGetter,);
    this.registerInclusionResolver('companies', this.companies.inclusionResolver);
  }
}
