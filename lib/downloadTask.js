import { NativeModules } from 'react-native';
const { RNBackgroundDownloader } = NativeModules;

function validateHandler(handler) {
    if (!(typeof handler === 'function')) {
        throw new TypeError(`[RNBackgroundDownloader] expected argument to be a function, got: ${typeof handler}`);
    }
}
export default class DownloadTask {
    state = 'PENDING'
    percent = -1
    bytesWritten = 0
    totalBytes = -1
    etaInMilliSeconds = -1
    location = ''
    tag = undefined

    constructor(taskInfo) {
        if (typeof taskInfo === 'string') {
            this.id = taskInfo;
        } else {
            this.id = taskInfo.id;
            this.percent = taskInfo.percent;
            this.bytesWritten = taskInfo.bytesWritten;
            this.totalBytes = taskInfo.totalBytes;
            this.etaInMilliSeconds = taskInfo.etaInMilliSeconds;
            this.location = taskInfo.location;
            this.tag = taskInfo.tag;
        }
    }

    onBegin(handler) {
        validateHandler(handler);
        this._beginHandler = handler;
        return this;
    }

    onProgress(handler) {
        validateHandler(handler);
        this._progressHandler = handler;
        return this;
    }

    onDone(handler) {
        validateHandler(handler);
        this._doneHandler = handler;
        return this;
    }

    onPause(handler) {
        validateHandler(handler);
        this._pauseHandler = handler;
        return this;
    }

    onResume(handler) {
        validateHandler(handler);
        this._resumeHandler = handler;
        return this;
    }

    onError(handler) {
        validateHandler(handler);
        this._errorHandler = handler;
        return this;
    }

    onCancelled(handler) {
        validateHandler(handler);
        this._cancelHandler = handler;
        return this;
    }

    _onBegin(percent, bytesWritten, totalBytes, etaInMilliSeconds, downloadedBytesPerSecond) {
        this.state = 'DOWNLOADING';
        this.percent = percent;
        this.bytesWritten = bytesWritten;
        this.totalBytes = totalBytes;
        this.etaInMilliSeconds = etaInMilliSeconds;
        this.downloadedBytesPerSecond = downloadedBytesPerSecond;
        if (this._beginHandler) {
            this._beginHandler(this);
        }
    }

    _onProgress(percent, bytesWritten, totalBytes, etaInMilliSeconds, downloadedBytesPerSecond) {
        this.state = 'DOWNLOADING';
        this.percent = percent;
        this.bytesWritten = bytesWritten;
        this.totalBytes = totalBytes;
        this.etaInMilliSeconds = etaInMilliSeconds;
        this.downloadedBytesPerSecond = downloadedBytesPerSecond;
        if (this._progressHandler) {
            this._progressHandler(this);
        }
    }

    _onDone() {
        this.state = 'DONE';
        if (this._doneHandler) {
            this._doneHandler(this);
        }
    }

    _onPause() {
        this.state = 'PAUSED';
        if (this._pauseHandler) {
            this._pauseHandler(this);
        }
    }

    _onCancelled() {
        this.state = 'STOPPED';
        if (this._cancelHandler) {
            this._cancelHandler(this);
        }
    }

    _onResume() {
        this.state = 'DOWNLOADING';
        if (this._resumeHandler) {
            this._resumeHandler(this);
        }
    }

    _onError(error, errorCode) {
        this.state = 'FAILED';
        if (this._errorHandler) {
            this._errorHandler(error, errorCode);
        }
    }

    pause() {
        RNBackgroundDownloader.pauseTask(this.id);
        this._onPause();
    }

    resume() {
        RNBackgroundDownloader.resumeTask(this.id);
        this._onResume();
    }

    stop() {
        RNBackgroundDownloader.stopTask(this.id);
        this._onCancelled();
    }
}
