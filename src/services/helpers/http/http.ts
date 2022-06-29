import { HttpStatusCode } from '@src/services/enums'

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}

export class HttpStatus {
  static ok<T = any>(body: T): HttpResponse<T> {
    return {
      statusCode: HttpStatusCode.OK,
      body,
    } as HttpResponse
  }

  static noContent(): HttpResponse {
    return {
      statusCode: HttpStatusCode.NO_CONTENT,
    } as HttpResponse
  }

  static badRequest(message: string): HttpResponse {
    return {
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: {
        message,
      },
    } as HttpResponse
  }
}
