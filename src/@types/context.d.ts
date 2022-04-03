export interface IElectronAPI {
	update: (count: number) => void;
	readTextFile: (filePath: string) => Promise<string>;
	writeTextFile: (filePath: string, content: string) => Promise<void>;
	exists: (filePath: string) => Promise<boolean>;
}

declare global {
	interface Window {
		mainProcessAPI: IElectronAPI;
	}
}
