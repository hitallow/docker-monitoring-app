import { collectContainersStatsFactory } from '../factories'

const collectInformations = () => {
  const collectContainersStatsUsecase = collectContainersStatsFactory()

  setInterval(() => {
    console.log('Coletando dados...')
    collectContainersStatsUsecase.execute()
  }, 5000)
}

export { collectInformations }
