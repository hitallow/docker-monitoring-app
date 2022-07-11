import { Router } from 'express'

const router = Router()

router.get('/', (req, res) =>
  res.status(200).send({
    message: 'Aplicação está executando com sucesso',
  })
)

export { router }
