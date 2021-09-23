import { TG } from './services/tg'

export class App {
  static version = 1

  start(tokens?: string) {
    if (!tokens) {
      return console.error(`Required 'TOKENS' in '.env'`)
    }

    console.log(`App.starting... v${App.version}`)
    tokens.split(';').forEach(async (token) => await new TG({ token }).start())
  }
}

new App().start(process.env.TOKENS)
