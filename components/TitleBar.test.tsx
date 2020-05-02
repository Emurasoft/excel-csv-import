import {TitleBar} from './TitleBar';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as assert from 'assert';

describe('TitleBar', () => {
	beforeEach(() => window.localStorage.clear());

	it('compatability test', () => {
		{
			const wrapper = shallow(<TitleBar text={''} helpLink={''} mac={false}/>);
			assert(wrapper.exists('CustomizedPrimaryButton'));
		}
		{
			window.localStorage.setItem('app-firstVisit', 'false');
			const wrapper = shallow(<TitleBar text={''} helpLink={''} mac={false}/>);
			assert(!wrapper.exists('CustomizedPrimaryButton'));
		}
	});
});