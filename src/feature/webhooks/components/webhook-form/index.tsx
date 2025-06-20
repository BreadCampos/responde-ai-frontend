import { SelectMultipleInput, TextInput } from "@/shared/components/form";

export const WebhookForm = () => {
  const options = [{ value: "*", label: "Todos" }];
  return (
    <div className="flex flex-col gap-2">
      <TextInput name={"url"} label={"Url"} placeholder="url do webhook" />
      <SelectMultipleInput
        options={options}
        name={"subscribedEvents"}
        label={"Eventos"}
      />
    </div>
  );
};
