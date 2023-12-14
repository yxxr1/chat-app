import React, { useCallback, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, Radio } from 'antd';
import { State, User, UserSettings } from '@store/types';
import { Header } from '@components/Header';
import { ChatList } from '@containers/ChatList';
import { Chat } from '@containers/Chat';
import { authUser } from '@actions/async/auth';
import { setUser } from '@actions/async/setUser';
import styles from './styles.module.scss';

type Props = {
  user: User;
  authUser: (userName: string | null) => void;
  setUser: (name: User['name'], settings: UserSettings) => void;
};

export const _Main: React.FC<Props> = ({ user, ...props }) => {
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
        onOk={() => form.submit()}
        onCancel={() => setIsShowSettingsModal(false)}
        afterOpenChange={onModalChange}
      >
        <Form form={form} initialValues={initialValues} onFinish={onSettingsSave}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter user name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="connectionMethod" label="Connection method">
            <Radio.Group>
              <Radio.Button value="http">HTTP</Radio.Button>
              <Radio.Button value="ws">WebSocket</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const selector = ({ user }: State) => ({
  user: user as User,
});

export const Main = connect(selector, { authUser, setUser })(_Main);
