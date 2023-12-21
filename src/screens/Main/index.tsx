import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio } from 'antd';
import { State, User, UserSettings, Chat as ChatType, Message } from '@store/types';
import { Header } from '@components/Header';
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
    lastMessageId: Message['id'],
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
  const [isShowSettingsModal, setIsShowSettingsModal] = useState(false);

  const onSettings = useCallback(() => {
    setIsShowSettingsModal(true);
  }, []);
  const onSettingsSave = useCallback(() => {
    const { name, connectionMethod } = form.getFieldsValue();
    props.setUser(name, { connectionMethod });
    setIsShowSettingsModal(false);
  }, []);

  const initialValues = useMemo(
    () => ({
      name: user.name,
      connectionMethod: user.settings.connectionMethod,
    }),
    [user],
  );

  const onModalOk = useCallback(() => form.submit(), [form]);
  const onModalCancel = useCallback(() => setIsShowSettingsModal(false), []);
  const onModalChange = useCallback(
    (open: boolean) => {
      if (open) {
        form.resetFields();
      }
    },
    [form],
  );

  return (
    <>
      <Header userName={user.name} userId={user.id} onLogout={onLogout} onSettings={onSettings} />
      <div className={styles.container}>
        <ChatList />
        <Chat />
      </div>
      <Modal
        open={isShowSettingsModal}
        title="Settings"
        okText="OK"
        okType="primary"
        onOk={onModalOk}
        onCancel={onModalCancel}
        afterOpenChange={onModalChange}
      >
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
      </Modal>
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
