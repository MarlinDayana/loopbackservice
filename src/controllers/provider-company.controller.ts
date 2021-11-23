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
  Provider,
  Company,
} from '../models';
import {ProviderRepository} from '../repositories';

export class ProviderCompanyController {
  constructor(
    @repository(ProviderRepository) protected providerRepository: ProviderRepository,
  ) { }

  @get('/providers/{id}/companies', {
    responses: {
      '200': {
        description: 'Array of Provider has many Company',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.providerRepository.companies(id).find(filter);
  }

  @post('/providers/{id}/companies', {
    responses: {
      '200': {
        description: 'Provider model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Provider.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInProvider',
            exclude: ['id'],
            optional: ['providerId']
          }),
        },
      },
    }) company: Omit<Company, 'id'>,
  ): Promise<Company> {
    return this.providerRepository.companies(id).create(company);
  }

  @patch('/providers/{id}/companies', {
    responses: {
      '200': {
        description: 'Provider.Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.providerRepository.companies(id).patch(company, where);
  }

  @del('/providers/{id}/companies', {
    responses: {
      '200': {
        description: 'Provider.Company DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.providerRepository.companies(id).delete(where);
  }
}
