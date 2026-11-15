# COSMOS — Interactive 3D Universe

Интерактивный образовательный сайт для исследования Солнечной системы. Интерфейс доступен на казахском, русском и английском языках; казахский используется по умолчанию.

## Локали

Проект использует App Router с префиксными маршрутами `/kk`, `/ru` и `/en`. Казахский (`kk-KZ`) — язык по умолчанию; язык браузера не меняет этот выбор. Сохранённый выбор хранится в cookie `NEXT_LOCALE`. Локализация подключена через `next-intl`; словари находятся в `messages/`.

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000.

## Проверки

```bash
npm run lint
npx tsc --noEmit
npm run check:messages
npm run build
```

## Стек

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber 9, Drei, GSAP, Zustand и Lucide React.

## Источники документации

- [React Three Fiber: введение](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [React Three Fiber: миграция на v9](https://r3f.docs.pmnd.rs/next/tutorials/v9-migration-guide)
- [Next.js: установка](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS с Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

Источники текстур и научных данных перечислены ниже.

## Текстуры

- `public/textures/earth-blue-marble.png` — [NASA SVS Blue Marble](https://svs.gsfc.nasa.gov/2915/), credit: NASA/Goddard Space Flight Center Scientific Visualization Studio. Использование для образовательной визуализации согласно [правилам NASA](https://www.nasa.gov/nasa-brand-center/images-and-media/).

## Текущий статус

Завершены этапы 1–10: главная страница с 3D-Землёй, обзорная Солнечная система, страницы восьми планет, панель управления, космическое путешествие, адаптивное качество и финальная production-проверка.

## Развёртывание

Проект готов к Vercel: подключите репозиторий GitHub и оставьте стандартные настройки Next.js. `VERCEL_PROJECT_PRODUCTION_URL` используется для canonical URL автоматически. Для собственного домена задайте `NEXT_PUBLIC_SITE_URL` (например, `https://cosmos.example.com`) в окружении сборки, чтобы canonical и hreflang указывали на публичный адрес. Перед публикацией проверьте `npm run lint`, `npx tsc --noEmit`, `npm run build` и `npm audit`.

## Источники карт планет

Карты Меркурия, Венеры (вид облачного слоя), Марса, Юпитера, Сатурна, Урана, Нептуна, Солнца и Луны: [Solar System Scope Textures](https://www.solarsystemscope.com/textures/), лицензия [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Автор: Solar System Scope / INOVE. Карты основаны на данных NASA, но содержат художественно восстановленные области и более насыщенные цвета; они служат для визуализации, а не научного анализа. Карта Земли: NASA SVS, ссылка выше.

Размеры, расстояния и скорость движения в сцене условные. Это интерактивная иллюстрация, не точная астрономическая симуляция.

## Научные описания

Краткие факты в карточках сверены со страницами NASA Science; ссылка на соответствующий источник хранится рядом с данными каждой планеты в `src/data/solarObjects.ts`. Числовые характеристики будут добавлены на следующем этапе с указанием даты актуальности для меняющихся показателей.

## Характеристики планет

Физические характеристики: [NASA NSSDCA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/index.html). Определения показателей: [примечания к таблице](https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html). Число подтверждённых естественных спутников: [NASA/JPL Planetary Satellite Discovery Circumstances](https://ssd.jpl.nasa.gov/sats/discovery.html), проверено 14 ноября 2026 года. Для спутников использована таблица JPL, поскольку число на сводной странице NSSDCA обновляется реже. Факты каждой планеты дополнительно связаны с её страницей NASA Science.

## Управление симуляцией

В режиме исследования панель позволяет поставить анимацию на паузу, выбрать скорость от 0× до 5×, скрыть орбиты, подписи или звёздное поле и вернуть камеру к общему виду. Скорость влияет на вращение планет и их орбитальное движение.

## Космическое путешествие

В режиме исследования доступен автоматический тур по восьми планетам. Камера последовательно перелетает между объектами; карточка показывает описание выбранной планеты. На каждой остановке предусмотрена пауза, продолжение, переход к следующей планете и завершение тура. Подписи планет отрисовываются внутри WebGL-сцены как 3D-текст.

## Качество, доступность и fallback

В настройках симуляции доступны профили 3D-графики: низкий, средний и высокий. На узких экранах и устройствах с ограниченными ресурсами автоматически уменьшаются pixel ratio, сложность геометрии и число звёзд. Для движения сцены и GSAP-переходов учитывается `prefers-reduced-motion`; выбор планет и управление симуляцией доступны через клавиатуру. Если WebGL недоступен или 3D-сцена не загружается, сайт показывает текстовое сообщение, а научные данные остаются доступны.

## Фирменная айдентика

Знак COSMOS объединяет объёмную букву C из тёмного титана, наклонённое орбитальное кольцо и голубое светящееся ядро. Процедурная модель `CosmosLogo3D` встроена в общий hero Canvas; Header и Footer используют векторный вариант без дополнительного WebGL-контекста. GSAP-анимация wordmark и вращение 3D-знака учитывают `prefers-reduced-motion`.

- `src/components/branding/CosmosLogo3D.tsx` — процедурная 3D-геометрия знака.
- `src/components/branding/CosmosLogo.tsx` и `AnimatedLogo.tsx` — горизонтальный и компактный интерфейсные варианты.
- `public/branding/cosmos-symbol.svg`, `cosmos-logo-horizontal.svg`, `cosmos-logo-white.svg` — производные одного знака.
- `public/branding/cosmos-symbol.png`, `cosmos-logo.png`, `cosmos-og.jpg` — растровые версии для иконок и публикаций (Open Graph 1200×630).
- `src/app/favicon.ico`, `icon.svg`, `icon.png`, `apple-icon.png` — favicon и app icons.
- Загрузочная заставка показывается на время загрузки 3D-модуля и текстур, без искусственной задержки.

## Android app

Android uses Capacitor 8 and packages the shared 3D experience, all three locale versions, and the local planet textures. Its static assets are generated separately; the regular Next.js website keeps its server rendering, locale proxy, and cookie route.

```bash
npm install
npm run android:sync
# Select JDK 21 for Gradle, then:
./android/gradlew -p android assembleDebug
```

Open `android/` in Android Studio. In the current outer workspace, `../android/` is also available as a symlink to the tracked project directory. The debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`. Release signing must be configured locally; no signing keys are stored in this repository.

See [`docs/android/ANDROID_SETUP.md`](../android/ANDROID_SETUP.md) and [`docs/architecture/ARCHITECTURE.md`](../architecture/ARCHITECTURE.md) for requirements, offline scope, build details, and known platform limitations.
