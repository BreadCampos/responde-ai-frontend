"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import { TextInput } from "@/shared/components/form";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useTranslation } from "@/shared/hooks/use-translation";
import { ChevronLeft, Eye, EyeClosed } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../service/login.mutation";
import { loginResolver, type LoginFormValues } from "./login.schema";

export const LoginScreen = () => {
  const { t, ready } = useTranslation("login");
  const methods = useForm<LoginFormValues>({
    resolver: loginResolver,
  });

  const navigate = useNavigation();

  const [showPassword, setShowPassword] = useToggle();

  const redirectToRegister = () => {
    navigate.push(ROUTES.REGISTER);
  };

  const login = useLoginMutation();

  const onSubmit = (data: LoginFormValues) => {
    login.mutateAsync(data);
  };

  const searchParams = useSearchParams();
  const paymentSuccess = searchParams.get("payment_success"); // Retorna a string "true" ou null

  useEffect(() => {
    if (paymentSuccess === "true" && ready) {
      toast.success(t("login.successPayment"));
    }
  }, [paymentSuccess, ready, t]);

  const handleBack = () => {
    navigate.push(ROUTES.HOME);
  };
  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6 text-center">
          <div className="flex mr-12">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="icon"
              className={cn(
                "text-card-foreground",
                "absolute left-2 top-1/2 -translate-y-1/2",
                "md:static md:translate-y-0"
              )}
            >
              <ChevronLeft />
            </Button>
            <h1 className="text-2xl font-bold text-center w-full text-card-foreground">
              {t("login.title")}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
        </div>
        <div className="space-y-4">
          <TextInput
            name={"email"}
            placeholder={t("login.form.emailPlaceholder")}
            label={t("login.form.emailLabel")}
            autoFocus
            required
            type="email"
          />

          <TextInput
            name={"password"}
            placeholder={t("login.form.passwordPlaceholder")}
            autoComplete="current-password"
            label={t("login.form.passwordLabel")}
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
            {t("login.actions.forgotPassword")}
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-2">
          <Button type="submit" className="w-full">
            {t("login.actions.submit")}
          </Button>

          <Button type="button" variant={"link"} onClick={redirectToRegister}>
            {t("login.actions.createAccount")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
