import { exec } from "@actions/exec";
import {setFailed, setOutput, warning} from "@actions/core";

export class PlaywrightTestSharded {
    async setupPlaywright() {
        try {
            await exec('npm ci');
        } catch (error: any) {
            warning('npm ci failed. Running npm install instead');
            await exec('npm install');
        }

        try {
            await exec('npx playwright install');
        } catch (error: any) {
            setFailed(error.message);
        }
    }

    async runTests(scope: string, index: number, total: number) {
        try {
            await exec('npx playwright test ' + scope + ' --shard=' + index + '/' + total);
        } catch(error: any) {
            setFailed(error.message);
        } finally {
            setOutput('report', 'report-directory');
        }
    }
}