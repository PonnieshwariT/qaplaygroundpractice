import { execSync } from 'child_process';

function runTests(browser: string, outputDir: string) {
  execSync(`npx playwright test --project=${browser} --output=${outputDir}`, { stdio: 'inherit' });
}

runTests('chrome', 'results/chrome');
runTests('edge', 'results/edge');

execSync(`npx playwright merge-reports results/chrome results/edge --reporter=html`, { stdio: 'inherit' });

console.log('Unified HTML report generated at playwright-report/index.html');
