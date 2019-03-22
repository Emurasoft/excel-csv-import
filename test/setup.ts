import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    ResponsiveMode,
    setResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {setIconOptions} from 'office-ui-fabric-react/lib-commonjs';
import * as jsdom from 'jsdom-global';
import 'ignore-styles';

Enzyme.configure({adapter: new Adapter()});

jsdom();

const localStorage = {
    // @ts-ignore
    setItem: (k, v) => global.localStorage[k] = v,
    // @ts-ignore
    clear: () => global.localStorage = localStorage,
};

// @ts-ignore
global.localStorage = localStorage;

// @ts-ignore
window.requestAnimationFrame = (cb) => cb();

setResponsiveMode(ResponsiveMode.small);
setIconOptions({disableWarnings: true});