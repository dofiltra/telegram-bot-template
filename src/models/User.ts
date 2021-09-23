import pkg from '@typegoose/typegoose'
const { prop, getModelForClass } = pkg

export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number

  @prop({ required: true, default: 'en' })
  language!: string
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true }
})

// Get or create user
export async function findUser(id: number) {
  let user = await UserModel.findOne({ id })!
  if (!user) {
    // Try/catch is used to avoid race conditions
    try {
      user = await new UserModel({ id }).save()
    } catch (err) {
      user = await UserModel.findOne({ id })
    }
  }
  return user as any
}
