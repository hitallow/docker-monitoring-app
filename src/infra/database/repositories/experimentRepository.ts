import { Db, Collection, ObjectId, WithId } from 'mongodb'

import {
  ExperimentRepositoryContract,
  GetParams,
} from '@src/services/contracts'
import { Experiment, ContainerStats } from '@src/domain'
import { ExperimentNotFoundError } from '@src/services/errors/experimentNotFoundError'

class ExperimentRepository implements ExperimentRepositoryContract {
  private collectionName = 'experiment'

  private collection: Collection<Experiment>

  constructor(readonly database: Db) {
    this.collection = database.collection<Experiment>(this.collectionName)
  }

  protected mapDbToModel(experiment: WithId<Experiment>): Experiment {
    const parsed = {
      id: experiment._id.toString(),
      ...experiment,
    }
    delete parsed._id
    return parsed as Experiment
  }

  public async getExperiments(params: GetParams): Promise<Experiment[]> {
    const {
      limit,
      offset,
      excludeFields: removeFields,
      includeFields,
      where,
    } = params
    let projection
    if (removeFields)
      projection = removeFields.reduce(
        (acc, curKey) => ({
          ...acc,
          [curKey]: 0,
        }),
        {}
      )
    if (includeFields)
      projection = includeFields.reduce(
        (acc, curKey) => ({
          ...acc,
          [curKey]: 0,
        }),
        projection || {}
      )

    const query = this.collection.find(
      { ...where },
      {
        limit,
        skip: offset,
        projection,
      }
    )

    return (await query.toArray()).map(this.mapDbToModel)
  }

  async addStats(experimentId: string, stats: ContainerStats): Promise<void> {
    this.collection.updateOne(
      { _id: new ObjectId(experimentId) },
      { $push: { containerStats: stats } }
    )
  }

  public async getExperiment(id: string): Promise<Experiment> {
    const experimentDb = await this.collection.findOne({
      _id: new ObjectId(id),
    })
    if (!experimentDb) {
      throw new ExperimentNotFoundError(id)
    }

    return {
      ...experimentDb,
      id: experimentDb._id.toString(),
      _id: undefined,
    } as Experiment
  }

  async createExperiment(experiment: Experiment): Promise<Experiment> {
    const ret = await this.collection.insertOne(experiment)
    return { ...experiment, id: ret.insertedId.toString() }
  }

  async updateExperiment(
    experimentId: string,
    values: Omit<Partial<Experiment>, 'id' | 'containerStats'>
  ): Promise<void> {
    this.collection.updateOne(
      { _id: new ObjectId(experimentId) },
      { $set: values }
    )
  }
}

export { ExperimentRepository }
