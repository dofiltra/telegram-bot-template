import { findUser } from '../models'
import { Context } from 'telegraf'

export async function attachUser(ctx: Context, next: () => void) {
  const { from } = ctx

  ctx.dbuser = await findUser(from!.id)
  return next()
}
