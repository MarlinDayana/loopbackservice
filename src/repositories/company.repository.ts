import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Company, CompanyRelations, Employer, Provider} from '../models';
import {EmployerRepository} from './employer.repository';
import {ProviderRepository} from './provider.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly employers: HasManyRepositoryFactory<Employer, typeof Company.prototype.id>;

  public readonly providers: HasManyRepositoryFactory<Provider, typeof Company.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('EmployerRepository') protected employerRepositoryGetter: Getter<EmployerRepository>, @repository.getter('ProviderRepository') protected providerRepositoryGetter: Getter<ProviderRepository>,
  ) {
    super(Company, dataSource);
    this.providers = this.createHasManyRepositoryFactoryFor('providers', providerRepositoryGetter,);
    this.registerInclusionResolver('providers', this.providers.inclusionResolver);
    this.employers = this.createHasManyRepositoryFactoryFor('employers', employerRepositoryGetter,);
    this.registerInclusionResolver('employers', this.employers.inclusionResolver);
  }
}
