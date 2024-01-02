import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Radio, Drawer, Button } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai';
import { State, User, UserSettings, Chat as ChatType, Message } from '@store/types';
import { ChatList } from '@containers/ChatList';
import { Chat } from '@containers/Chat';
import { authUser, setUser, getChats, watchChatsUpdates, subscribeChat } from '@actions/async';
import { addChats, deleteChats, addMessages, addSubscribedChats } from '@actions/sync';
import { nameValidator } from '@utils/validation';
import { CONNECTION_METHODS } from '@const/settings';
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
};

export const _Main: React.FC<Props> = ({ user, ...props }) => {
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
      const { name, connectionMethod } = form.getFieldsValue();
      props.setUser(name, { connectionMethod });
    }
  }, []);

  const initialValues = useMemo(
    () => ({
      name: user.name,
      connectionMethod: user.settings.connectionMethod,
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

  return (
    <>
      <div className={styles.container}>
        <ChatList onSettingsClick={onSettings} />
        <Chat />
      </div>
      <Drawer
        title="Settings"
        placement="right"
        open={isShowSettingsDrawer}
        onClose={onSettingsDrawerClose}
        afterOpenChange={onSettingsDrawerChange}
      >
        <div className={styles['settings-header']}>
          <Form.Item label={'User ID'}>{user.id}</Form.Item>
          <Button type="link" title="Logout" onClick={onLogout}>
            <AiOutlineLogout size={22} />
          </Button>
        </div>
        <Form form={form} initialValues={initialValues} onFinish={onSettingsSave}>
          <Form.Item
            name="name"
            label="Name"
            validateTrigger="onBlur"
            rules={[{ required: true, validator: nameValidator, message: 'Please enter correct user name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="connectionMethod" label="Connection method">
            <Radio.Group>
              <Radio.Button value={CONNECTION_METHODS.HTTP}>HTTP</Radio.Button>
              <Radio.Button value={CONNECTION_METHODS.WS}>WebSocket</Radio.Button>
            </Radio.Group>
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
})(_Main);
