# SoccerStat

SoccerStat — frontend-приложение для просмотра футбольной статистики: лиги, команды и календарь матчей.

## Технологии

- React 19
- TypeScript 5
- Vite 8
- Ant Design 6
- Tailwind CSS 4
- TanStack Query 5
- React Router 7
- Sentry
- Vitest 4

## Требования

- Node.js 22+
- Yarn 1.22+

## Переменные окружения

Пример переменных находится в файле [.env.example](.env.example).

- VITE_FOOTBALL_DATA_API_URL — адрес proxy или backend API.
- VITE_APP_BASE_PATH — публичный base path клиентского приложения.
- VITE_SENTRY_DSN — DSN для отправки ошибок в Sentry. Опциональная переменная: если не задана, Sentry не инициализируется.

Рекомендации по VITE_APP_BASE_PATH:

- / — локальный запуск, Docker, обычный сервер под корнем домена.
- /SoccerStat/ — публикация на GitHub Pages.

## Мониторинг ошибок

В проект добавлен Sentry для клиентского мониторинга ошибок.

Сейчас в Sentry отправляются:

- unhandled UI-ошибки, пойманные глобальным Error Boundary;
- handled ошибки HTTP-запросов из общего API-слоя;
- ошибки схемной валидации API-ответов.

Sentry активируется только если задана переменная VITE_SENTRY_DSN.

## Локальный запуск

Установка зависимостей:

```bash
yarn
```

Запуск dev-сервера:

```bash
yarn dev
```

Запуск dev-сервера с доступом из локальной сети:

```bash
yarn dev:host
```

## Основные команды

```bash
yarn build
yarn preview
yarn test:run
yarn typecheck
yarn lint
yarn validate
yarn validate:strict
```

Назначение команд:

- build — production-сборка.
- preview — локальный просмотр production-сборки.
- test:run — однократный запуск тестов.
- typecheck — проверка TypeScript.
- lint — проверка ESLint.
- validate — typecheck и lint.
- validate:strict — validate и проверка форматирования.

## Docker

В репозитории добавлены следующие файлы:

- [Dockerfile](Dockerfile) — multi-stage сборка для development и production.
- [compose.yml](compose.yml) — запуск dev- и prod-контейнеров.
- [docker/nginx/default.conf](docker/nginx/default.conf) — nginx-конфиг для SPA.
- [.dockerignore](.dockerignore) — исключения для docker build context.

Запуск development-контейнера:

```bash
docker compose --profile dev up --build frontend-dev
```

Приложение будет доступно по адресу http://localhost:5173.

Запуск production-контейнера:

```bash
docker compose --profile prod up --build frontend-prod
```

Приложение будет доступно по адресу http://localhost:8080.

По умолчанию production-сборка в Docker собирается с VITE_APP_BASE_PATH=/ и подходит для раздачи из корня домена. Для публикации в подкаталоге base path нужно переопределить через переменные окружения или build args.

## Структура проекта

```text
src/
	app/        - корневой слой приложения: роутинг, layout, providers
	entities/   - доменные сущности: competition, team, match
	features/   - пользовательские сценарии поверх сущностей
	pages/      - страницы приложения
	shared/     - общие ui-компоненты, константы, api и утилиты
	widgets/    - составные блоки интерфейса
soccerstat-proxy/ - отдельный proxy-worker для production API-доступа
```

## Сборка и деплой

Клиент использует Vite base path. Это влияет одновременно на:

- пути до статических ассетов в production;
- basename в React Router;
- корректность работы приложения при раздаче из подкаталога.

Если приложение публикуется не из корня домена, base path должен быть задан явно.
