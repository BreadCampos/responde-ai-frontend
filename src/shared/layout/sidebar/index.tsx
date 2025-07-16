"use client";
import { Button } from "@//shared/components/button";
import usePersistentState from "@//shared/hooks/use-persist";
import { cn } from "@//shared/lib/utils";
import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useNavigation } from "@/shared/hooks/use-nagivation";

import {
  ChevronsLeft,
  ChevronsRight,
  CompassIcon,
  FileText,
  LogOut,
  Webhook,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

type NavItemProps = {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isCollapsed: boolean;
  isActive: boolean;
  isLogout?: boolean;
  onSelect?: (href?: string) => void;
};

const NavItem = ({
  name,
  href,
  icon: Icon,
  isLogout,
  isCollapsed,
  isActive,
  onSelect,
}: NavItemProps) => {
  const navigate = useNavigation();
  const { logout } = useAuthStore();

  const { t } = useTranslation("common");

  const handleClick = () => {
    if (onSelect) onSelect(href);
    if (isLogout) {
      logout(navigate);
      return;
    }
    navigate.push(href);
  };

  return (
    <Button
      onClick={handleClick}
      variant={isLogout ? "destructive" : !isActive ? "secondary" : "outline"}
      className={isCollapsed ? "justify-center" : "justify-start"}
    >
      <Icon size={isCollapsed ? 24 : 18} className={cn("flex-shrink-0")} />
      {!isCollapsed && (
        <p className={cn("text-[12px] truncate", isLogout && "text-white")}>
          {t(
            name as
              | "sidebar.survey"
              | "sidebar.webhooks"
              | "sidebar.company"
              | "sidebar.logout"
          )}
        </p>
      )}
    </Button>
  );
};

export const SidebarHeader = ({
  isCollapsed,
  onClose,
  onSelect,
}: {
  isCollapsed: boolean;
  onClose?: () => void;
  onSelect?: (href?: string) => void;
}) => {
  const pathname = usePathname();

  const { company } = useAuthStore();
  const logoSrc = company?.logoUrl || "/favicon.svg";

  const mainLinks = [
    { name: "sidebar.survey", href: ROUTES.SURVEY_LIST, icon: FileText },
    { name: "sidebar.webhooks", href: ROUTES.WEBHOOKS_LIST, icon: Webhook },
    {
      name: "sidebar.company",
      href: ROUTES.COMPANY_DETAILS.replace(":id", company?.id || ""),
      icon: CompassIcon,
    },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col space-y-4">
        <div
          className={`flex items-center  ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && !!logoSrc && (
            <Image
              src={logoSrc}
              alt="Logo"
              width={64}
              height={64}
              className="object-cover rounded-lg"
              loading="lazy"
            />
          )}

          {onClose && (
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-card-foreground/10"
            >
              {isCollapsed ? (
                <ChevronsRight className="h-6 w-6" />
              ) : (
                <ChevronsLeft className="h-6 w-6 " />
              )}
            </Button>
          )}
        </div>

        <nav className="flex flex-col space-y-2">
          {mainLinks.map((link) => (
            <NavItem
              {...link}
              onSelect={onSelect}
              key={link.href}
              isCollapsed={isCollapsed}
              isActive={pathname.startsWith(link.href)}
            />
          ))}
        </nav>
      </div>

      <div className="flex flex-col space-y-2">
        <NavItem
          onSelect={onSelect}
          name={"sidebar.logout"}
          href={"logout"}
          isLogout={true}
          icon={LogOut}
          isCollapsed={isCollapsed}
          isActive={false}
        />
      </div>
    </div>
  );
};
export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = usePersistentState(
    "sidebar-collapsed",
    false
  );

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  return (
    <aside
      className={cn(
        "h-screen  shadow-md bg-card p-4 flex flex-col justify-between transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64 text-foreground",
        "text-foreground dark:text-white"
      )}
    >
      <SidebarHeader isCollapsed={isCollapsed} onClose={toggleSidebar} />
    </aside>
  );
};
