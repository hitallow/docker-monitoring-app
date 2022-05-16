class Logger {
  private print(type: string, ...message: any[]): void {
    let localType = type
    if (type === 'INFO') {
      localType = 'log'
    }
    console[localType](`[${type.toUpperCase()}]`, ...message)
  }

  public info(...params: any[]): void {
    this.print('INFO', ...params)
  }

  public error(...params: any[]): void {
    console.error('ERROR', params)
  }

  public warn(...params: any[]): void {
    console.warn('WARN', params)
  }
}

const logger = new Logger()

export { logger }
