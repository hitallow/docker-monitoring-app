export interface TaskConfig {
  delay: number
}
export interface TaskServiceContract {
  addTask: <T = any>(
    queueName: string,
    payload: T,
    config?: TaskConfig
  ) => Promise<void>
}
