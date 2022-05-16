import { AnalyticalModelContract } from '@src/services/contracts'
import { logger } from '@src/services/helpers/logger/logger'

export class AnalyticalModel implements AnalyticalModelContract {
  public async execute(series: any): Promise<boolean> {
    logger.info('Analisando...', series.length)
    return false
  }
}
