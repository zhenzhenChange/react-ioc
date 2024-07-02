import { Notification } from './notification.service'

class Counter {
  count = 0

  update() {
    this.count += 100
  }
}

class Message {
  success(message: string) {
    console.log('SPEC: ', message)
  }
}

const instance = new Notification(new Counter(), new Message())

console.log('SPEC S: ', instance.count, instance.state)
instance.update()
instance.update()
console.log('SPEC E: ', instance.count, instance.state)
