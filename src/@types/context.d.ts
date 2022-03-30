export interface IElectronAPI {
	update: (count: number) => void;
	readTextFile: (filePath: string) => Promise<string>;
	writeTextFile: (filePath: string, content: string) => Promise<void>;
}

declare global {
	interface Window {
		mainProcessAPI: IElectronAPI;
	}
}
