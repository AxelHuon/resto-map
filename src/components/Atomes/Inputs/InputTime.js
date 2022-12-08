import React from 'react';

const InputTime = ({onChange, value}) => {
	return (
		<>
            <input type="number"
            className={"input-time-custom"}
            value={value}
            onChange={onChange}
            name={"time-input"}
            min="0" max="23"/>
		</>
	);
};

export default InputTime;
