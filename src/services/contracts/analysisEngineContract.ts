export interface AnalysisEngineContract {
  execute: (containerName: string) => Promise<void>
}
