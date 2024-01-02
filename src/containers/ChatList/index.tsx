import React, { useState, useCallback, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Form, Button, Radio, InputRef } from 'antd';
import { AiOutlineSetting } from 'react-icons/ai';
import { State, Chat } from '@store/types';
import { setCurrentChat } from '@actions/sync';
import { createChat } from '@actions/async';
import { ChatItem } from '@components/ChatItem';
import { nameValidator } from '@utils/validation';
import { useTheme } from '@utils/theme';
import { List } from './styled';
import styles from './styles.module.scss';

export interface Props {
  allChats: Chat[];
  joinedChats: Chat[];
  currentChatId: Chat['id'] | null;
  onSettingsClick: () => void;
  setCurrentChat: (id: string | null) => void;
  createChat: (name: string) => void;
}

const _ChatList: React.FC<Props> = ({ allChats, joinedChats, currentChatId, onSettingsClick, ...props }) => {
  const [form] = Form.useForm();

  const [currentTab, setCurrentTab] = useState(0);
  const [isShowCreateModal, setIsShowCreateModal] = useState(false);

  const list = useMemo(() => (currentTab ? joinedChats : allChats), [currentTab, joinedChats, allChats]);

  const onChatClick = useCallback((id: string) => {
    props.setCurrentChat(id);
  }, []);

  const onCreateClick = useCallback(() => {
    setIsShowCreateModal(true);
  }, []);

  const onCreateSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    props.createChat(name);
    setIsShowCreateModal(false);
  }, [form]);

  const inputRef = useRef<InputRef>(null);

  const onModalChange = useCallback(
    (open: boolean) => {
      if (!open) {
        form.resetFields();
      } else {
        inputRef?.current?.focus();
      }
    },
    [form, inputRef],
  );

  const theme = useTheme();

  return (
    <>
      <List>
        <div className={styles['action-buttons']}>
          <Button className={styles['settings-button']} type="link" title="Settings" onClick={onSettingsClick}>
            <AiOutlineSetting color={theme.primary} size={22} />
          </Button>
          <Button className={styles['create-button']} onClick={onCreateClick}>
            Create chat
          </Button>
        </div>

        <Radio.Group className={styles.filter} value={currentTab} onChange={(e) => setCurrentTab(e.target.value)}>
          <Radio.Button value={0}>All</Radio.Button>
          <Radio.Button value={1}>Joined</Radio.Button>
        </Radio.Group>
        <div>
          {list.map((chat) => (
            <ChatItem
              key={chat.id}
              name={chat.name}
              lastMessage={chat.messages.slice(-1)[0] ?? null}
              isCurrent={currentChatId === chat.id}
              onClick={() => onChatClick(chat.id)}
            />
          ))}
        </div>
      </List>

      <Modal
        open={isShowCreateModal}
        title="Enter name"
        okText="Create"
        okType="primary"
        onOk={() => form.submit()}
        onCancel={() => setIsShowCreateModal(false)}
        afterOpenChange={onModalChange}
      >
        <Form form={form} onFinish={onCreateSubmit}>
          <Form.Item
            name="name"
            label="Name"
            validateTrigger="onBlur"
            rules={[{ required: true, validator: nameValidator, message: 'Please enter correct chat name' }]}
          >
            <Input ref={inputRef} autoFocus />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const selector = (state: State) => ({
  allChats: Object.values(state.allChats),
  joinedChats: state.joinedChatsIds.map((chatId) => state.allChats[chatId]),
  currentChatId: state.currentChatId,
});

export const ChatList = connect(selector, {
  setCurrentChat,
  createChat,
})(_ChatList);
