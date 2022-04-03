export const editorVersion = "0.10";

export class EditorSettings {
	private recentProjects: { projectName: string, projectDirectory: string }[] = [];
	private static settingsFilePath = "./TEST.json";

	// 設定ファイル書き込み
	async toJson () {
		const object = {
			editorVersion: editorVersion,
			fileType: "trineEditorSettings",
			recentProjects: this.recentProjects
		}

		await window.mainProcessAPI.writeTextFile (EditorSettings.settingsFilePath, JSON.stringify (object));
	}

	// 設定ファイル読み込み
	static async fromJSON (): Promise<EditorSettings> {
		const object = await window.mainProcessAPI.readTextFile (EditorSettings.settingsFilePath);
		const editorSettings = new EditorSettings ();
		editorSettings.recentProjects = JSON.parse (object).recentProjects;
		return editorSettings;
	}
}
