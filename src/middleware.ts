import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { i18nConfig } from "./core/i18n/i18n-config";

const localeAliases: Record<string, string> = {
  br: "pt-BR",
  pt: "pt-BR",
  en: "en-US",
  us: "en-US",
};

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18nConfig.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const defaultLocale = i18nConfig.defaultLocale;

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstPathSegment = pathname.split("/")[1] || "";
  const aliasedLocale = localeAliases[firstPathSegment.toLowerCase()];

  if (aliasedLocale) {
    // Se o usuário digitou um apelido (ex: /br), redireciona para a raiz do idioma correto (ex: /pt-BR)
    return NextResponse.redirect(new URL(`/${aliasedLocale}`, request.url));
  }

  const pathnameLocale = i18nConfig.locales.find(
    (locale) =>
      pathname.toLowerCase().startsWith(`/${locale.toLowerCase()}/`) ||
      pathname.toLowerCase() === `/${locale.toLowerCase()}`
  );

  if (pathnameLocale) {
    if (
      !pathname.startsWith(`/${pathnameLocale}/`) &&
      pathname !== `/${pathnameLocale}`
    ) {
      const newPath = pathname.substring(pathnameLocale.length + 1);
      return NextResponse.redirect(
        new URL(`/${pathnameLocale}${newPath}`, request.url)
      );
    }
  } else {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*|sw.js).*)"],
};
