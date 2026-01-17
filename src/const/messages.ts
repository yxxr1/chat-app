export const MESSAGE_DIRECTIONS = {
  PREV: 'PREV',
  NEXT: 'NEXT',
} as const;
export type MessagesDirections = (typeof MESSAGE_DIRECTIONS)[keyof typeof MESSAGE_DIRECTIONS];
