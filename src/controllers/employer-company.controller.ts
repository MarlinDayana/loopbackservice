import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employer,
  Company,
} from '../models';
import {EmployerRepository} from '../repositories';

export class EmployerCompanyController {
  constructor(
    @repository(EmployerRepository)
    public employerRepository: EmployerRepository,
  ) { }

  @get('/employers/{id}/company', {
    responses: {
      '200': {
        description: 'Company belonging to Employer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string('id') id: typeof Employer.prototype.id,
  ): Promise<Company> {
    return this.employerRepository.company(id);
  }
}
