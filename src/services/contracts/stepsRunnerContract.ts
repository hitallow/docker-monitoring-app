import { StageSetting } from '@src/domain/usecases'

export interface StepsRunnerContract {
  run: (steps: StageSetting) => Promise<void>
}
