import {mount} from 'enzyme';
import {ErrorBoundary} from './ErrorBoundary';
import * as React from 'react';
import * as assert from 'assert';

describe('ErrorBoundary', () => {
    it('render()', () => {
        const wrapper0 = mount(<ErrorBoundary><div /></ErrorBoundary>);
        assert(!wrapper0.exists('textarea'));

        function BuggyComponent(): JSX.Element {
            throw new Error();
        }
        const wrapper1 = mount(<ErrorBoundary><BuggyComponent /></ErrorBoundary>);
        assert((wrapper1.find('textarea').props().value as string).includes('Error'));
    });
});