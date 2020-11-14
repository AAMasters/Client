
process.on('uncaughtException', function (err) {
    if (err.message.indexOf("EADDRINUSE") > 0) {
        console.log("A Superalgos Backend Server cannot be started. Reason: the port " + port + " is already in use by another application.")
        return
    }
    console.log('[ERROR] Backend Server -> server -> uncaughtException -> err.message = ' + err.message)
    console.log('[ERROR] Backend Server -> server -> uncaughtException -> err.stack = ' + err.stack)
    process.exit(1)
})

process.on('unhandledRejection', (reason, p) => {
    console.log('[ERROR] Backend Server -> server -> unhandledRejection -> reason = ' + JSON.stringify(reason))
    console.log('[ERROR] Backend Server -> server -> unhandledRejection -> p = ' + JSON.stringify(p))
    process.exit(1)
})

/* Callbacks default responses. */

global.DEFAULT_OK_RESPONSE = {
    result: "Ok",
    message: "Operation Succeeded"
};

global.DEFAULT_FAIL_RESPONSE = {
    result: "Fail",
    message: "Operation Failed"
};

global.DEFAULT_RETRY_RESPONSE = {
    result: 'Retry',
    message: 'Retry Later'
}

global.CUSTOM_OK_RESPONSE = {
    result: 'Ok, but check Message',
    message: 'Custom Message'
}

global.CUSTOM_FAIL_RESPONSE = {
    result: 'Fail Because',
    message: 'Custom Message'
}

/* Servers */
let WEB_SERVER = require('./webServer.js')
let DATA_FILE_SERVER = require('./dataFileServer.js')
let PROJECT_FILE_SERVER = require('./projectFileServer.js')
let WEB_APP_FILE_SERVER = require('./webAppFileServer.js')
let PLUGIN_SERVER = require('./pluginServer.js')
let EVENT_SERVER = require('./eventServer.js')
let TASK_MANAGER_SERVER = require('./taskManagerServer.js')
let CCXT_SERVER = require('./ccxtServer.js')

/* Network Interfaces */
let WEB_SOCKETS_INTERFACE = require('./webSocketsServer.js')
let HTTP_INTERFACE = require('./httpInterface.js')

try {
    WEB_SERVER = WEB_SERVER.newWebServer()
    WEB_SERVER.initialize()
    WEB_SERVER.run()
    console.log('Web Server ......................... Started')

    DATA_FILE_SERVER = DATA_FILE_SERVER.newDataFileServer()
    DATA_FILE_SERVER.initialize()
    DATA_FILE_SERVER.run()
    console.log('Data File Server ................... Started')

    PROJECT_FILE_SERVER = PROJECT_FILE_SERVER.newProjectFileServer()
    PROJECT_FILE_SERVER.initialize()
    PROJECT_FILE_SERVER.run()
    console.log('Project File Server ................ Started')

    WEB_APP_FILE_SERVER = WEB_APP_FILE_SERVER.newWebAppFileServer()
    WEB_APP_FILE_SERVER.initialize()
    WEB_APP_FILE_SERVER.run()
    console.log('Web App File Server ................ Started')

    PLUGIN_SERVER = PLUGIN_SERVER.newPluginServer()
    PLUGIN_SERVER.initialize()
    PLUGIN_SERVER.run()
    console.log('Plugin Server ...................... Started')

    EVENT_SERVER = EVENT_SERVER.newEventServer()
    EVENT_SERVER.initialize()
    EVENT_SERVER.run()
    console.log('Events Server ...................... Started')

    TASK_MANAGER_SERVER = TASK_MANAGER_SERVER.newTaskManagerServer(WEB_SOCKETS_INTERFACE, EVENT_SERVER)
    TASK_MANAGER_SERVER.initialize()
    TASK_MANAGER_SERVER.run()
    console.log('Task Manager Server ................ Started')

    CCXT_SERVER = CCXT_SERVER.newCCXTServer()
    CCXT_SERVER.initialize()
    CCXT_SERVER.run()
    console.log('CCXT Server ........................ Started')

    WEB_SOCKETS_INTERFACE = WEB_SOCKETS_INTERFACE.newWebSocketsInterface(EVENT_SERVER)
    WEB_SOCKETS_INTERFACE.initialize()
    WEB_SOCKETS_INTERFACE.run()
    console.log('Web Sockets Interface .............. Started')

    HTTP_INTERFACE = HTTP_INTERFACE.newHttpInterface(WEB_SERVER)
    HTTP_INTERFACE.initialize()
    HTTP_INTERFACE.run()
    console.log('Http Interface ..................... Started')

    //console.log("You are running Superalgos Beta 6 SP4: What's new? Some bugs fixed and improved performance.")

    console.log("You are running Superalgos Beta 7: What's new? Multi-Project & Machine Learning Infrastructure is being implemented here.")

} catch (err) {
    console.log('[ERROR] BackendServers -> Task Manager -> server -> Error = ' + err.stack)
}

