export type CreateWebhooks = {
  url: string;
  subscribedEvents: Array<string>;
  isActive: boolean;
};
