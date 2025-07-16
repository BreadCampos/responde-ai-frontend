import { TextInput } from "@/shared/components/form";
import { useTranslation } from "@/shared/hooks/use-translation";

export const RegisterUser = () => {
  const { t } = useTranslation("login");
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{t("register.user.title")}</h3>
      <TextInput
        name="user.firstName"
        label={t("register.user.fields.firstName")}
      />
      <TextInput
        name="user.lastName"
        label={t("register.user.fields.lastName")}
      />
      <TextInput
        name="user.email"
        label={t("register.user.fields.email")}
        type="email"
      />
      <TextInput
        name="user.password"
        label={t("register.user.fields.password")}
        type="password"
      />
      <TextInput
        label={t("register.user.fields.passwordConfirmation")}
        name="user.passwordConfirmation"
        type="password"
      />
    </div>
  );
};
