import { ROUTES } from "@/core/routes/route-constants";
import { Button } from "@/shared/components/button";
import { TextInput } from "@/shared/components/form";
import { Form } from "@/shared/components/ui/form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useTranslation } from "@/shared/hooks/use-translation";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../service/login.mutation";
import { loginResolver, type LoginFormValues } from "./login.schema";

export const LoginScreen = () => {
  const t = useTranslation("login");
  const methods = useForm<LoginFormValues>({
    resolver: loginResolver,
  });

  const [showPassword, setShowPassword] = useToggle();

  const navigate = useRouter();
  const redirectToRegister = () => {
    navigate.push(ROUTES.REGISTER);
  };

  const login = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => {
    login.mutateAsync(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-card-foreground">
            {t("title")}
          </h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <div className="space-y-4">
          <TextInput
            name={"email"}
            placeholder={t("form.emailPlaceholder")}
            label={t("form.emailLabel")}
            autoFocus
            required
            type="email"
          />

          <TextInput
            name={"password"}
            placeholder={t("form.passwordPlaceholder")}
            autoComplete="current-password"
            label={t("form.passwordLabel")}
            type={showPassword ? "text" : "password"}
            required
            symbol={
              <Button
                onClick={setShowPassword}
                variant={"ghost"}
                type="button"
                autoFocus={false}
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </Button>
            }
          />
          <Button type="button" variant={"link"} disabled>
            {t("actions.forgotPassword")}
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Button type="submit" className="w-full">
            {t("actions.submit")}
          </Button>

          <Button type="button" variant={"link"} onClick={redirectToRegister}>
            {t("actions.createAccount")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
