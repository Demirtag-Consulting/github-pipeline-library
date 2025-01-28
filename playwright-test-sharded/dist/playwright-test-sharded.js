import { exec } from "@actions/exec";
import { setFailed, setOutput, warning } from "@actions/core";
export class PlaywrightTestSharded {
    async setupPlaywright() {
        try {
            await exec('npm ci');
        }
        catch (error) {
            warning('npm ci failed. Running npm install instead');
            await exec('npm install');
        }
        try {
            await exec('npx playwright install');
        }
        catch (error) {
            setFailed(error.message);
        }
    }
    async runTests(scope, index, total) {
        try {
            await exec('npx playwright test ' + scope + ' --shard=' + index + '/' + total);
        }
        catch (error) {
            setFailed(error.message);
        }
        finally {
            setOutput('report', 'report-directory');
        }
    }
}
