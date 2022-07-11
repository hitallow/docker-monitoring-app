import { ExperimentRepository } from '@src/infra/database'
import { LoadExperimentUsecase } from '@src/services/usecases/loadExperiments'
import { getDatabase } from 'src/infra/database/config/database-connection'

export const loadExperimentFactory = async () => {
  const database = await getDatabase()
  return new LoadExperimentUsecase(new ExperimentRepository(database))
}
