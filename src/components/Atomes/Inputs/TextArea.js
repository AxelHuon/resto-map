import React from 'react';

const TextArea = ({onChange, value}) => {
	return (
		<>
			<textarea className={"textarea-custom"} rows={1} value={value} onChange={onChange} name={"chat-input"} />
		</>
	);
};

export default TextArea;
