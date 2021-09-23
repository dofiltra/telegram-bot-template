import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { TG } from './services/tg'

export class App {
  static version = 1
  static rootPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

  constructor() {
    dotenv.config({ path: `${App.rootPath}/.env` })
  }

  async start(tokens?: string) {
    if (!tokens) {
      return console.error(`Required 'TOKENS' in '.env'`)
    }

    console.log(`App.starting... v${App.version}`)
    tokens.split(';').forEach(async (token) => await new TG({ token }).start())
  }
}

new App().start(process.env.TOKENS)
