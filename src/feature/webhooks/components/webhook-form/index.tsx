import { SelectMultipleInput, TextInput } from "@/shared/components/form";
import { WebhookEvents } from "../../constants";

export const WebhookForm = () => {
  const eventOptions = Object.values(WebhookEvents).map((event) => ({
    value: event as string,
    label: event as string,
  }));

  return (
    <div className="flex flex-col gap-2 p-1">
      <TextInput name={"url"} label={"Url"} placeholder="url do webhook" />
      <SelectMultipleInput
        options={eventOptions}
        name={"subscribedEvents"}
        label={"Eventos"}
      />
    </div>
  );
};
