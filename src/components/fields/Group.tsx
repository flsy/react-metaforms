import * as React from 'react';
import { GroupProps } from 'metaforms';

export type Props = Omit<GroupProps, 'fields'>;

const Group: React.FC<Props> = ({ legend, children }) => {
  return (
    <div>
      <div>{legend ? legend : null}</div>
      {children}
    </div>
  );
};

export default Group;
