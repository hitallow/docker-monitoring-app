import { MonitoryContainerUsecase } from '@src/services/usecases/monitoryContainer'
import { ExperimentRepository, SettingsRepository } from '@src/infra/database'
import { getDatabase } from 'src/infra/database/config/database-connection'
import { TaskService, DockerService } from '@src/infra/services'

export async function monitoryContainerFactory() {
  const database = await getDatabase()

  return new MonitoryContainerUsecase(
    new TaskService(),
    new DockerService(),
    new SettingsRepository(database),
    new ExperimentRepository(database)
  )
}
