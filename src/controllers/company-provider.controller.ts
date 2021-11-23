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
  Provider,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyProviderController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/providers', {
    responses: {
      '200': {
        description: 'Array of Company has many Provider',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Provider)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Provider>,
  ): Promise<Provider[]> {
    return this.companyRepository.providers(id).find(filter);
  }

  @post('/companies/{id}/providers', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Provider)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provider, {
            title: 'NewProviderInCompany',
            exclude: ['id'],
            optional: ['companyId']
          }),
        },
      },
    }) provider: Omit<Provider, 'id'>,
  ): Promise<Provider> {
    return this.companyRepository.providers(id).create(provider);
  }

  @patch('/companies/{id}/providers', {
    responses: {
      '200': {
        description: 'Company.Provider PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Provider, {partial: true}),
        },
      },
    })
    provider: Partial<Provider>,
    @param.query.object('where', getWhereSchemaFor(Provider)) where?: Where<Provider>,
  ): Promise<Count> {
    return this.companyRepository.providers(id).patch(provider, where);
  }

  @del('/companies/{id}/providers', {
    responses: {
      '200': {
        description: 'Company.Provider DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Provider)) where?: Where<Provider>,
  ): Promise<Count> {
    return this.companyRepository.providers(id).delete(where);
  }
}
