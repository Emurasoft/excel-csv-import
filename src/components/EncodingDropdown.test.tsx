import {EncodingDropdown} from './EncodingDropdown';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Dropdown} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('EncodingDropdown', () => {
    it('hidden', () => {
        const wrapper = shallow(
            <EncodingDropdown value={'UTF-8'} onChange={() => {}} hidden={false} />
        );
        assert(wrapper.exists(Dropdown));
        wrapper.setProps({hidden: true});
        assert(!wrapper.exists(Dropdown));
    });
});