import { exec } from 'child_process'

const loadContainerStats = (containerName: string): Promise<any> =>
  new Promise((resolve, reject) => {
    exec(
      `docker stats ${containerName} --no-stream --format "{{ json . }}"`,
      (_, stdout, stderror) => {
        if (stderror) return reject(Error(stderror))
        if (!stdout) return reject(Error('Unable to load container stats'))

        const stats = JSON.parse(stdout)

        return resolve(stats)
      }
    )
  })

class LoadContainerStats {
  public execute = async (containerName: string): Promise<any> =>
    loadContainerStats(containerName)
}

export { LoadContainerStats }
