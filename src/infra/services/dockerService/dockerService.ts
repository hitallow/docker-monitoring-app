import { ContainerStats } from '@src/domain'
import { DockerServiceContract } from '@src/services/contracts'
import { logger } from '@src/services/helpers/logger'
import Docker from 'dockerode'

export class DockerService implements DockerServiceContract {
  protected client: Docker

  public constructor() {
    this.client = new Docker({
      socketPath: '/var/run/docker.sock',
    })
  }

  protected mountPortsBindings(portBindings: { [p: string]: string[] } = {}) {
    const containerPorts = Object.keys(portBindings)
    const exposedPorts = containerPorts.reduce(
      (acc, port) => ({
        ...acc,
        [port]: {},
      }),
      {}
    )

    const portBindingsMapped = containerPorts.reduce((acc, port) => {
      const newConfig = portBindings[port].reduce(
        (accConfigs, currentConfig) => [
          ...accConfigs,
          { HostPort: currentConfig },
        ],
        []
      )
      return { ...acc, [`${port}/tcp`]: newConfig }
    }, {})

    return { exposedPorts, portBindingsMapped }
  }

  async startContainer(
    imageId: string,
    containerName: string,
    networks: string[] = []
  ): Promise<string> {
    try {
      const networksConfig = networks.reduce(
        (acc, current) => ({ ...acc, [current]: {} }),
        {}
      )

      const container = await this.client.createContainer({
        Image: imageId,
        name: containerName,
        NetworkDisabled: false,
        NetworkingConfig: { EndpointsConfig: networksConfig },
      })

      await container.start()
      return container.id
    } catch (error) {
      logger.error('Erro desconhecido', error)
      throw Error(`${error}`)
    }
  }

  public async stopContainer(containerId: string): Promise<void> {
    try {
      const container = this.client.getContainer(containerId)
      await container.stop()
      await container.remove()
    } catch (err) {
      logger.error('Erro desconhecido', err)
      throw new Error()
    }
  }

  public async getContainerStats(containerId: string): Promise<ContainerStats> {
    try {
      const data: any = await this.client
        .getContainer(containerId)
        .stats({ stream: false })
      return { ...data }
    } catch (error) {
      logger.error('Erro desconhecido', error)
      throw new Error()
    }
  }
}
