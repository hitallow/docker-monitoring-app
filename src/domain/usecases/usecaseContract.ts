import { HttpResponse } from '@src/services/helpers/http'

export interface UsecaseContract<T, R = any> {
  name: string
  execute(params: T): Promise<HttpResponse<R>>
}
