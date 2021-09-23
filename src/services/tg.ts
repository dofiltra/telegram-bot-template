import { sendHelp } from '../handlers/sendHelp'
import I18NHelper from '../helpers/i18n'
import { attachUser } from '../middlewares/attachUser'
import { ignoreOldMessageUpdates } from '../middlewares/ignoreOldMessageUpdates'
import { Telegraf } from 'telegraf'
import Languages from '../handlers/language'

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
    const i18NHelper = new I18NHelper()

    // // Middlewares
    bot.use(ignoreOldMessageUpdates)
    bot.use(attachUser)
    bot.use(i18NHelper.i18n.middleware(), i18NHelper.attachI18N)

    // Commands
    bot.command(['help', 'start'], sendHelp)
    bot.command('language', Languages.sendLanguage)

    // Actions
    bot.action(Languages.getLocaleActions(), Languages.setLanguage)

    // Errors
    bot.catch(console.error)

    // Start bot
    await bot.launch()
    console.info(`Bot '${bot.botInfo!.username}' is up and running`)
  }
}

export { TG }
