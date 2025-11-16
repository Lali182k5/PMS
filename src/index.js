import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FilterProvider } from './context/FilterContext';
import './styles/GlobalStyles.css';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<FilterProvider>
		<App />
	</FilterProvider>
);
