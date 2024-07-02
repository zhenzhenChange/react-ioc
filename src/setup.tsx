import { App } from 'antd'

import { DIProvider } from './core'
import { Component } from './examples/component'
import { useMessage } from './examples/message.service'

export default function Setup() {
  return (
    <App component={false}>
      <DIProvider initializers={[useMessage]}>
        <Component />
      </DIProvider>
    </App>
  )
}
