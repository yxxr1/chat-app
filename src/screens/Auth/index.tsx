import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { authUser } from '@actions/async';
import { nameValidator } from '@utils/validation';
import styles from './styles.module.scss';

type Props = {
  authUser: (name: string) => void;
};

const _Auth: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    props.authUser(name);
  }, [form]);

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onSubmit}>
        <Typography.Title className={styles.title}>{t('welcomeToChat')}</Typography.Title>
        <Form.Item
          name="name"
          label={t('form.name')}
          validateTrigger="onBlur"
          rules={[{ validator: nameValidator, message: t('form.enterCorrectUserName') }]}
        >
          <Input autoFocus />
        </Form.Item>

        <Button type="primary" className={styles.button} onClick={() => form.submit()}>
          {t('form.enter')}
        </Button>
      </Form>
    </div>
  );
};

export const Auth = connect(null, { authUser })(_Auth);
