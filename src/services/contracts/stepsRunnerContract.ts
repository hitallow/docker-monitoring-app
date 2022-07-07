import { StageSetting } from '@src/domain/usecases'

export interface StepsRunnerContract {
  execute: (containerName: string, steps: StageSetting) => Promise<void>
}
