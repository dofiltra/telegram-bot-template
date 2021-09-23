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
    allowMissing: false
  })

  attachI18N(ctx: Context, next: () => void) {
    const anyI18N = ctx.i18n as any
    anyI18N.locale(ctx.dbuser.language)
    return next()
  }
}
