// components/header/language-switcher.tsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ActionMenu, MenuOption } from "../action-menu";
import { Button } from "../button";

// Componente auxiliar para a imagem da bandeira (sem alterações)
const FlagImage = ({ lang, alt }: { lang: string; alt: string }) => {
  return (
    <div className="relative w-6 h-6">
      {" "}
      {/* Definindo tamanho fixo para a imagem */}
      <Image
        className="rounded-full" // Usei rounded-full para um visual melhor
        src={`https://flagcdn.com/w1280/${lang}.png`}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = useCallback(
    (newLocale: string) => {
      if (!pathname) return;

      const pathSegments = pathname.split("/");
      const newPath = pathSegments.slice(2).join("/");

      router.replace(`/${newLocale}/${newPath}`);
    },
    [pathname, router]
  );

  const supportedLanguages = useMemo(
    () => [
      { code: "pt-BR", name: "Português", flag: "br" },
      { code: "en-US", name: "English", flag: "us" },
    ],
    []
  );

  const language =
    supportedLanguages.find((lang) => pathname.includes(lang.code)) ||
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

  // Encontra os dados do idioma atual com base na store
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
  ); // 3. Adicione a dependência

  return (
    <ActionMenu
      options={options}
      title="Selecione o Idioma"
      trigger={customTrigger}
    />
  );
}
