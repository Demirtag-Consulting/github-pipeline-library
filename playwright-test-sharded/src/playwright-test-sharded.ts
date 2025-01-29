import {exec, getExecOutput} from "@actions/exec";
import {setFailed, setOutput, warning} from "@actions/core";

export class PlaywrightTestSharded {
    async setupPlaywright() {
        try {

            await exec('npm ci', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
        } catch (error: any) {
            warning('npm ci failed. Running npm install instead');
            await exec('npm install', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
        }

        try {
            await exec('npx playwright install chromium --with-deps', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
        } catch (error: any) {
            setFailed(error.message);
        }

        try {
            // await exec('npx playwright install-deps', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
        } catch (error: any) {
            setFailed(error.message);
        }
    }

    async runTests(scope: string, index: number, total: number) {
        let report: string = '';
        try {
            await exec('npm i', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
            await exec('ls', [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
            const response = await getExecOutput(`npx playwright test ${scope} --shard=${index}/${total} --reporter=html`, [], {cwd: './sample-projects/sample-playwright-hyperscaled'});
            await exec('ls -lR', [], {cwd: './sample-projects/sample-playwright-hyperscaled/test-results'});
            report = response.stdout;
        } catch(error: any) {
            setFailed(error.message);
        } finally {
            setOutput('report', report);
        }
    }
}