import * as exec from "@actions/exec";
import * as core from "@actions/core";

export class PlaywrightTestSharded {
    async setupPlaywright() {
        try {
            await exec.exec('npm ci');
        } catch (error: any) {
            core.warning('npm ci failed. Running npm install instead');
            await exec.exec('npm install');
        }

        try {
            await exec.exec('npx playwright install');
        } catch (error: any) {
            core.setFailed(error.message);
        }
    }

    async runTests(scope: string, index: number, total: number) {
        try {
            await exec.exec('npx playwright test ' + scope + ' --shard=' + index + '/' + total);
        } catch(error: any) {
            core.setFailed(error.message);
        } finally {
            core.setOutput('report', 'report-directory');
        }
    }
}