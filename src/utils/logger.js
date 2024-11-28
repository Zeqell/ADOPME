import winston, { http, level, transport } from "winston"

// const logger = winston.createLogger({
//   transports:[
//     new winston.transports.Console({level: "http"}),
//     new winston.transports.File({
//       filename: "./errors.log",
//       level: "warn"
//     })
//   ]
// })

const levels = {
  level: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors:{
    fatal: "red",
    error: "yellow",
    warning: "blew",
    info: "green",
    http: "magenta",
    debug: "white"
  }
}

const logger = winston.createLogger({
  levels: levels.level,
  transport: [
    new winston.transports.Console({
      level: "http",
      format: winston.format.combine(
        winston.format.colorize({colors: levels.colors}),
        winston.format.simple
      )
    })
  ]
})

const addLogger = (req, res, nex) =>{
  req.logger = logger
  req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
  nex()
}

export default addLogger