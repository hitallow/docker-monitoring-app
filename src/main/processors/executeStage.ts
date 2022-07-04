import { ExecuteStageParams } from '@src/domain/usecases'
import { bullAdapter } from '@src/main/adapters/bullAdapter'
import { executeStageFactory } from '@src/main/factories'

export const executeStage = async () =>
  bullAdapter<ExecuteStageParams>(await executeStageFactory())
