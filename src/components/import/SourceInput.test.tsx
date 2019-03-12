import {shallow} from 'enzyme';
import {SourceInput} from './SourceInput';
import * as React from 'react';
import {InputSource} from '../../Parser';
import * as assert from 'assert';
import '../../../test/setup.ts'

describe('SourceInput', () => {
    describe('render()', () => {
       it('should display the correct input component according to selected input type', () => {
           const wrapper = shallow(<SourceInput onChange={(e) => {}}/>)
           wrapper.find('#SourceInput-Dropdown').simulate('change', null, {key: InputSource.file});
           assert(wrapper.exists('input'));
       });
    });
});