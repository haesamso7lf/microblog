import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/bootstrap.css';
import './styles/css/mdb.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
