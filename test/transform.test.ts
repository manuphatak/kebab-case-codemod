// /* global jest */
// jest.autoMockOff()

import { defineTest } from 'jscodeshift/src/testUtils';

const fixtures = ['base'];

fixtures.forEach(test => defineTest(__dirname, 'src', {}, `use-query/${test}`));
