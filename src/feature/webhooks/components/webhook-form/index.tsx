import { SelectMultipleInput, TextInput } from "@/shared/components/form";
import { useTranslation } from "react-i18next";
import { WebhookEvents } from "../../constants";

export const WebhookForm = () => {
  const eventOptions = Object.values(WebhookEvents).map((event) => ({
    value: event as string,
    label: event as string,
  }));

  const { t } = useTranslation("webhook");

  return (
    <div className="flex flex-col gap-2 p-1">
      <TextInput
        name={"url"}
        label={t("createWebhook.fields.url.label")}
        placeholder={t("createWebhook.fields.url.placeholder")}
      />
      <SelectMultipleInput
        options={eventOptions}
        name={"subscribedEvents"}
        label={t("createWebhook.fields.subscribedEvents.label")}
        placeholder={t("createWebhook.fields.subscribedEvents.placeholder")}
      />
    </div>
  );
};
