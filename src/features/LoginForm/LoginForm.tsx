import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { nameValidator } from '@utils/validation';
import { getTheme } from '@utils/theme';
import { authUser } from './api/auth';
import styles from './styles.module.scss';
import { Container } from './styled';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    dispatch(authUser(name, { theme: getTheme() }));
  }, [form]);

  return (
    <Container>
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
    </Container>
  );
};
