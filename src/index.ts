import app from '@/app'

const init = (): void => {
  const port = app.get('port')

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
  })
}

init()
