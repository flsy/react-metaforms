import React from 'react';
import { mount } from 'enzyme';

import CollapsingGroup from '../CollapsingGroup';
import GroupFields from '../GroupFields';
import GroupHeader from '../GroupHeader';

const defaultProps = {
  id: 'some-id',
  legend: 'collapsing group'
};

describe('<CollapsingGroup />', () => {
  it('should mount and unmout and render an collapsing group', () => {
    const wrapper = mount(<CollapsingGroup {...defaultProps}/>);
    expect(wrapper.find(GroupFields).exists()).toEqual(true);
    expect(wrapper.find(GroupHeader).exists()).toEqual(true);
    wrapper.unmount()
  });
});
