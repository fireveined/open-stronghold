class Logger {

    public debug(...data: any[]) {
        console.log(...data);
    }
    public log(...data: any[]) {
        console.log(...data);
    }
    public error(...data: any[]) {
        console.error(...data);
    }
}


export const logger = new Logger();