import { StageSetting } from './createExperiment'
import { UsecaseContract } from './usecaseContract'

interface ExecuteStageParams {
  /**
   * Reference of the experiment to be executed;
   * if there are no more stages, is used to stop monitoring
   */
  experimentId: string
  /**
   * List of stages to be executed. after each stage is executed
   * the current stage will be removed from the list.
   */
  stages: Array<StageSetting>
  /**
   * Container reference to execute stages
   */
  containerId: string
  /**
   * Containger name to make request to host
   */
  containerName: string
}

interface ExecuteStageUsecaseContract
  extends UsecaseContract<ExecuteStageParams, null> {}

export { ExecuteStageParams, ExecuteStageUsecaseContract }
