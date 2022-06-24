import { MonitoryContainerParams } from '@src/domain/usecases'
import { monitoryContainerFactory } from '@src/main/factories'
import { bullAdapter } from '@src/main/adapters/bullAdapter'

export const monitoryContainer = async () =>
  bullAdapter<MonitoryContainerParams>(await monitoryContainerFactory())
