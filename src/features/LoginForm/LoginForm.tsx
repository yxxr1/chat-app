import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { nameValidator } from '@/shared/utils/validation';
import { login } from './api/login';
import { registration } from './api/registration';
import styles from './styles.module.scss';
import { Container } from './styled';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    const password = form.getFieldValue('password');
    const isNewUser = form.getFieldValue('isNewUser');
    dispatch((isNewUser ? registration : login)(name, password));
  }, [form]);
  const onLogin = useCallback(() => {
    form.setFieldValue('isNewUser', false);
    form.submit();
  }, []);
  const onRegistration = useCallback(() => {
    form.setFieldValue('isNewUser', true);
    form.submit();
  }, []);

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
            <Input data-testid="LoginForm_name" autoFocus />
          </Form.Item>
          <Form.Item name="password" label={t('form.password')}>
            <Input type="password" data-testid="LoginForm_password" />
          </Form.Item>

          <div className={styles.buttons}>
            <Button type="primary" onClick={onLogin}>
              {t('form.login')}
            </Button>
            <Button data-testid="LoginForm_submit" type="primary" onClick={onRegistration}>
              {t('form.registration')}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
