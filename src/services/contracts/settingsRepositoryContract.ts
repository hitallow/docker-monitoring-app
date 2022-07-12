import { Settings } from '@src/domain'

export interface SettingsRepositoryContract {
  getSettings(): Promise<Settings>
  updateSettings(values: Omit<Partial<Settings>, 'id'>): Promise<Settings>
  addRunningExperiment(experimentId: string): Promise<void>
  removeRunningExperiment(experimentId: string): Promise<void>
}
