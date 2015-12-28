export class Timer {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.timer = null;
    }

    start() {
        this.timer = setInterval(this.callback, this.interval);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
    }

    toggle() {
        if(this.timer) {
            this.stop();
        } else {
            this.start();
        }
    }
}
