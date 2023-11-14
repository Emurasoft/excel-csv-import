/* eslint-env node */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {ResponsiveMode, initializeIcons, setIconOptions, setResponsiveMode} from '@fluentui/react';
import * as jsdom from 'jsdom-global';
import 'ignore-styles';
import {configureLoadStyles} from '@microsoft/load-themed-styles';

Enzyme.configure({adapter: new Adapter()});

jsdom(undefined, {url: "http://localhost"});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).Office = {
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

initializeIcons();

setResponsiveMode(ResponsiveMode.large);

configureLoadStyles(styles => {});