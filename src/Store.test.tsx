import {OutputType, Store} from './Store';
import {mount} from 'enzyme';
import * as React from 'react';
import {connect} from './connect';
import * as assert from 'assert';

describe('Store', () => {
    it('setParserOutput()', (done) => {
        class Component extends React.Component<{store: Store}> {
            public render(): React.ReactNode {
                return null;
            }

            public componentDidMount(): void {
                this.props.store.setParserOutput({type: OutputType.info, output: 'output text'});
                const expected = {
                    name: 'setParserOutput',
                    args: {
                        parserOutput: {
                            type: 1,
                            output: 'output text',
                        },
                    },
                };
                assert.deepStrictEqual(JSON.parse(this.props.store.log()).pop(), expected);
                done();
            }
        }

        const C = connect(Component);

        const wrapper = mount(
            <Store>
                <C />
            </Store>
        );
        wrapper.render();
    });
});