// components/header/language-switcher.tsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ActionMenu, MenuOption } from "../action-menu";
import { Button } from "../button";

// Componente auxiliar para a imagem da bandeira (sem alterações)
const FlagImage = ({ lang, alt }: { lang: string; alt: string }) => {
  return (
    <Image
      className="rounded-full" // Usei rounded-full para um visual melhor
      src={`https://flagcdn.com/16x12/${lang}.png`}
      width={16}
      height={12}
      alt={alt}
    />
  );
};

export function LanguageSwitcher() {
  // 2. Pega o idioma atual e a função para alterá-lo diretamente da store
  // 3. A função de troca de idioma agora simplesmente chama a ação da store
  // Não precisamos mais manipular o router ou o pathname.
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    // Remove o locale antigo do caminho
    const newPath = pathname.split("/").slice(2).join("/");
    // Navega para a nova rota com o novo locale
    router.push(`/${newLocale}/${newPath}`);
  };

  const supportedLanguages = [
    { code: "pt-BR", name: "Português", flag: "br" },
    { code: "en-US", name: "English", flag: "us" },
  ];

  const language =
    supportedLanguages.find((lang) => pathname.includes(lang.code)) ||
    supportedLanguages[0];

  console.log(language, "language");

  // A lógica do menu agora é baseada no estado da store
  const options: MenuOption[] = supportedLanguages.map((lang) => ({
    label: (
      <div className="flex items-center gap-2">
        <span>{lang.name}</span> {/* Corrigido para mostrar o nome dinâmico */}
        <FlagImage lang={lang.flag} alt={`Bandeira de ${lang.name}`} />
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
