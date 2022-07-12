import { Db, Collection, ObjectId } from 'mongodb'

import { SettingsRepositoryContract } from '@src/services/contracts'
import { Settings } from '@src/domain'

class SettingsRepository implements SettingsRepositoryContract {
  private collectionName = 'settings'

  private collection: Collection<Settings>

  constructor(readonly database: Db) {
    this.collection = database.collection<Settings>(this.collectionName)
  }

  private loadSettings() {
    return this.collection.findOne()
  }

  private async startSettings(): Promise<Settings> {
    const { insertedId } = await this.collection.insertOne({
      runningExperiments: [],
    })

    return this.collection.findOne({ _id: insertedId })
  }

  public async addRunningExperiment(experimentId: string): Promise<void> {
    const settings = await this.loadSettings()
    this.collection.updateOne(
      { _id: new ObjectId(settings._id) },
      { $push: { runningExperiments: experimentId } }
    )
  }

  public async removeRunningExperiment(experimentId: string): Promise<void> {
    const { _id, runningExperiments } = await this.loadSettings()
    const index = runningExperiments.indexOf(experimentId)
    if (index < 0) return

    runningExperiments.splice(index, 1)

    this.collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { runningExperiments: [...runningExperiments] } }
    )
  }

  async getSettings(): Promise<Settings> {
    const settings = await this.collection.findOne()
    if (!settings) {
      return this.startSettings()
    }
    return settings
  }

  public async updateSettings(
    values: Omit<Partial<Settings>, 'id'>
  ): Promise<Settings> {
    const { _id } = await this.loadSettings()
    this.collection.updateOne({ _id: new ObjectId(_id) }, { $set: values })
    return this.loadSettings()
  }
}

export { SettingsRepository }
