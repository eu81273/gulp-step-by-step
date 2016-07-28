import React from 'react';
import ReactDOM from 'react-dom';

let rootElement = document.getElementById('application');
let message = 'Hello World!';

ReactDOM.render(
	<div>{message}</div>,
	rootElement
);
