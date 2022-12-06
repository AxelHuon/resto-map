import React from 'react';

const InputText = ({onChange, onKeyPress, value}) => {
	return (
		<>
			<input value={value}  onKeyPress={(e) => onKeyPress(e)} onChange={onChange} name={"chat-input"} />
		</>
	);
};

export default InputText;
