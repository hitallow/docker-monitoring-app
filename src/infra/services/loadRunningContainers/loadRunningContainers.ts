import { LoadRunningContainersContract } from '@src/services/contracts'
import { exec } from 'child_process'
import { ContainerConfig } from '@src/domain'

class LoadRunningContainers implements LoadRunningContainersContract {
  execute = (): Promise<ContainerConfig[]> =>
    new Promise((resolve, reject) => {
      const positionConfig = [
        ['containerId', 0],
        ['name', 6],
        ['image', 1],
        ['created', 3],
        ['status', 4],
        ['ports', 5],
      ]
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
            positionConfig.reduce(
              (prev, [key, position]) => ({
                ...prev,
                [key]: infos[position],
              }),
              {} as ContainerConfig
            )
          )
        })
        return resolve(configs)
      })
    })
}

export { LoadRunningContainers }
