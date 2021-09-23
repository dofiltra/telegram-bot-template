import mongoose from 'mongoose'
import App from '../app'

export class MongooseHelper {
  static init() {
    mongoose.connect(App.env.MONGO!, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    mongoose.set('autoIndex', true)
  }
}

export * from './User'
