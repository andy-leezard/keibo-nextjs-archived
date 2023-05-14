const RN_LOG_LEVEL = {
  debug: 0,
  warn: 1,
  error: 2,
} as const

type LogLevel = ValueOf<typeof RN_LOG_LEVEL>
type LoggerFunction = (message?: any, ...optionalParams: any[]) => void

export const log = (
  message: any,
  logLevel: LogLevel = RN_LOG_LEVEL.debug,
  alertErrorOnProduction = false
) => {
  if (process.env.NODE_ENV === "production") return
  let isError = false
  let println: LoggerFunction | undefined
  switch (logLevel) {
    case RN_LOG_LEVEL.error:
      println = console.error
      isError = true
      break
    case RN_LOG_LEVEL.warn:
      println = console.warn
      break
    default:
      println = console.log
      break
  }
  if (message instanceof Array) {
    println(...message)
    return
  }
  if (isError && message?.message) {
    println(message.message)
    if (alertErrorOnProduction) {
      window.alert(message.message)
    }
    return
  }
  println(message)
}