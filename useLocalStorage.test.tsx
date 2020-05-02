import {useLocalStorage, namespacedUseLocalStorage} from './useLocalStorage';
import {shallow} from 'enzyme';
import * as React from 'react';
import * as assert from 'assert';

describe('useLocalStorage', () => {
	beforeEach(() => window.localStorage.clear());

	it('set and get', () => {
		function E(): React.ReactElement {
			const [v, setV] = useLocalStorage('key', 0);
			return (
				<>
					<p>{v}</p>
					<button onClick={() => setV(1)} />
				</>
			);
		}

		{
			const wrapper = shallow(<E />);
			assert.strictEqual(wrapper.find('p').text(), '0');
			assert.strictEqual(window.localStorage.getItem('key'), null);
			wrapper.find('button').simulate('click');
			assert.strictEqual(wrapper.find('p').text(), '1');
			assert.strictEqual(window.localStorage.getItem('key'), '1');
		}
		{
			const wrapper = shallow(<E />);
			assert.strictEqual(wrapper.find('p').text(), '1');
		}
	});

	it('empty key', () => {
		function E(): React.ReactElement {
			const [v, setV] = useLocalStorage('', 0);
			return (
				<>
					<p>{v}</p>
					<button onClick={() => setV(1)} />
				</>
			);
		}

		{
			const wrapper = shallow(<E />);
			wrapper.find('button').simulate('click');
			assert.strictEqual(window.localStorage.getItem(''), '1');
		}
		{
			const wrapper = shallow(<E />);
			assert.strictEqual(wrapper.find('p').text(), '1');
		}
	});

	it('namespacedUseLocalStorage', () => {
		const useLocalStorage0 = namespacedUseLocalStorage('namespace');

		function E(): React.ReactElement {
			const [v, setV] = useLocalStorage0('key', 0);
			return (
				<>
					<p>{v}</p>
					<button onClick={() => setV(1)} />
				</>
			);
		}

		{
			const wrapper = shallow(<E />);
			wrapper.find('button').simulate('click');
			assert.strictEqual(window.localStorage.getItem('namespace-key'), '1');
		}
		{
			const wrapper = shallow(<E/>);
			assert.strictEqual(wrapper.find('p').text(), '1');
		}
		const useLocalStorage1 = namespacedUseLocalStorage('differentNamespace');
		function DifferentElement(): React.ReactElement {
			const [v] = useLocalStorage1('key', 0);
			return (
				<>
					<p>{v}</p>
				</>
			);
		}
		{
			const wrapper = shallow(<DifferentElement />);
			assert.strictEqual(wrapper.find('p').text(), '0');
		}
	});
});