import * as core from '@actions/core';
import { PlaywrightTestSharded } from "./playwright-test-sharded";
async function run() {
    try {
        const scope = core.getInput('scope');
        const index = Number(core.getInput('index'));
        const total = Number(core.getInput('total'));
        const playwrightTestSharded = new PlaywrightTestSharded();
        await playwrightTestSharded.setupPlaywright();
        await playwrightTestSharded.runTests(scope, index, total);
    }
    catch (error) {
        core.setFailed(error.message);
    }
}
