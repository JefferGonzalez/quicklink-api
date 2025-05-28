import app from '@/app.js'
import env from '@/env.js'

const port = app.get('port') as string

app.listen(port, () => {
  if (env.NODE_ENV === 'development') {
    console.clear()
    console.log(
      '🚀 \x1b[37m\x1b[1m%s\x1b[0m \x1b[34m%s\x1b[0m',
      'Server is running in:',
      `http://localhost:${port}`
    )
  }
})

export default app
