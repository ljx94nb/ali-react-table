import { IPaginationPluginValue } from '../base-table/interfaces'

export class PaginationPlugin {
  pluginName: string
  pluginValue: IPaginationPluginValue

  constructor(pluginName: string, pluginValue: IPaginationPluginValue) {
    this.pluginName = pluginName
    this.pluginValue = pluginValue ? pluginValue : { data: [] }
  }

  // register(pluginValue: IPaginationPluginValue) {
  //   this._pluginValue = pluginValue
  // }

  // press() {
  //   return this._pluginValue
  // }

  // getPluginName() {
  //   return this._pluginName
  // }
}
