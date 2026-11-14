# COSMOS — Interactive 3D Universe

Интерактивный образовательный сайт о Солнечной системе. Сейчас выполнен этап 1: каркас приложения и начальная страница.

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
npm run build
```

## Стек

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber 9, Drei, GSAP, Zustand и Lucide React.

## Источники документации

- [React Three Fiber: введение](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [React Three Fiber: миграция на v9](https://r3f.docs.pmnd.rs/next/tutorials/v9-migration-guide)
- [Next.js: установка](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS с Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

Источники текстур и научных данных будут перечислены после их добавления.

## Текстуры

- `public/textures/earth-blue-marble.png` — [NASA SVS Blue Marble](https://svs.gsfc.nasa.gov/2915/), credit: NASA/Goddard Space Flight Center Scientific Visualization Studio. Использование для образовательной визуализации согласно [правилам NASA](https://www.nasa.gov/nasa-brand-center/images-and-media/).

## Текущий статус

Этап 3 завершён: главная страница содержит 3D-Землю и управляемый перелёт камеры к обзорной Солнечной системе. Планеты в обзорной сцене пока имеют условные цвета и масштаб; детальные текстуры и научная интерактивность входят в следующие этапы.
