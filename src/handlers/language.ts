import path from 'path'
import yaml from 'js-yaml'
import App from '../app'
import { Context, Markup as m } from 'telegraf'
import { readdirSync, readFileSync } from 'fs'
import { InlineKeyboardButton, Message } from 'typegram'
import { CallbackQuery } from 'telegraf/typings/core/types/typegram'

export default class Languages {
  private static localeActions: string[] = []

  static getLocaleActions() {
    if (!Languages.localeActions.length) {
      Languages.localeActions = Languages.localesFiles().map((file) => file.split('.')[0])
    }

    return Languages.localeActions
  }

  static sendLanguage(ctx: Context) {
    return ctx.reply(ctx.i18n.t('language'), Languages.languageKeyboard())
  }

  static async setLanguage(ctx: Context) {
    let { callbackQuery = {} as CallbackQuery, dbuser: user } = ctx
    const message = callbackQuery.message

    if (!('data' in callbackQuery) || !message) {
      return
    }

    user.language = callbackQuery.data
    user = await user.save()
    ctx.i18n.locale(callbackQuery.data)

    await ctx.telegram.editMessageText(
      message.chat.id,
      message.message_id,
      undefined,
      ctx.i18n.t('language_selected'),
      { parse_mode: 'HTML' }
    )
  }

  static languageKeyboard() {
    const locales = Languages.localesFiles()
    const result: (InlineKeyboardButton & { hide?: boolean | undefined })[][] = []

    locales.forEach((locale, index) => {
      const localeCode = locale.split('.')[0]
      const localeData = yaml.load(readFileSync(path.join(`${App.rootPath}/locales/${locale}`), 'utf8'))
      const localeName = localeData.name

      if (index % 2 == 0) {
        if (index === 0) {
          return result.push([m.button.callback(localeName, localeCode)])
        }

        return result[result.length - 1].push(m.button.callback(localeName, localeCode))
      }

      result[result.length - 1].push(m.button.callback(localeName, localeCode))
      if (index < locales.length - 1) {
        result.push([])
      }
    })

    return m.inlineKeyboard(result)
  }

  static localesFiles() {
    return readdirSync(path.join(App.rootPath, `locales`))
  }
}
