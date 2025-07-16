import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { ModalSelectPlan } from "@/feature/users/components/modal-select-plan";
import { Button } from "@/shared/components/button";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { Drawer, DrawerContent } from "@/shared/components/ui/drawer";
import usePersistentState from "@/shared/hooks/use-persist";
import { useScreenSize } from "@/shared/hooks/use-screen-size";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useTranslation } from "@/shared/hooks/use-translation";
import { Menu } from "lucide-react";
import { useMemo } from "react";
import { SidebarHeader } from "../sidebar";

export const Header = () => {
  const { user, company } = useAuthStore();

  const { isMobile } = useScreenSize();

  const [isCollapsed, setIsCollapsed] = usePersistentState(
    "sidebar-collapsed",
    false
  );

  const { t } = useTranslation("common");

  const remainingTime = useMemo(() => {
    if (!user?.planRenewAt) return null;

    const renewalDate = new Date(user.planRenewAt);
    const today = new Date();

    // Retorna nulo se a data for inválida
    if (isNaN(renewalDate.getTime())) {
      return null;
    }

    const diffTime = renewalDate.getTime() - today.getTime();

    // Se o tempo já expirou, retorna 0
    if (diffTime <= 0) {
      // Você pode querer uma mensagem específica para plano expirado
      return t("header.freePlan", { time: "0 dias" });
    }

    // Constantes para legibilidade
    const msInADay = 1000 * 60 * 60 * 24;
    const msInAnHour = 1000 * 60 * 60;

    // Calcula os dias inteiros
    const days = Math.floor(diffTime / msInADay);

    // Calcula as horas restantes do que "sobrou" dos dias
    const remainingMs = diffTime % msInADay;
    const hours = Math.floor(remainingMs / msInAnHour);

    // Monta a string de tempo final
    const timeString = `${days} dias e ${hours} horas`;

    return t("header.freePlan", {
      time: timeString,
    });
  }, [user?.planRenewAt, t]);

  const [selectPlan, toggleSelectPlan] = useToggle(false);
  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <header className="bg-card text-foreground shadow-md px-4 py-2 z-10 transition-all">
      <div className="flex items-center justify-end gap-2">
        {user?.plan === "free" && (
          <Button
            variant={"link"}
            className="text-destructive"
            size="sm"
            onClick={toggleSelectPlan}
          >
            {remainingTime}
          </Button>
        )}
        <span className="text-card-foreground font-medium flex gap-2">
          {company?.fantasyName || company?.legalName || user?.firstName}
        </span>

        <LanguageSwitcher />
        <ThemeToggleButton />
        {isMobile && (
          <Drawer
            direction="right"
            open={isCollapsed}
            onOpenChange={toggleDrawer}
          >
            <Button
              size={"icon"}
              variant="ghost"
              onClick={toggleDrawer}
              className="text-card-foreground"
            >
              <Menu />
            </Button>
            <DrawerContent className="p-4 h-full">
              <SidebarHeader
                isCollapsed={false}
                onClose={toggleDrawer}
                onSelect={toggleDrawer}
              />
            </DrawerContent>
          </Drawer>
        )}
      </div>

      <ModalSelectPlan open={selectPlan} onClose={toggleSelectPlan} />
    </header>
  );
};
