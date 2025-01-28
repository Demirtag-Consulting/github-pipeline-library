
import {PlaywrightTestSharded} from "./playwright-test-sharded";
import {getInput, setFailed, setOutput} from "@actions/core";
import {exec} from "@actions/exec";

async function run() {
    try {
        const scope = getInput('scope');
        const index: number = Number(getInput('index'));
        const total: number = Number(getInput('total'));

        console.log("Scope: " + scope);
        console.log("Index: " + index);
        console.log("Total: " + total);

        setOutput('report', 'report-directory');

        const playwrightTestSharded = new PlaywrightTestSharded();
        await playwrightTestSharded.setupPlaywright();
        await playwrightTestSharded.runTests('', 1, 1);

    } catch (error: any) {
        setFailed(error.message);
    }
}

run();

