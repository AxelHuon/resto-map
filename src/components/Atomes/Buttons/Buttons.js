import React from 'react';

const Button = ({onClick, styleSelected, title}) => {
	return (
		<button onClick={onClick} className={styleSelected}>{title}</button>
	);
};

export default Button;
