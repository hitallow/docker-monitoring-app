export interface AnalyticalModelContract {
  execute: (series: any) => Promise<boolean>
}
