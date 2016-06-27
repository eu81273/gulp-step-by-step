import React from 'react';
import ReactDOM from 'react-dom';

let rootElement = document.getElementById('third');
let message = 'Hello, this is third!';

ReactDOM.render(
	<div>{message}</div>,
	rootElement
);
