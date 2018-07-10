import {
    reverse
} from '../../../../classes/util/string';

describe('String utils', () => {
    it('Reverse a string', () => {
        const result = reverse('Hello');

        expect(result).toBe('olleH');
    })
})
