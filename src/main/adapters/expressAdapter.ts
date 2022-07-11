import { RequestHandler, Request } from 'express'

import { UsecaseContract } from '@src/domain/usecases/usecaseContract'
import { HttpError } from '@src/services/errors/httpError'
import { HttpStatusCode } from '@src/services/enums'
import { logger } from '@src/services/helpers/logger'

export function expressAdapter<T = any>(
  factory: () => Promise<UsecaseContract<T>>,
  extractBody?: (req: Request) => Promise<T>
): RequestHandler {
  const fn: RequestHandler = async (req, res) => {
    try {
      const usecase = await factory()
      logger.info(`Request: ${req.method} ${req.url}`)
      let requestBody
      if (extractBody) requestBody = await extractBody(req)
      else requestBody = req.body

      const { statusCode, body } = await usecase.execute(requestBody)
      logger.info(`Response: ${statusCode}`)
      return res.status(statusCode).json(body)
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
