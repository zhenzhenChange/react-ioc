import { Injectable } from "injection-js"

@Injectable()
export class Counter {
  count = 0
  update() {
    this.count += 1
  }
}
