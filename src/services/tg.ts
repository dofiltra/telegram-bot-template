import { Telegraf } from 'telegraf'

type TBotSettings = {
  token: string
}

class TG {
  private settings: TBotSettings
  private bot

  constructor(s: TBotSettings) {
    this.settings = { ...s }
    this.bot = new Telegraf(s.token)
  }

  async start() {
    const bot = this.bot

    // // Middlewares
    // bot.use(ignoreOldMessageUpdates)
    // bot.use(attachUser)
    // bot.use(i18n.middleware(), attachI18N)

    // // Commands
    // bot.command(['help', 'start'], sendHelp)
    // bot.command('language', sendLanguage)

    // // Actions
    // bot.action(localeActions, setLanguage)

    // // Errors
    // bot.catch(console.error)

    // // Start bot
    // bot.launch().then(() => {
    //   console.info(`Bot '${bot.botInfo.username}' is up and running`)
    // })
  }
}

export { TG }
