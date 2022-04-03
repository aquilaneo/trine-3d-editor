export const editorVersion = "0.10";

// ========== エディタ設定 ==========
export class EditorSettings {
	private recentProjects: { projectName: string, projectDirectory: string }[] = [];
	private static settingsFilePath = "./TEST.json";

	// 設定ファイル書き込み
	public async toJson () {
		const object = {
			editorVersion: editorVersion,
			fileType: "trineEditorSettings",
			recentProjects: this.recentProjects
		}

		await window.mainProcessAPI.writeTextFile (EditorSettings.settingsFilePath, JSON.stringify (object));
	}

	// 設定ファイル読み込み
	public static async fromJSON () {
		const object = JSON.parse (await window.mainProcessAPI.readTextFile (EditorSettings.settingsFilePath));
		const editorSettings = new EditorSettings ();
		editorSettings.recentProjects = object.recentProjects;
		return editorSettings;
	}
}

// ================================


// ========== プロジェクト ==========
export class Project {
	private _projectName: string;
	private _initialEditorVersion: string;

	public constructor (projectName: string);
	public constructor ();

	// コンストラクタ
	public constructor (projectName?: string) {
		if (projectName) {
			this._projectName = projectName;
		} else {
			this._projectName = "";
		}
		this._initialEditorVersion = editorVersion;
	}

	public get projectName () {
		return this._projectName;
	}

	public set projectName (projectName: string) {
		this._projectName = projectName;
	}

	// プロジェクトファイル書き込み
	public async toJson (filePath: string) {
		const object = {
			editorVersion: editorVersion,
			fileType: "trineProject",
			projectName: this.projectName,
			initialEditorVersion: this._initialEditorVersion
		}

		await window.mainProcessAPI.writeTextFile (filePath, JSON.stringify (object));
	}

	// プロジェクトファイル読み込み
	public static async fromJson (filePath: string) {
		const object = JSON.parse (await window.mainProcessAPI.readTextFile (filePath));
		const project = new Project ();
		project.projectName = object.projectName;
		project._initialEditorVersion = object.initialEditorVersion;
		return project;
	}
}

// ================================
