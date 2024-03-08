import { ParameterModel } from '../entities/parameter-repository'

export interface GetParameterRepository {
  get: (parameterId: string) => Promise<ParameterModel>
}