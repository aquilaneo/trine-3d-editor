import path from 'path';
import {BrowserWindow, app, ipcMain} from 'electron';
import * as fs from "fs";

if (process.env.NODE_ENV === 'development') {
	const execPath =
		process.platform === 'win32'
			? '../node_modules/electron/dist/electron.exe'
			: '../node_modules/.bin/electron';

	require ('electron-reload') (__dirname, {
		electron: path.resolve (__dirname, execPath),
	});
}

const createWindow = () => {
	const mainWindow = new BrowserWindow ({
		webPreferences: {
			preload: path.join (__dirname, 'preload.js'),
		},
	});

	ipcMain.on ('update-title', (_e, arg) => {
		mainWindow.setTitle (`Electron React TypeScript: ${arg}`);
	});

	mainWindow.loadFile ('dist/index.html');
};

app.whenReady ().then (createWindow);
app.once ('window-all-closed', () => app.quit ());


// ========== テキストファイル読み込み ==========
ipcMain.handle ("read-text-file", async (event, filePath: string) => {
	const content = await fs.promises.readFile (filePath);
	return content.toString ();
});
// ==========================================


// ========== テキストファイル書き込み ==========
ipcMain.handle ("write-text-file", async (event, filePath: string, content: string) => {
	await fs.promises.writeFile (filePath, content);
});
// ==========================================
