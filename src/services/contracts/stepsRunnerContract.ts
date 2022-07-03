import { StageSetting } from '@src/domain/usecases'

export interface StepsRunnerContract {
  execute: (containerId: string, steps: StageSetting) => Promise<void>
}
