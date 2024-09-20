import { useInject } from '../core'
import { Notification } from './notification.service'
import { useEffect, useState } from 'react'

import './notification.service.spec'
import { Counter } from './counter.service'
import { TimerService } from './service'

function DIKidA() {
  const service = useInject(Notification)

  return (
    <span>
      DIKidA + {service.state} + dep {service.count}
    </span>
  )
}

function DIKidB() {
  const service = useInject(Notification)

  return (
    <span>
      DIKidB + {service.state} + dep {service.count}
    </span>
  )
}

function DIKidC() {
  const service = useInject(Counter)

  return <span>DIKidC + {service.count}</span>
}

function DIKidSub() {
  const service = useInject(Notification)

  return (
    // NOTE: 不会触发 react 的更新调度
    <button onClick={() => service.update()}>
      DiKidSub + {service.state} + dep {service.count}
    </button>
  )
}

export function ComponentA() {
  const service = useInject(Notification)
  const [, update] = useState(Symbol())

  console.log(service)

  return (
    <div>
      <span>
        DI + {service.state} + dep {service.count}
      </span>
      <br />
      <button
        onClick={() => {
          service.update()
          update(Symbol())
        }}
      >
        DI
      </button>
      <hr />
      <DIKidA />
      <br />
      <DIKidB />
      <br />
      <DIKidSub />
      <br />
      <DIKidC />
    </div>
  )
}

export function Component() {
  const TS = useInject(TimerService)
  const [count, setCount] = useState(60)

  useEffect(() => {
    TS.onChange(setCount)
  }, [])

  return (
    <h1>
      <button onClick={() => TS.start(count)}>start</button>
      <button onClick={() => TS.close()}>close</button>
      <button onClick={() => TS.pause()}>pause</button>
      <button onClick={() => TS.resume()}>resume</button>
      <input value={count} onChange={(e) => setCount(Number(e.target.value))} />
    </h1>
  )
}

// 脱离组件模拟测试
const instance = new TimerService()

instance.start(60)
instance.onChange(console.log)

setTimeout(() => instance.pause(), 5000)
setTimeout(() => instance.resume(), 8000)
setTimeout(() => instance.close(), 10000)
