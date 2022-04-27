import { appendFile } from 'fs'
import {
  loadContainerStatsFactory,
  loadRunningContainersFactory,
} from '../factories'

const PATH_LOG = './logs/log.txt'

const collectInformations = () => {
  const loadContainerStatsInstance = loadContainerStatsFactory()
  const loadRunningContainersInstance = loadRunningContainersFactory()
  setInterval(() => {
    console.log('Coletando dados...')
    loadRunningContainersInstance.execute().then(containers => {
      containers.forEach(async container => {
        const containerStats = await loadContainerStatsInstance.execute(
          container.name
        )
        appendFile(PATH_LOG, `${JSON.stringify(containerStats)}\n`, err => {
          console.log('Escrito com sucesso!')
          if (err) {
            console.error(err)
          }
        })
      })
    })
  }, 1000)
}

export { collectInformations }
