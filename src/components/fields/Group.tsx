import * as React from 'react';
import { GroupProps } from '../../export';

const Group: React.FC<GroupProps> = ({ legend, children }) => {
    // console.log(1, children)
    return (
        <div>
            <div>{legend ? legend : null}</div>
            {children}
        </div>
    );
};

export default Group;
