import { UsecaseContract } from '@src/domain/usecases/usecaseContract'
import { logger } from '@src/services/helpers/logger/logger'
import { ProcessCallbackFunction, DoneCallback } from 'bull'

export const bullAdapter = async <T>(usecase: UsecaseContract<T>) => {
  const fn: ProcessCallbackFunction<T> = async (job, done: DoneCallback) => {
    try {
      logger.info(`Executando caso de uso ${usecase.name}`)
      await usecase.execute(job.data)
      done()
    } catch (error) {
      logger.error('Erro ao executar caso de uso', error)
      done(Error(String(error)))
    }
  }
  return fn
}
