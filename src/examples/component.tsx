import { useInject } from '../core'
import { Notification } from './notification.service'
import { useState } from 'react'

import './notification.service.spec'

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

function DIKidSub() {
  const service = useInject(Notification)

  return (
    // NOTE: 不会触发 react 的更新调度
    <button onClick={() => service.update()}>
      DiKidSub + {service.state} + dep {service.count}
    </button>
  )
}

export function Component() {
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
    </div>
  )
}
