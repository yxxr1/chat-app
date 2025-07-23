const { expect, browser, $ } = require('@wdio/globals');

const getRandom = () => Math.random().toString().substr(2, 4);
const getSelector = (id) => `*[data-testid=${id}]`;
const getTextSelector = (text) => `*=${text}`;

describe('Chat-app', () => {
  const userName = `testUser${getRandom()}`;
  const chatName = `testChat${getRandom()}`;
  const testMessageText = `test message ${getRandom()}`;

  it('Login', async () => {
    await browser.url('http://localhost:3000/');
    await $(getSelector('LoginForm_name')).setValue(userName);
    await $(getSelector('LoginForm_submit')).click();

    await expect($(getSelector('ChatList_createChat'))).toBeExisting();
  });

  it('Create chat', async () => {
    await $(getSelector('ChatList_createChat')).click();
    await $(getSelector('ChatCreateModal_input')).setValue(chatName);
    await $(getSelector('ChatCreateModal_submit')).click();

    await expect($(getTextSelector(chatName))).toBeExisting();
  });

  it('Add message', async () => {
    await $(getTextSelector(chatName)).click();
    const input = await $(getSelector('MessageInput_input'));
    expect(input).toBeExisting();
    await input.setValue(testMessageText);
    await $(getSelector('MessageInput_submit')).click();
    await expect($(getTextSelector(testMessageText))).toBeExisting();
  });

  it('Leave chat', async () => {
    await $(getSelector('Chat_leaveButton')).click();
    await expect($(getTextSelector(chatName))).not.toBeExisting();
  });
});
