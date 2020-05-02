/* eslint-env node */
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {setIconOptions} from '@fluentui/react';
import * as jsdom from 'jsdom-global';
import 'ignore-styles';

/* eslint-disable  @typescript-eslint/ban-ts-ignore */

Enzyme.configure({adapter: new Adapter()});

jsdom(undefined, {url: "http://localhost"});

// @ts-ignore
global.Office = {
	context: {},
	PlatformType: {
		PC: 0,
		OfficeOnline: 1,
		Mac: 2,
		iOS: 3,
		Android: 4,
		Universal: 5,
	},
}

// @ts-ignore
window.requestAnimationFrame = (cb) => cb();

setIconOptions({disableWarnings: true});