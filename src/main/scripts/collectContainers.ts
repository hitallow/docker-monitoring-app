import { logger } from '@src/services/helpers/logger/logger'
import { collectContainersStatsFactory } from '../factories'

const collectInformations = async () => {
  const collectContainersStatsUsecase = await collectContainersStatsFactory()

  setInterval(() => {
    logger.info('Coletando dados...')
    collectContainersStatsUsecase.execute()
    // TODO: testar diminuindo o tempo
  }, 5000)
}

export { collectInformations }
