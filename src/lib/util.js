export const isNumber = (data) => typeof data === 'number'
export const isBoolean = (data) => typeof data === 'boolean'
export const isString = (data) => typeof data === 'string'
export const isUndefined = (data) => typeof data === 'undefined'
export const isFunction = (data) => typeof data === 'function'
export const isObject = (data) => typeof data === 'object'
export const isNull = (data) => data  === null
export const isEmpty = (data) => isUndefined(data) || isNull(data)
export const isDate = (data) => data instanceof Date
export const isArray = (data) => data instanceof Array
export const isSet = (data) => data instanceof Set
export const isMap = (data) => data instanceof Map
export const isError = (data) => data instanceof Error
export const isPromise = (data) => data instanceof Promise
export const isEmail = (data) => isString(data) && new RegExp(/\S+@\S+\.\S+/).test(data)
export const isStateError = (data) => isNull(data) || isError(data)
