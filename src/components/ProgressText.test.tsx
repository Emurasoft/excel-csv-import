import {shallow} from 'enzyme';
import {ProgressBar} from './ProgressBar';
import * as React from 'react';
import {Link} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('ProgressBar', () => {
    it('render()', () => {
        const wrapper = shallow(<ProgressBar onClick={() => {}} progress={0.0}/>);
        assert(wrapper.exists(Link));
        wrapper.setProps({progress: 1.0});
        assert(!wrapper.exists(Link));
    });

    it('click stop', () => {
        let clicked = false;
        const wrapper = shallow(<ProgressBar onClick={() => clicked = true} progress={0.0}/>);
        wrapper.find(Link).simulate('click')
        assert(clicked);
    });
});