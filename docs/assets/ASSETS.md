# COSMOS: общие ресурсы и лицензии

## Источники и доставка

`assets/` содержит канонические файлы, которые могут использоваться несколькими приложениями. Не импортируйте их напрямую в URL веб-сайта: Next.js раздаёт статические файлы только из `web/public/`.

Перед `dev`, `build`, `start` и Android static build запускается `scripts/sync-assets.mjs`. Скрипт копирует ресурсы:

| Канонический каталог | Каталог веб-сборки | Публичный URL |
| --- | --- | --- |
| `assets/textures/` | `web/public/textures/` | `/textures/...` |
| `assets/logos/` | `web/public/branding/` | `/branding/...` |

Сгенерированные копии в `web/public/branding/` и `web/public/textures/` игнорируются Git. Android использует Android static export из `web/`, поэтому копии включаются в `android/app/src/main/assets/public/`. Для последующего нативного приложения эти файлы можно доставить через Android `assets/` или `res/` без изменения канонических оригиналов.

## Текстуры

- `assets/textures/earth-blue-marble.png` — NASA/Goddard Space Flight Center Scientific Visualization Studio, [Blue Marble](https://svs.gsfc.nasa.gov/2915/). Атрибуция: NASA/GSFC Scientific Visualization Studio. Условия использования — [NASA Images and Media](https://www.nasa.gov/nasa-brand-center/images-and-media/).
- Карты Меркурия, Венеры, Марса, Юпитера, Сатурна, Урана, Нептуна, Солнца и Луны — Solar System Scope / INOVE, [Solar System Scope textures](https://www.solarsystemscope.com/textures/), лицензия [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). При распространении этих файлов сохраняйте авторство и ссылку на CC BY 4.0. Карты содержат художественно восстановленные области и предназначены для визуализации, не для измерений.

## Логотипы

`assets/logos/` содержит оригинальную айдентику COSMOS: векторные и растровые варианты знака и горизонтального логотипа, монохромные версии и Open Graph artwork. Они не используют логотипы NASA, SpaceX или других организаций. Для веб-приложения файлы копируются в публичный каталог `branding/`; Android launcher и splash assets остаются в нативных ресурсах проекта.

## Остальные типы медиа

Сейчас проект не хранит внешние GLB/GLTF модели, видео, аудио или отдельный набор шрифтов. Геометрия планет и фирменного 3D-знака создаётся компонентами Three.js. Не создавайте пустые каталоги для отсутствующих типов ресурсов; при появлении таких файлов добавьте их в `assets/` и расширьте таблицу доставки.
