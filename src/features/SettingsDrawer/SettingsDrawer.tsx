import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { CheckboxProps } from 'antd';
import { Button, Drawer, Form, Input, Radio, Select, Checkbox, Divider } from 'antd';
import { AiOutlineLogout } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { nameValidator } from '@/shared/utils/validation';
import { requestPermission } from '@/shared/utils/notification';
import { AVAILABLE_LANGUAGES } from '@/shared/i18n';
import { useTheme } from '@/shared/utils/theme';
import { UI_THEMES, CONNECTION_METHODS } from '@/shared/const/settings';
import type { State, User } from '@/shared/store/types';
import { logoutUser } from './api/logoutUser';
import { setUser } from './api/setUser';
import styles from './styles.module.scss';

export type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const SettingsDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const user = useSelector<State, User>((state) => (state.user as User) || {});
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const onLogout = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  const [form] = Form.useForm();

  const onSettingsSave = useCallback(() => {
    if (form.isFieldsTouched()) {
      const { name, ...settings } = form.getFieldsValue();
      dispatch(setUser(name, settings));
    }
  }, []);

  const initialValues = useMemo(
    () => ({
      name: user.username,
      ...user.settings,
    }),
    [user],
  );

  const onSettingsDrawerClose = useCallback(() => {
    form.submit();
    onClose();
  }, [form]);
  const onSettingsDrawerChange = useCallback(
    (open: boolean) => {
      if (open) {
        form.resetFields();
      }
    },
    [form],
  );

  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(initialValues.isNotificationsEnabled);
  const onNotificationChange = useCallback<Required<CheckboxProps>['onChange']>(async ({ target: { checked } }) => {
    setIsNotificationsEnabled(checked);

    if (checked && (await requestPermission()) !== 'granted') {
      form.setFieldValue('isNotificationsEnabled', false);
      setIsNotificationsEnabled(false);
    }
  }, []);

  const theme = useTheme();

  return (
    <Drawer
      title={t('settings.title')}
      placement="right"
      open={isOpen}
      onClose={onSettingsDrawerClose}
      afterOpenChange={onSettingsDrawerChange}
    >
      <div className={styles['settings-header']}>
        <Form.Item label={t('settings.userId')}>{user.id}</Form.Item>
        <Button
          data-testid="SettingsDrawer_logoutButton"
          className={styles['logout-button']}
          type="link"
          title={t('settings.logout')}
          onClick={onLogout}
        >
          <AiOutlineLogout color={theme.primary} size={22} />
        </Button>
      </div>
      <Form form={form} initialValues={initialValues} onFinish={onSettingsSave}>
        <Form.Item
          name="name"
          label={t('form.name')}
          validateTrigger="onBlur"
          rules={[{ required: true, validator: nameValidator, message: t('form.enterCorrectUserName') }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="connectionMethod"
          label={t('settings.connectionMethod')}
          layout="vertical"
          className={styles['settings-connection-methods']}
        >
          <Radio.Group>
            <Radio.Button value={CONNECTION_METHODS.HTTP}>HTTP</Radio.Button>
            <Radio.Button value={CONNECTION_METHODS.WS}>WebSocket</Radio.Button>
            <Radio.Button value={CONNECTION_METHODS.SSE}>SSE</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="theme" label={t('settings.theme.title')}>
          <Radio.Group>
            <Radio.Button value={UI_THEMES.LIGHT}>{t('settings.theme.light')}</Radio.Button>
            <Radio.Button value={UI_THEMES.DARK}>{t('settings.theme.dark')}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Divider />
        <Form.Item name="isNotificationsEnabled" valuePropName="checked" label={t('settings.notifications.enableNotifications')}>
          <Checkbox checked={isNotificationsEnabled} onChange={onNotificationChange} />
        </Form.Item>
        <Form.Item name="isShowNotificationMessageText" valuePropName="checked" label={t('settings.notifications.showMessageText')}>
          <Checkbox disabled={!isNotificationsEnabled} />
        </Form.Item>
        <Divider />
        <Form.Item label={t('settings.language')}>
          <Select value={i18n.language} onChange={(lang) => i18n.changeLanguage(lang)} options={AVAILABLE_LANGUAGES} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
