import {Entity, model, property, hasMany} from '@loopback/repository';
import {Company} from './company.model';

@model()
export class Provider extends Entity {
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
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Direccion: string;

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

  @property({
    type: 'string',
    required: true,
  })
  RepresentanteLegal: string;

  @property({
    type: 'string',
    required: true,
  })
  SitioWeb: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @hasMany(() => Company)
  companies: Company[];

  constructor(data?: Partial<Provider>) {
    super(data);
  }
}

export interface ProviderRelations {
  // describe navigational properties here
}

export type ProviderWithRelations = Provider & ProviderRelations;
