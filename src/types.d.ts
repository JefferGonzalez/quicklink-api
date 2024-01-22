interface Errors {
  message: string
  path: Array<string | number>
}

export interface PayloadError {
  errors: Errors[]
  stack?: string
}
