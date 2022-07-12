export interface Experiment {
  id: string
  name: string
  description: string
  frequency: number
  imageName: string
  startAt: number
  endAt: number
  status: string
  containerStats: any[]
  stages: any[]
}
