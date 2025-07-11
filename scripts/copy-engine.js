import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const sourceDir = path.join(rootDir, 'src', 'db', 'prisma')
const targetDir = path.join(rootDir, 'dist', 'db', 'prisma')

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

const engineFiles = fs
  .readdirSync(sourceDir)
  .filter(
    (file) => file.includes('libquery_engine') || file.includes('query_engine-')
  )

if (engineFiles.length > 0) {
  engineFiles.forEach((file) => {
    const sourcePath = path.join(sourceDir, file)
    const targetPath = path.join(targetDir, file)

    try {
      fs.copyFileSync(sourcePath, targetPath)
      console.log(`✅ Successfully copied: ${file} to ${targetDir}`)
    } catch (error) {
      console.error(`❌ Error copying ${file}:`, error)
    }
  })
}
