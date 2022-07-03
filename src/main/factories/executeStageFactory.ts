import { ExecuteStageUsecase } from '@src/services/usecases/executeStage'
import { ExperimentRepository } from '@src/infra/database/repositories'
import { TaskService, StagesRunner } from '@src/infra/services'

import { getDatabase } from '@src/infra/database/config'

export async function executeStageFactory(): Promise<ExecuteStageUsecase> {
  const database = await getDatabase()
  return new ExecuteStageUsecase(
    new ExperimentRepository(database),
    new StagesRunner(),
    new TaskService()
  )
}
