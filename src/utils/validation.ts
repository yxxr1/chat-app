import { RuleObject } from 'antd/es/form';

export const validateName = (name?: string | null) => name && /^[a-zA-Zа-яА-Я0-9]{3,12}$/.test(name);

export const nameValidator = (rule: RuleObject, value: string) => (validateName(value) ? Promise.resolve() : Promise.reject());
