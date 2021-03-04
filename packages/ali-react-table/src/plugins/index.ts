import { useState } from 'react'
import { IPlugin } from '../interfaces'

export const usePlugins = () => {
  const [plugins, setPluginsHook] = useState<any>({})
  const setPlugins = (plugin: IPlugin) => {
    const map: any = {}
    map[plugin['pluginName']] = plugin.pluginValue
    setPluginsHook((prev: any) => ({ ...prev, ...map }))
  }
  return {
    plugins,
    setPlugins,
  }
}

export * from './pagination-plugin'
