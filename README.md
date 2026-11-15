# COSMOS — интерактивная 3D-Солнечная система

Единый Git-репозиторий для образовательного веб-сайта и Android-приложения COSMOS. Интерфейс доступен на казахском, русском и английском языках; сайт использует Three.js и React Three Fiber для интерактивных сцен.

## Структура монорепозитория

- `android/` — Android Studio проект на Kotlin и Capacitor.
- `web/` — Next.js App Router, словари, статические файлы и Capacitor-конфигурация.
- `assets/` — общие исходные текстуры, логотипы и другие медиа; скрипт подготовки доставляет их веб-сайту и Android-сборке.
- `docs/architecture/` — описание архитектуры.
- `docs/android/` — инструкции по Android.
- `docs/web/` — описание веб-сайта и его история разработки.
- `docs/assets/` — происхождение и организация медиаресурсов.
- `scripts/` — общие скрипты сборки и синхронизации.

Git-корнем является каталог `COSMOS/cosmos` в текущем рабочем пространстве. Внешний каталог `COSMOS/android` может быть локальной ссылкой Android Studio на `cosmos/android`; исходники остаются в одном репозитории.

## Сборка и запуск

Инструкции для приложений и требования к окружению:

- [Android: настройка и сборка](docs/android/ANDROID_SETUP.md)
- [Архитектура](docs/architecture/ARCHITECTURE.md)
- [Общие ресурсы и лицензии](docs/assets/ASSETS.md)
- [История веб-сайта](docs/web/DEVELOPMENT_LOG.md)

### Веб-сайт

```bash
cd web
npm ci
npm run dev
```

Production-проверки: `npm run lint`, `npx tsc --noEmit`, `npm run check:messages`, `npm run build`. Обычная веб-сборка сохраняет серверные возможности Next.js.

### Android

Откройте `android/` в Android Studio. Для синхронизации веб-содержимого и сборки APK следуйте [инструкции Android](docs/android/ANDROID_SETUP.md). Capacitor использует отдельный статический экспорт; сервер Next.js на устройстве не запускается.

Для архитектуры, документации ресурсов и истории работы см. `docs/`.
