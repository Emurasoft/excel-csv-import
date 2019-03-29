import {shallow} from 'enzyme';
import {ProgressBarComponent} from './ProgressBar';
import * as React from 'react';
import {Link} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('ProgressBar', () => {
    it('render()', () => {
        const wrapper = shallow(
            <ProgressBarComponent
                onClick={() => {}}
                progress={{show: true, aborting: false, percent: 0.0}}
                // @ts-ignore
                t={k => k}
            />
        );
        assert(wrapper.exists(Link));
        wrapper.setProps({progress: {aborting: true}});
        assert(!wrapper.exists(Link));
        wrapper.setProps({progress: {show: false, aborting: false}});
        assert(!wrapper.exists(Link));
    });

    it('click stop', () => {
        let clicked = false;
        const wrapper = shallow(
            <ProgressBarComponent
                onClick={() => clicked = true}
                progress={{show: true, aborting: false, percent: 0.0}}
                // @ts-ignore
                t={k => k}
            />
        );
        wrapper.find(Link).simulate('click')
        assert(clicked);
    });
});