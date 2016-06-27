import React from 'react';
import ReactDOM from 'react-dom';

let rootElement = document.getElementById('second');
let message = 'Hello, this is second!';

ReactDOM.render(
	<div>{message}</div>,
	rootElement
);
