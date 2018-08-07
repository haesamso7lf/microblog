import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/bootstrap.css';
import './styles/css/mdb.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_en from './translations/en/common.json';
import common_es from './translations/es/common.json';

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'en',
	resources: {
		en: {
			common: common_en
		}, 
		es: {
			common: common_es
		}
	}
});

ReactDOM.render(
	<Router>
		<I18nextProvider i18n={i18next}> 
			<App />	
		</I18nextProvider>
	</Router>,
	document.getElementById('root')
);
registerServiceWorker();
