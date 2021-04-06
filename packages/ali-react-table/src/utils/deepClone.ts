/**
 * deepClone函数：考虑了循环引用、处理函数属性（直接引用地址）
 * @param obj 需要拷贝的对象
 * @param map 默认不传，若要传请传WeakMap
 * @returns 深拷贝好的对象
 */
export function deepClone(obj: any, map = new WeakMap()) {
  if (typeof obj === 'object') {
    const temp: any = Array.isArray(obj) ? [] : {}
    if (map.has(obj)) return map.get(obj)
    Object.keys(obj).forEach((key: string) => {
      temp[key] = deepClone(obj[key])
    })
    map.set(obj, temp)
    return temp
  } else {
    return obj
  }
}
