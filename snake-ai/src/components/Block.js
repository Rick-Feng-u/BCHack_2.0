import React, {useState} from 'react';
import '../styles/block.scss';

export function Block({type}) {
    return (
        <div className={'board-block'}>
            {type}
        </div>
    )
}

export default Block;

