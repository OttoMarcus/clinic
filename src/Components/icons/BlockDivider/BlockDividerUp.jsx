import React from 'react';


const BlockDividerUp = () => {

    return (
        <div style={{overflow: 'hidden', width: '100%', marginBottom:'-8px'}}>
            <svg
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{fill: '#f5eded', width: '100%', height: 75, transform: `rotate(180deg) scaleX(-1)`}}
            >
                <path d="M1200 120L0 16.48V0h1200v120z"/>
            </svg>
        </div>
    );
}


export default BlockDividerUp;