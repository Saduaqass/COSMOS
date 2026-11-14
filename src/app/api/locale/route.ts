import { NextResponse } from "next/server";
import { isAppLocale } from "@/i18n/routing";

export async function POST(request: Request) {
  let body: { locale?: unknown };
  try {
    body = await request.json() as { locale?: unknown };
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (typeof body.locale !== "string" || !isAppLocale(body.locale)) {
    return NextResponse.json({ error: "unsupported_locale" }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("NEXT_LOCALE", body.locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}
