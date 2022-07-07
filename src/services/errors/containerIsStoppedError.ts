export class ContainerIsStoppedError extends Error {
  constructor() {
    super('Container is stopped')
  }
}
