import React, { useCallback, useRef } from 'react';
import type { InputRef } from 'antd';
import { Form, Input, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/store';
import { nameValidator } from '@/shared/utils/validation';
import { createChat } from './api/createChat';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChatCreateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();
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
  const onCreateSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    dispatch(createChat(name));
    onClose();
  }, [form]);

  return (
    <Modal
      open={isOpen}
      title={t('createChat')}
      okText={t('form.create')}
      okType="primary"
      cancelText={t('form.cancel')}
      onOk={() => form.submit()}
      onCancel={onClose}
      afterOpenChange={onModalChange}
      okButtonProps={{ 'data-testid': 'ChatCreateModal_submit' }}
    >
      <Form form={form} onFinish={onCreateSubmit}>
        <Form.Item
          name="name"
          label={t('form.name')}
          validateTrigger="onBlur"
          rules={[{ required: true, validator: nameValidator, message: t('form.enterCorrectChatName') }]}
        >
          <Input data-testid="ChatCreateModal_input" ref={inputRef} autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};
