"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    debug(...data) {
        console.log(...data);
    }
    log(...data) {
        console.log(...data);
    }
    error(...data) {
        console.error(...data);
    }
}
exports.logger = new Logger();
