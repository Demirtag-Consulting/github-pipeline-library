
import {PlaywrightTestSharded} from "./playwright-test-sharded";
import {getInput, setFailed} from "@actions/core";

async function run() {
    try {
        const scope = getInput('scope');
        const index: number = Number(getInput('index'));
        const total: number = Number(getInput('total'));

        const playwrightTestSharded = new PlaywrightTestSharded();
        await playwrightTestSharded.setupPlaywright();
        await playwrightTestSharded.runTests(scope, index, total);

    } catch (error: any) {
        setFailed(error.message);
    }
}

