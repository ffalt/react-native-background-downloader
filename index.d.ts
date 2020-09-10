// Type definitions for react-native-background-downloader 2.3
// Project: https://github.com/EkoLabs/react-native-background-downloader.git
// Definitions by: Junseong Park <https://github.com/Kweiza>
//                 Adam Hunter <https://github.com/adamrhunter>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface DownloadHeaders {
	[key: string]: string | null;
}

type SetHeaders = (h: DownloadHeaders) => void;

export interface TaskInfoObject {
	id: string;
	location: string;
	tag: string;
	percent: number;
	bytesWritten: number;
	totalBytes: number;
	etaInMilliSeconds: number;
}

export type TaskInfo = string | TaskInfoObject;

export type ChangeHandler = (task: DownloadTask) => void;
export type ErrorHandler = (error: any, errorCode: any) => void;

export type DownloadTaskState = 'PENDING' | 'DOWNLOADING' | 'PAUSED' | 'STOPPED' | 'DONE' | 'FAILED';

export interface DownloadTask {
	constructor: (taskInfo: TaskInfo) => DownloadTask;

	id: string;
	location: string;
	tag?: string;
	state: DownloadTaskState;
	percent: number;
	bytesWritten: number;
	totalBytes: number;
	etaInMilliSeconds: number;
	downloadedBytesPerSecond: number;

	onBegin: (handler: ChangeHandler) => DownloadTask;
	onProgress: (handler: ChangeHandler) => DownloadTask;
	onDone: (handler: ChangeHandler) => DownloadTask;
	onPause: (handler: ChangeHandler) => DownloadTask;
	onResume: (handler: ChangeHandler) => DownloadTask;
	onCancelled: (handler: ChangeHandler) => DownloadTask;
	onError: (handler: ErrorHandler) => DownloadTask;

	_beginHandler: ChangeHandler;
	_progressHandler: ChangeHandler;
	_onCancelled: ChangeHandler;
	_doneHandler: ChangeHandler;
	_pauseHandler: ChangeHandler;
	_resumeHandler: ChangeHandler;
	_errorHandler: ErrorHandler;

	pause: () => void;
	resume: () => void;
	stop: () => void;
}

export type CheckForExistingDownloads = () => Promise<DownloadTask[]>;

export interface DownloadOption {
	id: string;
	url: string;
	destination: string;
	tag?: string;
	headers?: DownloadHeaders;
}

export type Download = (options: DownloadOption) => DownloadTask;

export interface Directories {
	documents: string;
}

export interface Network {
	WIFI_ONLY: string;
	ALL: string;
}

export interface Priority {
	HIGH: string;
	MEDIUM: string;
	LOW: string;
}

export const setHeaders: SetHeaders;
export const checkForExistingDownloads: CheckForExistingDownloads;
export const download: Download;
export const directories: Directories;
export const Network: Network;
export const Priority: Priority;

export interface RNBackgroundDownloader {
	setHeaders: SetHeaders;
	checkForExistingDownloads: CheckForExistingDownloads;
	download: Download;
	directories: Directories;
	Network: Network;
	Priority: Priority;
}

declare const RNBackgroundDownloader: RNBackgroundDownloader;
export default RNBackgroundDownloader;
