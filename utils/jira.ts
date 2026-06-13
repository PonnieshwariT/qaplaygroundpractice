import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';

dotenv.config();

export async function createJiraBug(
  testName: string,
  browser: string,
  error: string
) {
  try {
    const response = await axios.post(
      `${process.env.JIRA_BASE_URL}/rest/api/3/issue`,
      {
        fields: {
          project: {
            key: process.env.JIRA_PROJECT_KEY
          },
          summary: `[Playwright Failure] ${testName}`,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    text:
                      `Test: ${testName}\nBrowser: ${browser}\n\nFailure:\n${error}`,
                    type: 'text'
                  }
                ]
              }
            ]
          },
          issuetype: {
            name: 'Bug'
          }
        }
      },
      {
        auth: {
          username: process.env.JIRA_EMAIL!,
          password: process.env.JIRA_API_TOKEN!
        }
      }
    );

    console.log('Jira Bug Created:', response.data.key);

    return response.data.key;
  } catch (err: any) {
    console.log(err.response?.data || err.message);
  }
}

export async function linkBugToStory(bugKey: string) {
  await axios.post(
    `${process.env.JIRA_BASE_URL}/rest/api/3/issueLink`,
    {
      type: {
        name: 'Relates'
      },
      inwardIssue: {
        key: bugKey
      },
      outwardIssue: {
        key: process.env.JIRA_PARENT_ISSUE
      }
    },
    {
      auth: {
        username: process.env.JIRA_EMAIL!,
        password: process.env.JIRA_API_TOKEN!
      }
    }
  );

  console.log(`${bugKey} linked to ${process.env.JIRA_PARENT_ISSUE}`);
}

export async function attachFile(
  issueKey: string,
  filePath: string
) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  const form = new FormData();

  form.append(
    'file',
    fs.createReadStream(filePath)
  );

  await axios.post(
    `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${issueKey}/attachments`,
    form,
    {
      headers: {
        ...form.getHeaders(),
        'X-Atlassian-Token': 'no-check'
      },
      auth: {
        username: process.env.JIRA_EMAIL!,
        password: process.env.JIRA_API_TOKEN!
      }
    }
  );

  console.log(`Attached: ${filePath}`);
}