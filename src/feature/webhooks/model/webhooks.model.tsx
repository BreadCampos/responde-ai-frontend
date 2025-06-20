export type WebhooksModel = {
  id: string;
  url: string;
  subscribedEvents: string[];
  retryPolicy: "fixed" | "exponential";
  createdAt: string;
  isActive: boolean;
  maxRetries: number;
};
