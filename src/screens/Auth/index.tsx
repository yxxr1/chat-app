import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { setUser } from '@actions/async/setUser';
import styles from './styles.module.scss';

type Props = {
  setUser: (name: string) => void;
};

const _Auth: React.FC<Props> = (props) => {
  const [form] = Form.useForm();

  const onSubmit = useCallback(() => {
    const name = form.getFieldValue('name');
    props.setUser(name);
  }, [form]);

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onSubmit}>
        <h1 className={styles.title}>Welcome to Chat</h1>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter user name' }]}>
          <Input autoFocus />
        </Form.Item>

        <Button className={styles.button} onClick={() => form.submit()}>
          Enter
        </Button>
      </Form>
    </div>
  );
};

export const Auth = connect(null, { setUser })(_Auth);
