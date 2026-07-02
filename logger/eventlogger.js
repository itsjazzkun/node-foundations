const fs = require ('fs')
const os = require ('os')

const EventE = require ('events')

class Logger extends EventE{
    
    log(msg){
        this.emit('msg',{msg})
    }
}

const logger = new Logger()
const logfile = "./eventlog.txt"

const logTofile = (event) => {
    const logmsg = `${new Date().toISOString()}- ${event.msg}\n`
    fs.appendFileSync(logfile,logmsg)
}

logger.on('msg', logTofile)

setInterval(() => {
 const memoryUsage = (os.freemem() / os.totalmem()) * 100
 logger.log(`cureent memory usage: ${memoryUsage.toFixed(3)}`)
}, 3000)


logger.log("app started")
logger.log ("app event occured")