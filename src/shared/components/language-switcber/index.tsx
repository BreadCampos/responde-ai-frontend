// components/header/language-switcher.tsx
"use client";

import { useTranslation } from "@/shared/hooks/use-translation";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ActionMenu, MenuOption } from "../action-menu";
import { Button } from "../button";

const FlagImage = ({ lang, alt }: { lang: string; alt: string }) => {
  return (
    <div className="relative w-6 h-6">
      {" "}
      <Image
        src={`https://flagcdn.com/w1280/${lang}.png`}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};

export function LanguageSwitcher() {
  const router = useRouter();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const currentPathname = usePathname();

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      i18n.changeLanguage(newLocale);

      const newPath = currentPathname.replace(
        `/${currentLocale}`,
        `/${newLocale}`
      );
      router.push(newPath);

      router.refresh();
    },
    [currentLocale, currentPathname, i18n, router]
  );

  const supportedLanguages = useMemo(
    () => [
      { code: "pt-BR", name: "Português", flag: "br" },
      { code: "en-US", name: "English", flag: "us" },
    ],
    []
  );

  const language =
    supportedLanguages.find((lang) => currentLocale == lang.code) ||
    supportedLanguages[0];

  const options: MenuOption[] = useMemo(() => {
    return supportedLanguages.map((lang) => ({
      label: (
        <div className="flex items-center gap-2">
          <FlagImage lang={lang.flag} alt={`Bandeira de ${lang.name}`} />
          <span>{lang.name}</span>{" "}
        </div>
      ),
      onSelect: () => handleLanguageChange(lang.code),
      disabled: language.code === lang.code,
    }));
  }, [supportedLanguages, language.code, handleLanguageChange]);

  const currentLanguageData =
    supportedLanguages.find((lang) => lang.code === language.code) ||
    supportedLanguages[0];

  const customTrigger = useMemo(
    () => (
      <Button variant="ghost" className="h-8 w-8 p-0">
        <FlagImage
          lang={currentLanguageData.flag}
          alt={`Idioma atual: ${currentLanguageData.name}`}
        />
      </Button>
    ),
    [currentLanguageData]
  );

  return (
    <ActionMenu
      options={options}
      title="Selecione o Idioma"
      trigger={customTrigger}
    />
  );
}
