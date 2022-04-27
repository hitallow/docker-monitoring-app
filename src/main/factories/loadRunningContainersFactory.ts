import { LoadRunningContainersUsecase } from '../../services/usecases/loadRunningContainers'

const loadRunningContainersFactory = () => new LoadRunningContainersUsecase()

export { loadRunningContainersFactory }
