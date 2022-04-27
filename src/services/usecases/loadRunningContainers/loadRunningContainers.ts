import { exec } from 'child_process'
import { ContainerConfig } from '../../../domain'

function loadRunningContainers(): Promise<ContainerConfig[]> {
  return new Promise((resolve, reject) => {
    const positionConfig = {
      containerId: 0,
      name: 6,
      image: 1,
      created: 3,
      status: 4,
      ports: 5,
    }
    exec('docker ps', (_, stdout, stderror) => {
      if (stderror) return reject(Error(stderror))
      if (!stdout) return reject(Error('Unable to load running containers'))

      const configs: ContainerConfig[] = []
      const lines = stdout.split('\n')

      lines.shift()
      lines.pop()

      lines.forEach(line => {
        const infos = line.split('  ')
        configs.push(
          Object.keys(positionConfig).reduce(
            (prev, key) => ({
              ...prev,
              [key]: infos[positionConfig[key]],
            }),
            {} as ContainerConfig
          )
        )
      })
      return resolve(configs)
    })
  })
}

class LoadRunningContainersUsecase {
  public execute = async () => {
    const containers = await loadRunningContainers()
    return containers
  }
}

export { LoadRunningContainersUsecase }
