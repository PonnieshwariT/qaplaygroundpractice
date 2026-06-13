import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import { createJiraBug, linkBugToStory } from '../utils/jira';
import { attachFile } from '../utils/jira';

class JiraReporter implements Reporter {
  async onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== 'failed') return;

    const browser = test.parent.project()?.name || 'unknown';

    const error =
      result.errors?.map(e => e.message).join('\n') ||
      'Unknown error';

    const bugKey = await createJiraBug(
  test.title,
  browser,
  error
);

if (bugKey) {
  await linkBugToStory(bugKey);
}

for (const attachment of result.attachments) {
  if (attachment.path) {
    await attachFile(
      bugKey,
      attachment.path
    );
  }
}
  }
}

export default JiraReporter;