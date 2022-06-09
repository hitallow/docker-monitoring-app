export interface UsecaseContract<T> {
  execute(params: T): Promise<any>
}
