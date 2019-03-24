import {EncodingDropdownComponent} from './EncodingDropdown';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Dropdown} from 'office-ui-fabric-react';
import * as assert from 'assert';

describe('EncodingDropdown', () => {
    it('hidden', () => {
        const wrapper = shallow(
            <EncodingDropdownComponent
                value={'UTF-8'}
                onChange={() => {}}
                showAutoDetect={true}
                hidden={false}
                // @ts-ignore
                t={k => k}
            />
        );
        assert(wrapper.exists(Dropdown));
        wrapper.setProps({hidden: true});
        assert(!wrapper.exists(Dropdown));
    });
});