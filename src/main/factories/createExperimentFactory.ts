import { CreateExperimentUsecase } from '@src/services/usecases/createExperiment/createExperiment'
import { ExperimentRepository } from '@src/infra/database/repositories'
import { TaskService, DockerService } from '@src/infra/services'

import { getDatabase } from '@src/infra/database/config'

export async function createExperimentFactory(): Promise<CreateExperimentUsecase> {
  const database = await getDatabase()
  return new CreateExperimentUsecase(
    new ExperimentRepository(database),
    new DockerService(),
    new TaskService()
  )
}
