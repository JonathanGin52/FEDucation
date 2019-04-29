import React from 'react';

const TextInput = (props) => {
  const classNames = "";

  return (
    <div>
      <label>{props.label}</label>:
      <input type="text" className={classNames} {...props} />
    </div>
  );
};

export default TextInput;
