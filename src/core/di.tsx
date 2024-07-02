import { ReflectiveInjector, Type, resolveDependencies } from 'injection-js'
import { type PropsWithChildren, createContext, useContext } from 'react'

import 'reflect-metadata'

type Props = { initializers: Array<() => void> }

const DIInjectors = [] as ReflectiveInjector[]
const DIRootInjector = ReflectiveInjector.resolveAndCreate([])
const DIRootContainer = createContext({ DIInjectors, DIRootInjector })

export function useInject<T>(serviceToken: Type<T>): T {
  const { DIInjectors, DIRootInjector } = useContext(DIRootContainer)

  const injector = DIInjectors.find((injector) => injector.get(serviceToken))
  if (injector) return injector.get(serviceToken)

  // NOTE: 需要解析依赖关系
  const subInjector = DIRootInjector.resolveAndCreateChild(resolveDependencies(serviceToken))
  DIInjectors.push(subInjector)
  return subInjector.get(serviceToken)
}

export function DIProvider({ children, initializers }: PropsWithChildren<Props>) {
  initializers.forEach((initializer) => initializer())

  return <DIRootContainer.Provider value={{ DIInjectors, DIRootInjector }}>{children}</DIRootContainer.Provider>
}
