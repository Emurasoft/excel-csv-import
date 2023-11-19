/* eslint-env node */
import {ResponsiveMode, initializeIcons, setIconOptions, setResponsiveMode} from '@fluentui/react';
import 'ignore-styles';
import {configureLoadStyles} from '@microsoft/load-themed-styles';

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

configureLoadStyles(() => {});