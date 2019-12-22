import React from 'react';

function Row(props) {
  return (
    <div className="row center">
      {props.children}
    </div>
  );
}

export default Row;
