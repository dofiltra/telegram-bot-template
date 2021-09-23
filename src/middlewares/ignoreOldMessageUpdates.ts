import { Context } from 'telegraf'

export async function ignoreOldMessageUpdates(ctx: Context, next: () => any) {
  const { chat, from, updateType, message } = ctx
  const time = new Date().getTime() / 1000
  const isOldTime = message && time - message.date < 5 * 60

  if (updateType !== 'message' || isOldTime) {
    return next()
  }

  from && chat && message && console.log(`Ignoring message from ${from.id} at ${chat.id} (${time}:${message.date})`)
}
