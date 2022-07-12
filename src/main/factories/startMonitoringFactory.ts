import { ExperimentRepository, SettingsRepository } from '@src/infra/database'
import { TaskService, DockerService } from '@src/infra/services'
import { StartMonitoringUsecase } from '@src/services/usecases/startMonitoring'
import { getDatabase } from 'src/infra/database/config/database-connection'

export const startMonitoringFactory = async () => {
  const database = await getDatabase()

  return new StartMonitoringUsecase(
    new TaskService(),
    new DockerService(),
    new SettingsRepository(database),
    new ExperimentRepository(database)
  )
}
