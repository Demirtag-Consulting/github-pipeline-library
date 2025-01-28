import * as core from '@actions/core';
import {PlaywrightTestSharded} from "./playwright-test-sharded";

async function run() {
    try {
        const scope = core.getInput('scope');
        const index: number = Number(core.getInput('index'));
        const total: number = Number(core.getInput('total'));

        const playwrightTestSharded = new PlaywrightTestSharded();
        await playwrightTestSharded.setupPlaywright();
        await playwrightTestSharded.runTests(scope, index, total);

    } catch (error: any) {
        core.setFailed(error.message);
    }
}

