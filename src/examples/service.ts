import { Injectable } from 'injection-js'

@Injectable()
export class TimerService {
  #refCb: (remaining: number) => void
  #refCount = 0
  #refTimer = NaN

  constructor() {}

  #run() {
    if (this.#refCount === 0) return this.#dispose()

    this.#refTimer = setTimeout(() => {
      this.#refCb((this.#refCount -= 1))
      this.#run()
    }, 300)
  }

  #dispose() {
    clearTimeout(this.#refTimer)
  }

  start(count: number) {
    this.#refCount = count
    this.#run()
  }

  close() {
    this.#refCount = 0
    this.#dispose()
  }

  pause() {
    this.#dispose()
  }

  resume() {
    this.#dispose()
    this.#run()
  }

  onChange(cb: (remaining: number) => void) {
    this.#refCb = cb
  }
}
