import {shallow} from 'enzyme';
import {ProgressText} from './ProgressText';
import * as React from 'react';
import {Link} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('ProgressText', () => {
    it('render()', () => {
        const wrapper = shallow(<ProgressText hidden={false} onClick={() => {}}/>);
        assert(!wrapper.exists(Link));
        wrapper.setProps({hidden: true});
        assert(wrapper.exists(Link));
    });
});