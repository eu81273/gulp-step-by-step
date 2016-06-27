import React from 'react';
import ReactDOM from 'react-dom';

let rootElement = document.getElementById('first');
let message = 'Hello, this is first!';

ReactDOM.render(
	<div>{message}</div>,
	rootElement
);
