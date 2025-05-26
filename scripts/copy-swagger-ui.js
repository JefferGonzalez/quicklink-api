import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

const sourceDir = path.join(rootDir, 'node_modules', 'swagger-ui-dist')
const targetDir = path.join(rootDir, 'public', 'swagger-ui')

const filesToCopy = [
  'swagger-ui.css',
  'swagger-ui-bundle.js',
  'swagger-ui-standalone-preset.js'
]

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true })
}

filesToCopy.forEach((file) => {
  const sourcePath = path.join(sourceDir, file)
  const targetPath = path.join(targetDir, file)

  try {
    fs.copyFileSync(sourcePath, targetPath)
    console.log(`✅ Successfully copied: ${file} to ${targetDir}`)
  } catch (error) {
    console.error(`❌ Error copying ${file}:`, error)
  }
})
