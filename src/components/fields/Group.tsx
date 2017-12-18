import * as React from 'react';
import { GroupPropsFinal } from './types';

const Group = ({ legend, children }: GroupPropsFinal) => {
    // console.log(1, children)
    return (
        <div>
            <div>{legend ? legend : null}</div>
            {children}
        </div>
    );
};

export default Group;
