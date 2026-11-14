import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { isAppLocale, routing } from "./routing";

const dictionaries = {
  kk: () => import("../../messages/kk.json").then((module) => module.default),
  ru: () => import("../../messages/ru.json").then((module) => module.default),
  en: () => import("../../messages/en.json").then((module) => module.default),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested ?? routing.defaultLocale;
  if (!isAppLocale(locale)) notFound();

  return {
    locale,
    messages: await dictionaries[locale](),
  };
});
