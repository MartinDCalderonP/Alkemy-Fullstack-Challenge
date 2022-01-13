import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { StateProvider } from './context/Context';
import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
