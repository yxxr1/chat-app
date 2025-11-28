export type WSMessage<Type extends string = string, Payload extends object = object> = {
  type: Type;
  payload: Payload;
};
export type GetPayloadByType<T extends WSMessage, Type extends string> = Extract<T, { type: Type }>['payload'];
