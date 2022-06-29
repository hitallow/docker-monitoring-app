import { NextFunction, RequestHandler, Response } from 'express'
import { validateOrReject, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { HttpStatusCode } from '@src/services/enums'

type ClassDefinition<T> = { new (...args: any[]): T }

/**
 * Do body validation for a given class
 * @param model - The model to validate
 * @returns if body is valid, call next stack of request handler if not valid, return error with 422 status code
 */
export function bodyClassValidator<T>(
  model: ClassDefinition<T>
): RequestHandler {
  return async (req, res, next): Promise<NextFunction | Response> => {
    try {
      const obj = plainToClass(model, req.body)
      await validateOrReject(obj as any)
      req.body = obj
      next()
      return null
    } catch (error) {
      const err = error as ValidationError[]

      const descriptions = err.reduce((acc, e) => {
        const messageErrors = Object.keys(e.constraints).map(
          key => e.constraints[key]
        )
        return { ...acc, [e.property]: messageErrors }
      }, {})

      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
        status: 'validation of body failed',
        descriptions,
      })
    }
  }
}
