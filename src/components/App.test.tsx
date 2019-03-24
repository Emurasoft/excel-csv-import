import * as querystring from 'query-string';
import {_parseQuery} from './App';
import * as assert from 'assert';

describe('App', () => {
    it('_parseQuery()', () => {
        interface Test {
            query: querystring.ParsedQuery;
            expected: {page: string, language: string};
        }
        const tests: Test[] = [
            {
                query: {},
                expected: {
                    page: '',
                    language: 'en',
                },
            },
            {
                query: {
                    page: 'import',
                    language: 'ja',
                },
                expected: {
                    page: 'import',
                    language: 'ja',
                },
            },
            {
                query: {
                    page: ['import'],
                    language: ['ja'],
                },
                expected: {
                    page: 'import',
                    language: 'en',
                },
            },
        ];

        for (const test of tests) {
            assert.deepStrictEqual(_parseQuery(test.query), test.expected);
        }
    });
});