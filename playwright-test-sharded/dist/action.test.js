import { PlaywrightTestSharded } from "./playwright-test-sharded";
describe('test assertion', () => {
    test('Can be created', () => {
        const playwrightTestSharded = new PlaywrightTestSharded();
        expect(playwrightTestSharded).toBeDefined();
    });
});
