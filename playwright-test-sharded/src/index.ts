import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run() {
    try {
        const scope = core.getInput('scope');
        const testRepository = core.getInput('test-repository') || 'playwright-tests';
    } catch (error: any) {
        core.setFailed(error.message);
    }
}