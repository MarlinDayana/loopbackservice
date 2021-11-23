import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Company,
  Employer,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyEmployerController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/employers', {
    responses: {
      '200': {
        description: 'Array of Company has many Employer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employer)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Employer>,
  ): Promise<Employer[]> {
    return this.companyRepository.employers(id).find(filter);
  }

  @post('/companies/{id}/employers', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employer)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employer, {
            title: 'NewEmployerInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) employer: Omit<Employer, 'id'>,
  ): Promise<Employer> {
    return this.companyRepository.employers(id).create(employer);
  }

  @patch('/companies/{id}/employers', {
    responses: {
      '200': {
        description: 'Company.Employer PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employer, {partial: true}),
        },
      },
    })
    employer: Partial<Employer>,
    @param.query.object('where', getWhereSchemaFor(Employer)) where?: Where<Employer>,
  ): Promise<Count> {
    return this.companyRepository.employers(id).patch(employer, where);
  }

  @del('/companies/{id}/employers', {
    responses: {
      '200': {
        description: 'Company.Employer DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Employer)) where?: Where<Employer>,
  ): Promise<Count> {
    return this.companyRepository.employers(id).delete(where);
  }
}
