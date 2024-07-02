import { App } from 'antd'
import { type MessageInstance as MI } from 'antd/es/message/interface'
import { Injectable } from 'injection-js'

let MessageInstance: MI

export const useMessage = () => {
  const instance = App.useApp().message
  MessageInstance = instance
  return instance
}

@Injectable()
export class Message {
  success(message: string) {
    MessageInstance.success(message)
  }
}
