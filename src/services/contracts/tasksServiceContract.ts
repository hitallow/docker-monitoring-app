export interface TaskConfig {
  /**
   * delay to execute the task in milliseconds
   */
  delay: number
}
export interface TaskServiceContract {
  addTask: <T = any>(
    queueName: string,
    payload: T,
    config?: TaskConfig
  ) => Promise<void>
}
