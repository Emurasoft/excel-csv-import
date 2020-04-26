import {EncodingDropdown} from './EncodingDropdown';
import {shallow} from 'enzyme';
import * as React from 'react';
import {Dropdown} from '@fluentui/react';
import * as assert from 'assert';

describe('EncodingDropdown', () => {
	it('hidden', () => {
		const wrapper = shallow(
			<EncodingDropdown
				value={'UTF-8'}
				onChange={() => {}}
				showAutoDetect={true}
				hidden={false}
			/>
		);
		assert(wrapper.exists(Dropdown));
		wrapper.setProps({hidden: true});
		assert(!wrapper.exists(Dropdown));
	});
});