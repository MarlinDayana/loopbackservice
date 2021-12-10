import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Employer} from '../models';
import {EmployerRepository} from '../repositories';
import {NotificacionService} from '../services';

export class EmployerController {
  constructor(
    @repository(EmployerRepository)
    public employerRepository: EmployerRepository,
  ) {}
  @get('/employers/prueba-sms')
  @response(200, {
    description: 'Employer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employer)}},
  })
  enviarsms() {
    const notificationService = new NotificacionService();
    notificationService.EnviarSMS();
    return {success: true};
  }

  @post('/employers')
  @response(200, {
    description: 'Employer model instance',
    content: {'application/json': {schema: getModelSchemaRef(Employer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employer, {
            title: 'NewEmployer',
            exclude: ['id'],
          }),
        },
      },
    })
    employer: Omit<Employer, 'id'>,
  ): Promise<Employer> {
    return this.employerRepository.create(employer);
  }

  @get('/employers/count')
  @response(200, {
    description: 'Employer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Employer) where?: Where<Employer>): Promise<Count> {
    return this.employerRepository.count(where);
  }

  @get('/employers')
  @response(200, {
    description: 'Array of Employer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Employer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Employer) filter?: Filter<Employer>,
  ): Promise<Employer[]> {
    return this.employerRepository.find(filter);
  }

  @patch('/employers')
  @response(200, {
    description: 'Employer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employer, {partial: true}),
        },
      },
    })
    employer: Employer,
    @param.where(Employer) where?: Where<Employer>,
  ): Promise<Count> {
    return this.employerRepository.updateAll(employer, where);
  }

  @get('/employers/{id}')
  @response(200, {
    description: 'Employer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Employer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Employer, {exclude: 'where'})
    filter?: FilterExcludingWhere<Employer>,
  ): Promise<Employer> {
    return this.employerRepository.findById(id, filter);
  }

  @patch('/employers/{id}')
  @response(204, {
    description: 'Employer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employer, {partial: true}),
        },
      },
    })
    employer: Employer,
  ): Promise<void> {
    await this.employerRepository.updateById(id, employer);
  }

  @put('/employers/{id}')
  @response(204, {
    description: 'Employer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() employer: Employer,
  ): Promise<void> {
    await this.employerRepository.replaceById(id, employer);
  }

  @del('/employers/{id}')
  @response(204, {
    description: 'Employer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.employerRepository.deleteById(id);
  }
}
