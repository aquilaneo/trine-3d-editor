import React from 'react';
import './app.css';
import * as Data from "./data";

export const App = () => {
	const settings = new Data.EditorSettings ();
	settings.toJson ();

	return (
		<div>
			<h1>Test</h1>
		</div>
	);
};
