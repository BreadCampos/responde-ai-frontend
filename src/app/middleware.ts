import { i18nConfig } from "@/core/i18n/i18n-config";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Verifica se o caminho atual já possui um prefixo de idioma
  const pathnameIsMissingLocale = i18nConfig.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  console.log({ pathnameIsMissingLocale });

  // 2. Se não tiver um idioma no caminho, redireciona
  if (pathnameIsMissingLocale) {
    const locale = i18nConfig.defaultLocale;

    // Constrói a nova URL com o idioma padrão.
    // Ex: se o usuário acessar '/surveys', o pathname é '/surveys'.
    // A nova URL será 'http://localhost:3000/pt-BR/surveys'.
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  // O matcher evita que o middleware rode em arquivos de assets e rotas de API.
  // Esta versão é um pouco mais concisa e eficaz.
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
