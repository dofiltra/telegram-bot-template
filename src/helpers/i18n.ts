import TelegrafI18n from 'telegraf-i18n'
import { Context } from 'telegraf'
import App from '../app'
import path from 'path/posix'

export default class I18NHelper {
  public i18n = new TelegrafI18n({
    directory: path.join(App.rootPath, `locales`),
    defaultLanguage: 'en',
    sessionName: 'session',
    useSession: false,
    allowMissing: true,
    defaultLanguageOnMissing: true
  })

  attachI18N(ctx: Context, next: () => void) {
    ctx.i18n.locale(ctx.dbuser.language)
    return next()
  }
}
