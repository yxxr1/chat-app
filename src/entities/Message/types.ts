import type { Message } from '@/store';

export type MessageWithSender = Message & { fromName: string };
