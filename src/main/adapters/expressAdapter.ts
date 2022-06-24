import { RequestHandler } from 'express'

import { UsecaseContract } from '@src/domain/usecases/usecaseContract'
import { HttpError } from '@src/services/errors/httpError'
import { HttpStatusCode } from '@src/services/enums'
import { logger } from '@src/services/helpers/logger'

export function expressAdapter<T = any>(
  factory: () => Promise<UsecaseContract<T>>
): RequestHandler {
  const fn: RequestHandler = async (req, res) => {
    try {
      const usecase = await factory()
      logger.info(`Request: ${req.method} ${req.url}`)
      const result = await usecase.execute(req.body)
      logger.info(`Response: ${result.statusCode}`)
      return res.status(result.statusCode).json(result.body)
    } catch (error) {
      if (error instanceof HttpError) {
        logger.error(`Response: ${error.statusCode}`)
        return res.status(error.statusCode).json({
          error: error.message,
        })
      }
      logger.error(`Unkown error ${error}`)
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
      })
    }
  }
  return fn
}
