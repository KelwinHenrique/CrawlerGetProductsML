import { createLogger, format, transports } from 'winston'
import stackTrace from 'stack-trace'
import rTracer from 'cls-rtracer'

const { combine, timestamp, printf } = format;

const jsonFormat = (trace, rid) => {
  return printf(({timestamp, level, message, ...meta}) => {
    return JSON.stringify({
      'requestId': rid,
      'timestamp': timestamp,
      'level': level,
      'message': message,
      ...meta,
      'fileName': trace.getFileName(),
      'functionName': trace.getFunctionName(),
    });
  });
}

const ConsoleLogger = () => {
  const trace = stackTrace.get()[1]
  const rid = rTracer.id()
  return createLogger({
    format: combine(
      timestamp(),
      jsonFormat(trace,rid),
    ),
    transports: [
      new transports.Console()
    ]
  });
}

export {
  ConsoleLogger
}
