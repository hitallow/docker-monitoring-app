import { ProcessCallbackFunction } from 'bull'

import { MonitoryContainerParams } from '@src/domain/usecases'
import { monitoryContainerFactory } from '@src/main/factories'
import { bullAdapter } from '@src/main/adapters/bullAdapter'

export const monitoryContainer: ProcessCallbackFunction<
  MonitoryContainerParams
> = async () =>
  bullAdapter<MonitoryContainerParams>(await monitoryContainerFactory())
