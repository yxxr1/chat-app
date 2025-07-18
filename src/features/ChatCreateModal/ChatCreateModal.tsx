import React, { useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, InputRef, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { nameValidator } from '@utils/validation';
import { createChat } from './api/createChat';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ChatCreateModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    >
      <Form form={form} onFinish={onCreateSubmit}>
        <Form.Item
          name="name"
          label={t('form.name')}
          validateTrigger="onBlur"
          rules={[{ required: true, validator: nameValidator, message: t('form.enterCorrectChatName') }]}
        >
          <Input ref={inputRef} autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
};
