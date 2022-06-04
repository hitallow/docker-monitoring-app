import { Db, Collection } from 'mongodb'

import { ExperimentRepositoryContract } from '@src/services/contracts'
import { Experiment, ContainerStats } from '@src/domain'
import { logger } from '@src/services/helpers/logger/logger'
import { ExperimentNotFoundError } from '@src/services/errors/experimentNotFoundError'

class ExperimentRepository implements ExperimentRepositoryContract {
  private collectionName = 'experiment'

  private collection: Collection<Experiment>

  constructor(readonly database: Db) {
    this.collection = database.collection<Experiment>(this.collectionName)
  }

  async addStats(experimentId: string, stats: ContainerStats): Promise<void> {
    logger.info('Adding stats to experiment', { experimentId, stats })
  }

  public async getExperiment(id: string): Promise<Experiment> {
    const experiment = await this.collection.findOne({ id })
    if (!experiment) {
      throw new ExperimentNotFoundError(id)
    }
    return { ...experiment, id: experiment._id.toString() } as Experiment
  }

  async createExperiment(experiment: Experiment): Promise<Experiment> {
    const ret = await this.collection.insertOne(experiment)
    return { ...experiment, id: ret.insertedId.toString() }
  }
}

export { ExperimentRepository }
