import { ReflectiveInjector, resolveDependencies, type Type } from 'injection-js'
import { createContext, type PropsWithChildren, useContext } from 'react'

import 'reflect-metadata'

type Props = { initializers: Array<() => void> }

const DIInjectors = new Map<Type<any>, ReflectiveInjector>()
const DIRootInjector = ReflectiveInjector.resolveAndCreate([])
const DIRootContainer = createContext({ DIInjectors, DIRootInjector })

// TODO 多次 useInject 会触发多次 constructor 初始化
export function useInject<T>(serviceToken: Type<T>): T {
  const { DIInjectors, DIRootInjector } = useContext(DIRootContainer)
  try {
    const injector = DIInjectors.get(serviceToken)
    if (injector) return injector.get(serviceToken)

    // NOTE: 需要解析依赖关系
    const subInjector = DIRootInjector.resolveAndCreateChild(resolveDependencies(serviceToken))
    DIInjectors.set(serviceToken, subInjector)
    return subInjector.get(serviceToken)
  } catch (error) {
    const reason = `[useInject]::[NOT_FOUND]::[${serviceToken.name}]`
    console.warn(reason)
    console.error(error)
    throw new Error(reason)
  }
}

export function DIProvider({ children, initializers }: PropsWithChildren<Props>) {
  initializers.forEach((initializer) => initializer())

  return <DIRootContainer.Provider value={{ DIInjectors, DIRootInjector }}>{children}</DIRootContainer.Provider>
}
