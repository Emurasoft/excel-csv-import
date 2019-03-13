import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {
    ResponsiveMode,
    setResponsiveMode
} from 'office-ui-fabric-react/lib-commonjs/utilities/decorators/withResponsiveMode';
import {setIconOptions} from 'office-ui-fabric-react/lib-commonjs';

Enzyme.configure({adapter: new Adapter()});

setResponsiveMode(ResponsiveMode.small);
setIconOptions({disableWarnings: true});