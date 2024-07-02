import { Inject, Injectable } from 'injection-js'
import { Counter } from './counter.service'
import { Message } from './message.service'

@Injectable()
export class Notification {
  state = 0

  get count() {
    return this.counter.count
  }

  constructor(@Inject(Counter) private counter: Counter, @Inject(Message) private message: Message) {}

  update() {
    this.state += 1
    this.counter.update()

    if (this.state % 2 === 0) this.message.success('DI Service state ==> ' + this.state)
  }
}
