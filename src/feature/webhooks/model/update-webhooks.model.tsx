export type UpdateWebhooks = {
  url: string;
  subscribedEvents: Array<string>;
  isActive: boolean;
};
