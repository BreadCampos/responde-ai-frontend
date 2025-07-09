// components/header/language-switcher.tsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    const newPath = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${newPath}`);
  };

  const supportedLanguages = [
    { code: "pt-BR", name: "Português", flag: "br" },
    { code: "en-US", name: "English", flag: "us" },
  ];

  const language =
    supportedLanguages.find((lang) => pathname.includes(lang.code)) ||
    supportedLanguages[0];

  const options: MenuOption[] = supportedLanguages.map((lang) => ({
    label: (
      <div className="flex items-center gap-2">
        <FlagImage lang={lang.flag} alt={`Bandeira de ${lang.name}`} />
        <span>{lang.name}</span> {/* Corrigido para mostrar o nome dinâmico */}
      </div>
    ),
    onSelect: () => handleLanguageChange(lang.code),
    // 4. A opção é desabilitada com base no idioma da store
    disabled: language.code === lang.code,
  }));

  // Encontra os dados do idioma atual com base na store
  const currentLanguageData =
    supportedLanguages.find((lang) => lang.code === language.code) ||
    supportedLanguages[0];

  const customTrigger = (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <FlagImage
        lang={currentLanguageData.flag}
        alt={`Idioma atual: ${currentLanguageData.name}`}
      />
    </Button>
  );

  return (
    <ActionMenu
      options={options}
      title="Selecione o Idioma"
      trigger={customTrigger}
    />
  );
}
