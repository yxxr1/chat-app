export const requestPermission = () => Notification?.requestPermission();

export const hasNotificationPermission = () => Notification?.permission === 'granted';

export const sendNotification = (title: string, body: string) => new Notification(title, { body });
