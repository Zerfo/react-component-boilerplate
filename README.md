# npm-component-boilerplate &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE)

Используйте для `ts-библиотек` с `react`, стилями, картинками и т.д.

Если же хотите использовать `javascript`, то после того как скачали репозиторий, нужно перейти на другую ветку, сделать это можно с помощью команды `git checkout javascript`.

## Оглавление

- [**Стек**](#stack)
- [**Работа с проектом**](#work_with_project)
- [**Структура проекта**](#project_files)
- [**Качество и ci**](#quality)
- [**Алиасы**](#alias)
- [**Версии зависимостей**](#deps)
- [**Исключение зависимостей из исходного кода**](#external)
- [**Пример использования компонента в хост-проекте**](#host_example)
- [**Пример сборки нескольких компонентов**](#multiple)
- [**Как протестировать пакет не выгружая его?**](#no_nexus_test)
- [**История изменений**](#changes)

<a name="stack"></a>

## Стек

[typescript](https://www.typescriptlang.org/) + [rollup](https://rollupjs.org/guide/en/) + [webpack](https://webpack.js.org/) + [react](https://reactjs.org/) + [sass](https://sass-lang.com/)

<a name="work_with_project"></a>

## Работа с проектом

Перед работой с проектом убедитесь что у вас установленны: `node v16` & `npm v8`. Если это не так, установите их вручную
или используйте [nvm](https://github.com/nvm-sh/nvm), а именно команду `nvm use`.

| Шаг                                    | Команда                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------ |
| Клонируем                              | `git clone https://bitbucket.sberned.ru/scm/rcf/npm-component-boilerplate.git` |
| Ставим зависимости                     | `npm ci`                                                                       |
| Запускаем на <https://localhost:3000/> | `npm run dev`                                                                  |

Дополнительно:

1. Изменить в файле `package.json` поля `url`, `name`, `description`, `version`
2. Изменить на свое усмотрение файл `readme.md`
3. Включить eslint в настройках вашей ide
4. Включить stylelint в настройках вашей ide
5. Удалить или отредактировать содержимое папки `src`, ибо это пример

<a name="project_files"></a>

```
.
├── @types                        # типы
│   └── custom.d.ts               # модули
├── dev                           # витрина для режима разработки
├── dist                          # результат работы rollup
├── src                           # исходный код npm-модуля
│   ├── plus                      # пример алиаса
│   │   ├── index.ts              # функция
│   │   └── plus.test.ts          # unit-тесты
│   ├── component.test.tsx        # unit-тесты
│   ├── styles.scss               # стили
│   ├── styles.scss.d.ts          # типы стилей
│   └── index.tsx                 # компонент
├── .eslintignore                 # игнор-файл для линтинга ts
├── .eslintrc                     # конфиг eslint
├── .gitignore                    # игнор-файл, файлы и папки прописанные тут не попадут в репозиторий
├── .npmrc                        # конфиг npm
├── .nvmrc                        # node version manager
├── .prettierrc                   # конфиг prettier
├── .stylelintrc.json             # конфиг stylelint
├── .stylintignore                # конфиг игнорируемых файлов stylelint
├── jest.config.json              # конфиг jest
├── jest.file.js                  # mock файлов для jest
├── package.json                  # версия, зависимости, скрипты и другая дополнительная информация по проекту
├── package-lock.json             # lock-файл для зависимостей
├── postcss.config.js             # конфиг postcss
├── README.md                     # документация
├── rollup.config.mjs             # конфиг prod сборки
├── tsconfig.json                 # ts-конфиг
└── webpack.config.js             # конфиг dev сборки
```

<a name="quality"></a>

## Качество и ci

| Тип              | Инструмент                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| eslint           | [eslint-plugin](https://bitbucket.sberned.ru/projects/RCF/repos/eslint-plugin/browse)            |
| stylelint        | [stylelint-config-sass-guidelines](https://github.com/bjankord/stylelint-config-sass-guidelines) |
| unit-тесты       | [jest](https://jestjs.io/)                                                                       |
| unit-тесты react | [react-testing-library](https://testing-library.com/docs/react-testing-library)                  |

<a name="deps"></a>

## Версии зависимостей

Чтобы избежать дублирования `production` зависимостей, это те, которые вы устанавливаете в поле `dependencies` в файле
`package.json`, нужно указывать их версию через крышку, например: `"react": "^17.0.2"`. Для `devDependencies` это не
обязательно, их можно хардкодить.

<a name="alias"></a>

## Алиасы

Иногда релятивные импорты выглядят ужасно, например так:

```javascript
import batman from '../../../batman';
```

В таких случаях хочется сделать импорт красивей, а поддержку кодовой базы проще, например так:

```javascript
import batman from 'batman';
```

Для этого нужно сделать четыре правки:

1. открыть файл `tsconfig.json`
2. в поле `compilerOptions.paths` прописать алиас
3. открыть файл `jest.config.json`
4. в поле `moduleNameMapper` прописать алиас

Модуль `src/plus` можно использовать в качестве примера.

<a name="external"></a>

## Исключение зависимостей из исходного кода

Перед публикацией в `nexus` вашего `npm-модуля` - соберите локально сборку (`npm run build`) и посмотрите,
нет ли лишних файлов в папке `dist`. Если кроме вашего исходного кода что-то есть (зачастую появляются папки `_virtual`,
`node_modules`), то вам нужно дополнительно прописать те зависимости которые не исключились из сборки в поле `external`
в `rollup.config.mjs`.

Например, если вы используете `classnames`, но он не был автоматически исключен из финальной сборки, произошло это скорее
всего из-за того что вы используете импорт `classnames/bind`, пример ниже решает данную проблему:

```js
external: ['classnames/bind'];
```

<a name="host_example"></a>

## Пример использования компонента в хост-проекте

```tsx
import Button from 'npm-component-boilerplate';
import 'npm-component-boilerplate/dist/index.css';

const App = () => (
  <>
    <h1>Квартира мечты на Домклик</h1>
    <Button text="Купить" />
  </>
);
```

<a name="multiple"></a>

## Пример сборки нескольких компонентов

Довольно частый кейс - необходимость собрать несколько компонентов в рамках одного npm-модуля.
Представим что у нас есть два компонента `Button` и `Button2`.

```
├── src
│   ├── button
│   │   ├── button.test.tsx
│   │   ├── index.tsx
│   │   └── styles.scss
│   ├── button2
│   │   ├── button2.test.tsx
│   │   ├── index.tsx
│   │   └── styles.scss
│   └── index.ts
```

В этом случае файл `src/index.ts` будет выглядеть так:

```ts
import Button from './button';
import Button2 from './button2';

/* eslint-disable import/no-unused-modules */

export { Button, Button2 };

/* eslint-enable import/no-unused-modules */
```

Что бы правильно собрать компоненты (с точки зрения оптимизации и tree-shaking'а) необходимо немного изменить rollup-конфиг.
Основное отличие от обычной сборки для одного компонента - это раздельная обработка `css` `postcss-плагином`. А так же,
`input: 'src/index.tsx'` изменился на `input: 'src/index.ts'`.

```js
import terser from '@rollup/plugin-terser';
import size from 'rollup-plugin-size';
import postcss from 'rollup-plugin-postcss';
import postcssUrl from 'postcss-url';
import autoExternal from 'rollup-plugin-auto-external';
import image from '@rollup/plugin-image';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: '[name].[format].js',
      preserveModules: true,
    },
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: '[name].[format].js',
      preserveModules: true,
      exports: 'auto',
    },
  ],
  external: ['react/jsx-runtime'],
  plugins: [
    typescript({
      include: ['src/**', '@types/**'],
      exclude: ['**/*.test.ts(x)?'],
    }),
    image(),
    postcss({
      minimize: true,
      modules: true,
      include: '**/button/styles.scss',
      extract: resolve('dist/button.css'),
      plugins: [postcssUrl({ url: 'inline' })],
    }),
    postcss({
      minimize: true,
      modules: true,
      include: '**/button2/styles.scss',
      extract: resolve('dist/button2.css'),
      plugins: [postcssUrl({ url: 'inline' })],
    }),
    terser(),
    autoExternal(),
    size(),
  ],
};
```

В хост проекте импорт вашего компонента `Button` вместе со стилями будет выглядеть так:

```ts
import { Button } from 'npm-component-boilerplate';
import 'npm-component-boilerplate/dist/button.css';
```

Для `Button2` так:

```ts
import { Button2 } from 'npm-component-boilerplate';
import 'npm-component-boilerplate/dist/button2.css';
```

Вместе:

```ts
import { Button, Button2 } from 'npm-component-boilerplate';
import 'npm-component-boilerplate/dist/button.css';
import 'npm-component-boilerplate/dist/button2.css';
```

<a name="no_nexus_test"></a>

## Как протестировать пакет не выгружая его?

Для локального тестирования пакета можно использовать npm-пакет [**yalc**](https://github.com/wclr/yalc).

Гайд:

1. устанавливаем `yalc` глобально
2. заходим в `npm-модуль` который хотите тестировать
3. собираем prod сборку (`npm run build`)
4. пишем `yalc publish`
5. заходим в хост-проект в котором будем тестировать
6. пишем `yalc add name_of_my_npm`, где `name_of_my_npm` - название вашего `npm-модуля` в `package.json`

апдейты:

1. меняем исходный код
2. собираем prod сборку (`npm run build`)
3. пишем `yalc publish`
4. заходим в хост-проект в котором будем тестировать
5. пишем `yalc update`

удаление:

1. заходим в хост-проект из которого нужно удалить тест билиотеки
2. пишем `yalc remove —all`

<a name="changes"></a>

## История изменений

- 1.0.0 - **1 Июня 2023** Релиз npm-component-boilerplate ([**@Zerfo**](https://github.com/Zerfo) in [**d72c72**](https://github.com/Zerfo/react-component-boilerplate/commit/d72c72713937a3a3f41fd97be17e6bb9e704757a))
