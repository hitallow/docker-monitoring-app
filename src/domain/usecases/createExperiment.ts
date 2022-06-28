import {
  IsString,
  MaxLength,
  IsEnum,
  IsInt,
  IsIn,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator'
import { UsecaseContract } from './usecaseContract'

export enum StagesTypes {
  NORMAL = 'NORMAL',
  CPU_ANOMALY = 'CPU_ANOMALY',
  MEMORY_ANOMALY = 'MEMORY_ANOMALY',
  NETWORK_ANOMALY = 'NETWORK_ANOMALY',
}

export class NormalStageConfig {
  @IsInt({
    message: 'Frequency time must be an integer',
  })
  frequency: number

  @IsInt({
    message: 'Request rate must be an integer',
  })
  rate: number

  @IsIn(['fibonacci', 'factorial', 'lorem-ipsum'])
  requestType: 'fibonacci' | 'factorial' | 'lorem-ipsum'

  @IsInt({
    message: 'Calculate value must be an integer',
  })
  value?: number = 100

  @IsInt({
    message: 'Calculate value must be an integer',
  })
  duration: number
}

export class CpuAnomalyConfig {
  @IsInt({
    message: 'duration must be an integer',
  })
  duration: number
}

export class MemoryAnomalyConfig {
  @IsIn(['fast', 'slow', 'instant'])
  increaseMode: 'fast' | 'slow' | 'instant'

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

export class NetworkAnomalyConfig {
  @IsIn(['input', 'output'])
  mode: 'input' | 'output'

  @IsInt({
    message: 'KB rate of each request must be an integer',
  })
  kbPerRate: number

  @IsInt({
    message: 'Request rate must be an integer',
  })
  rate: number

  @IsInt({
    message: 'Duration between must be an integer',
  })
  duration: number

  @IsInt({
    message: 'Frequency time must be an integer',
  })
  frequency: number
}

export class StageSetting {
  @IsString({ message: 'Name must be a string' })
  @IsEnum(StagesTypes)
  type: StagesTypes

  setting:
    | CpuAnomalyConfig
    | MemoryAnomalyConfig
    | NormalStageConfig
    | NetworkAnomalyConfig
}

class CreateExperimentParams {
  @IsString({ message: 'Name must be a string' })
  @MaxLength(30, { message: 'Name must be less than 30 characters' })
  name: string

  @IsString({ message: 'Description must be a string' })
  @MaxLength(255, { message: 'Description must be less than 255 characters' })
  description: string

  @ArrayMinSize(1, {
    message: 'Stages must contain at least 1 elements',
  })
  @IsArray({ message: 'Stages must be a array' })
  @ValidateNested({ each: true })
  stages: StageSetting[]
}

interface CreateExperimentUsecaseContract
  extends UsecaseContract<CreateExperimentParams> {}

export { CreateExperimentParams, CreateExperimentUsecaseContract }
