import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Company} from './company.model';

@model()
export class Employer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Genero: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @belongsTo(() => Company)
  companyId: string;

  constructor(data?: Partial<Employer>) {
    super(data);
  }
}

export interface EmployerRelations {
  // describe navigational properties here
}

export type EmployerWithRelations = Employer & EmployerRelations;
