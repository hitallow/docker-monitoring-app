import { Router } from 'express'
import { CreateExperimentParams } from '@src/domain/usecases'
import { bodyClassValidator } from './middlewares'
import { createExperimentFactory } from '../factories'
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

export { router }
