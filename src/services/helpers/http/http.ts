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

  static notFound(message: string): HttpResponse {
    return {
      statusCode: HttpStatusCode.NOT_FOUND,
      body: {
        message,
      },
    } as HttpResponse
  }

  static internalServerError(
    message: string = 'Internal Server Error'
  ): HttpResponse {
    return {
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: {
        message,
      },
    } as HttpResponse
  }
}
