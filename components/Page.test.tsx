import {Page} from './Page';
import * as React from 'react';
import * as assert from 'assert';
import {describe, beforeEach, expect, test} from '@jest/globals';

describe('TitleBar', () => {
	beforeEach(() => window.localStorage.clear());
	// it('compatability test', () => {
	// 	{
	// 		const wrapper = shallow(<Page text={''} helpLink={''} mac={false}>{null}</Page>);
	// 		assert(wrapper.exists('CustomizedPrimaryButton'));
	// 	}
	// 	{
	// 		window.localStorage.setItem('app-firstVisit', 'false');
	// 		const wrapper = shallow(<Page text={''} helpLink={''} mac={false}>{null}</Page>);
	// 		assert(!wrapper.exists('CustomizedPrimaryButton'));
	// 	}
	// });
});