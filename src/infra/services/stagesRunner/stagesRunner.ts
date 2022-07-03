/* eslint-disable no-await-in-loop */
import axios from 'axios'

import { StepsRunnerContract } from '@src/services/contracts'
import { logger } from '@src/services/helpers/logger'
import {
  generateRandomData,
  startInterval,
} from '@src/services/helpers/functions'
import {
  CpuAnomalyConfig,
  MemoryAnomalyConfig,
  NetworkAnomalyConfig,
  NormalStageConfig,
  StageSetting,
  StagesTypes,
} from '@src/domain/usecases/createExperiment'

export class StagesRunner implements StepsRunnerContract {
  private baseURL = 'http://anomaly_app:80'

  private async runNormalStage(params: NormalStageConfig) {
    return new Promise<void>(resolve => {
      let target = 0

      const { duration, frequency, rate, requestType, value = 1444 } = params

      const interval = startInterval(frequency, async () => {
        target = 0
        while (target <= rate) {
          try {
            await axios.get(`${this.baseURL}/${requestType}/${value}`)
          } catch {
            //
          }
          target += 1
        }
      })

      setTimeout(() => {
        clearInterval(interval)
        resolve()
      }, 1000 * duration)
    })
  }

  private async runCpuStage(params: CpuAnomalyConfig) {
    const { duration } = params
    try {
      await axios.post(`${this.baseURL}/cpu-usage`, { duration })
    } catch (error) {
      //
    }
  }

  private async runMemoryUsage(params: MemoryAnomalyConfig) {
    try {
      await axios.post(`${this.baseURL}/memory-usage`, { ...params })
    } catch (error) {
      //
    }
  }

  private async runRetworkAnomaly(params: NetworkAnomalyConfig) {
    return new Promise<void>(resolve => {
      let target = 0

      const { duration, frequency, rate, kbPerRate, mode } = params

      const data = generateRandomData(kbPerRate)

      const interval = startInterval(frequency, async () => {
        target = 0
        while (target <= rate) {
          try {
            if (mode === 'input') {
              await axios.post(`${this.baseURL}/receive-data`, data)
            } else {
              await axios.get(`${this.baseURL}/lore-ipsum/${kbPerRate}`)
            }
          } catch {
            //
          }
          target += 1
        }
      })

      setTimeout(() => {
        clearInterval(interval)
        resolve()
      }, 1000 * duration)
    })
  }

  async execute(contianerName: string, step: StageSetting): Promise<void> {
    try {
      this.baseURL = `http://${contianerName}:80`
      const { type, setting } = step
      if (type === StagesTypes.NORMAL) {
        logger.info('EXECUTANDO CASO NORMAL')
        await this.runNormalStage(setting as NormalStageConfig)
      } else if (type === StagesTypes.CPU_ANOMALY) {
        logger.info('EXECUTANDO CASO DE CPU')
        await this.runCpuStage(setting as CpuAnomalyConfig)
      } else if (type === StagesTypes.MEMORY_ANOMALY) {
        logger.info('EXECUTANDO CASO DE MEMORIA')
        await this.runMemoryUsage(setting as MemoryAnomalyConfig)
      } else if (type === StagesTypes.NETWORK_ANOMALY) {
        logger.info('EXECUTANDO CASO DE NETWORK')
        await this.runRetworkAnomaly(setting as NetworkAnomalyConfig)
      } else {
        throw new Error(`Config not found ${type}`)
      }
    } catch (error) {
      logger.error(error)
    }
  }
}
