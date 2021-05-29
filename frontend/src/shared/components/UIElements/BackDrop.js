import React from 'react';
import ReactDOM from 'react-dom';

import './BackDrop.css';

function BackDrop(props) {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}/>,
        document.getElementById('backdrop-hook')
    );
}

export default BackDrop;
