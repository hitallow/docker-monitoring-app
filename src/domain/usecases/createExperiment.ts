import { ClassConstructor, plainToClass } from 'class-transformer'
import {
  IsString,
  MaxLength,
  IsNumber,
  IsEnum,
  IsInt,
  IsIn,
  validate,
} from 'class-validator'
import { UsecaseContract } from './usecaseContract'

enum StagesTypes {
  NORMAL = 'NORMAL',
  CPU_ANOMALY = 'CPU_ANOMALY',
  MEMORY_ANOMALY = 'MEMORY_ANOMALY',
  NETWORK_ANOMALY = 'NETWORK_ANOMALY',
}

export class NormalStageConfig {
  @IsInt({
    message: 'Frequency time must be an integer',
  })
  frequencyTime: number

  @IsInt({
    message: 'Request rate must be an integer',
  })
  requestRate: number

  @IsIn(['fibonacci', 'factorial', 'lorem-ipsum'])
  requestType: string

  @IsInt({
    message: 'Calculate value must be an integer',
  })
  value?: number
}

export class CpuAnomalyConfig {
  @IsInt({
    message: 'duration must be an integer',
  })
  duration: number
}

export class MemoryAnomalyConfig {
  @IsIn(['fast', 'slow', 'instant'])
  increaseMode: string

  @IsInt()
  durationOfAlocation: number

  @IsInt({
    message: 'targetAlocation must be an integer',
  })
  targetAlocation: number

  @IsInt({
    message: 'increate rate must be an integer',
  })
  increaseRate: number
}

export class NetworkAnomalyConfig {}

class StageConfig {
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Duration must be a number' }
  )
  duration: number

  @IsEnum(StagesTypes, {
    message: 'Stage type must be one of the following enum StagesTypes',
  })
  type: StagesTypes

  setting: any

  public async validStageConfig(): Promise<boolean> {
    try {
      let classConfig: ClassConstructor<any>

      if (this.type === StagesTypes.CPU_ANOMALY) {
        classConfig = CpuAnomalyConfig
      } else if (this.type === StagesTypes.MEMORY_ANOMALY) {
        classConfig = MemoryAnomalyConfig
      } else if (this.type === StagesTypes.NORMAL) {
        classConfig = NormalStageConfig
      } else if (this.type === StagesTypes.NETWORK_ANOMALY) {
        classConfig = NetworkAnomalyConfig
      } else {
        return false
      }
      await validate(plainToClass(classConfig, this.setting))

      return true
    } catch (error) {
      return false
    }
  }
}

class CreateExperimentParams {
  @IsString({ message: 'Name must be a string' })
  @MaxLength(30, { message: 'Name must be less than 30 characters' })
  name: string

  @IsString({ message: 'Description must be a string' })
  @MaxLength(255, { message: 'Description must be less than 255 characters' })
  description: string

  stages: StageConfig[]
}

interface CreateExperimentUsecaseContract
  extends UsecaseContract<CreateExperimentParams> {}

export { CreateExperimentParams, CreateExperimentUsecaseContract }
