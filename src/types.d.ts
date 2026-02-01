interface Errors {
  message: string
  path?: (string | number | symbol)[]
}

export interface PayloadError {
  errors: Errors[]
  stack?: string
}

declare global {
  namespace Express {
    interface User {
      id: string
      createdAt: Date
      updatedAt: Date
      email: string
      emailVerified: boolean
      name: string
      image?: string | null
    }

    interface Session {
      id: string
      createdAt: Date
      updatedAt: Date
      userId: string
      expiresAt: Date
      token: string
      ipAddress?: string | null
      userAgent?: string | null
    }

    interface Request {
      user?: User | null
      session: Session | null
    }
  }
}
