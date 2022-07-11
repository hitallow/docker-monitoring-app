/* eslint-disable radix */
import { Router } from 'express'
import { CreateExperimentParams } from '@src/domain/usecases'
import { bodyClassValidator } from './middlewares'
import {
  createExperimentFactory,
  loadExperimentFactory,
  loadExperimentStatsFactory,
} from '../factories'
import { expressAdapter } from '../adapters'

const router = Router()
/**
 * Rota para criar um experimento
 */
router.post(
  '/experiment',
  bodyClassValidator(CreateExperimentParams),
  expressAdapter(createExperimentFactory)
)

router.get(
  '/experiment',
  expressAdapter(loadExperimentFactory, async req => {
    const requestBody = { status: req.query.status as string }

    const paginationParams = ['limit', 'offset']

    paginationParams.reduce(
      (acc, param) => ({
        ...acc,
        [param]: req.query[param]
          ? parseInt(req.query[param] as string)
          : undefined,
      }),
      requestBody
    )
    return requestBody
  })
)

router.get(
  '/experiment/:experimentId',
  expressAdapter(loadExperimentFactory, async req => ({
    experimentId: req.params.experimentId,
  }))
)

router.get(
  '/experiment/:experimentId/stats',
  expressAdapter(loadExperimentStatsFactory, async req => ({
    experimentId: req.params.experimentId,
  }))
)

export { router }
