export const editorVersion = "0.10";

export class EditorSettings {
	recentProjects: { projectName: string, projectDirectory: string }[] = [];

	async toJson (filePath: string) {
		const object = {
			editorVersion: editorVersion,
			fileType: "trineEditorSettings",
			recentProjects: this.recentProjects
		}

		await window.mainProcessAPI.writeTextFile (filePath, JSON.stringify (object));
	}
}
