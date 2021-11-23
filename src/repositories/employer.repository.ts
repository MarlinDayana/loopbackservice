import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongobdDataSource} from '../datasources';
import {Employer, EmployerRelations, Company} from '../models';
import {CompanyRepository} from './company.repository';

export class EmployerRepository extends DefaultCrudRepository<
  Employer,
  typeof Employer.prototype.id,
  EmployerRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof Employer.prototype.id>;

  constructor(
    @inject('datasources.mongobd') dataSource: MongobdDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Employer, dataSource);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
  }
}
