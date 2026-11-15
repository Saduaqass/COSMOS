import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { isAppLocale, routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const requestedLocale = segments[0];
  if (!isAppLocale(requestedLocale ?? "")) {
    const saved = request.cookies.get("NEXT_LOCALE")?.value;
    const locale = isAppLocale(saved ?? "") ? saved : routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
    return NextResponse.redirect(url);
  }

  const response = handleI18nRouting(request);
  response.cookies.set("NEXT_LOCALE", requestedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
