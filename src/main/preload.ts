import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld ('mainProcessAPI', {
	update: (count: number) => ipcRenderer.send ('update-title', count),
	readTextFile: async (filePath: string) => await ipcRenderer.invoke ("read-text-file", filePath),
	writeTextFile: async (filePath: string, content: string) => await ipcRenderer.invoke ("write-text-file", filePath, content),
	exists: async (filePath: string) => await ipcRenderer.invoke ("exists", filePath)
});
