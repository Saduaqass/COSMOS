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

Завершены этапы 1–8: главная страница с 3D-Землёй, обзорная Солнечная система, страницы восьми планет, панель управления и автоматическое космическое путешествие. Следуют оптимизация производительности, доступности и финальная проверка перед развёртыванием.

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
