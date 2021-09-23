import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { TG } from './services/tg'
import { MongooseHelper } from './models'

export default class App {
  static version = 1
  static rootPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
  static env = process.env

  constructor() {
    dotenv.config({ path: `${App.rootPath}/.env` })
    MongooseHelper.init()
  }

  async start(tokens?: string) {
    if (!tokens) {
      return console.error(`Required 'TOKENS' in '.env'`)
    }

    console.log(`App.starting... v${App.version}`)
    tokens.split(';').forEach(async (token) => await new TG({ token }).start())
  }
}

new App().start(App.env.TOKENS)
