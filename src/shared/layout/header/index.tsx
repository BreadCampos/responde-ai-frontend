import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { Button } from "@/shared/components/button";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { Drawer, DrawerContent } from "@/shared/components/ui/drawer";
import { useScreenSize } from "@/shared/hooks/use-screen-size";
import { Menu } from "lucide-react";
import { SidebarHeader } from "../sidebar";
import usePersistentState from "@/shared/hooks/use-persist";

export const Header = () => {
  const { user, company } = useAuthStore();

  const { isMobile } = useScreenSize();

  const [isCollapsed, setIsCollapsed] = usePersistentState(
    "sidebar-collapsed",
    false
  );

  const toggleDrawer = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <header className="bg-card text-foreground shadow-md px-4 py-2 z-10 transition-all">
      <div className="flex items-center justify-end gap-2">
        <span className="text-card-foreground font-medium flex gap-2">
          {company?.fantasyName || company?.legalName || user?.firstName}
        </span>

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
    </header>
  );
};
