import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Radio, Drawer, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { AiOutlineLogout } from 'react-icons/ai';
import { AVAILABLE_LANGUAGES } from '@i18n';
import { State, User, UserSettings, Chat as ChatType, Message } from '@store/types';
import { ChatList } from '@containers/ChatList';
import { Chat } from '@containers/Chat';
import { authUser, setUser, getChats, watchChatsUpdates, subscribeChat } from '@actions/async';
import { addChats, deleteChats, addMessages, addSubscribedChats, updateChat } from '@actions/sync';
import { nameValidator } from '@utils/validation';
import { CONNECTION_METHODS, UI_THEMES } from '@const/settings';
import { useTheme } from '@utils/theme';
import { useSubscribe } from './use-subscribe';
import styles from './styles.module.scss';

export type Props = {
  user: User;
  joinedChatsIds: ChatType['id'][];
  subscribedChatsIds: ChatType['id'][];
  authUser: (userName: string | null) => void;
  setUser: (name: User['name'], settings: UserSettings) => void;
  getChats: () => void;
  watchChatsUpdates: (signal: AbortSignal) => void;
  subscribeChat: (
    chatId: ChatType['id'],
    lastMessageId: Message['id'] | null,
    callback: (isFailure: boolean) => void,
    signal: AbortSignal,
  ) => void;
  addChats: (chats: ChatType[]) => void;
  deleteChats: (chatsIds: ChatType['id'][]) => void;
  addMessages: (messages: Message[], id: ChatType['id']) => void;
  addSubscribedChats: (chatsIds: ChatType['id'][]) => void;
  updateChat: (chat: ChatType) => void;
};

export const _Main: React.FC<Props> = ({ user, ...props }) => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    props.getChats();
  }, []);

  useSubscribe({ user, ...props });

  const onLogout = useCallback(() => {
    props.authUser(null);
  }, []);

  const [form] = Form.useForm();

  const onSettingsSave = useCallback(() => {
    if (form.isFieldsTouched()) {
      const { name, connectionMethod, theme } = form.getFieldsValue();
      props.setUser(name, { connectionMethod, theme });
    }
  }, []);

  const initialValues = useMemo(
    () => ({
      name: user.name,
      connectionMethod: user.settings.connectionMethod,
      theme: user.settings.theme,
    }),
    [user],
  );

  const [isShowSettingsDrawer, setIsShowSettingsDrawer] = useState(false);
  const onSettings = useCallback(() => {
    setIsShowSettingsDrawer(true);
  }, []);
  const onSettingsDrawerClose = useCallback(() => {
    form.submit();
    setIsShowSettingsDrawer(false);
  }, [form]);
  const onSettingsDrawerChange = useCallback(
    (open: boolean) => {
      if (open) {
        form.resetFields();
      }
    },
    [form],
  );

  const theme = useTheme();

  return (
    <>
      <div className={styles.container}>
        <ChatList onSettingsClick={onSettings} />
        <Chat />
      </div>
      <Drawer
        title={t('settings.title')}
        placement="right"
        open={isShowSettingsDrawer}
        onClose={onSettingsDrawerClose}
        afterOpenChange={onSettingsDrawerChange}
      >
        <div className={styles['settings-header']}>
          <Form.Item label={t('settings.userId')}>{user.id}</Form.Item>
          <Button className={styles['logout-button']} type="link" title={t('settings.logout')} onClick={onLogout}>
            <AiOutlineLogout color={theme.primary} size={22} />
          </Button>
        </div>
        <Form form={form} initialValues={initialValues} onFinish={onSettingsSave}>
          <Form.Item
            name="name"
            label={t('form.name')}
            validateTrigger="onBlur"
            rules={[{ required: true, validator: nameValidator, message: t('form.enterCorrectUserName') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="connectionMethod" label={t('settings.connectionMethod')}>
            <Radio.Group>
              <Radio.Button value={CONNECTION_METHODS.HTTP}>HTTP</Radio.Button>
              <Radio.Button value={CONNECTION_METHODS.WS}>WebSocket</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="theme" label={t('settings.theme.title')}>
            <Radio.Group>
              <Radio.Button value={UI_THEMES.LIGHT}>{t('settings.theme.light')}</Radio.Button>
              <Radio.Button value={UI_THEMES.DARK}>{t('settings.theme.dark')}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={t('settings.language')}>
            <Select value={i18n.language} onChange={(lang) => i18n.changeLanguage(lang)} options={AVAILABLE_LANGUAGES} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

const selector = ({ user, joinedChatsIds, subscribedChatsIds }: State) => ({
  user: user as User,
  joinedChatsIds,
  subscribedChatsIds,
});

export const Main = connect(selector, {
  authUser,
  setUser,
  getChats,
  watchChatsUpdates,
  subscribeChat,
  addChats,
  deleteChats,
  addMessages,
  addSubscribedChats,
  updateChat,
})(_Main);
