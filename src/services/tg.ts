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

  async start() {}
}

export { TG }
