# ElexisJS
TypeScript First Web Framework, for Humans.
> ElexisJS is still in beta test now, some breaking changes might happen very often.

## What does ElexisJS bring to developer?
1. Write website with Native JavaScript syntax and full TypeScript development experiance, no more HTML or JSX.
2. For fluent method lovers.
3. Easy to import or create extensions to extend more functional.

## Installation
1. Install from npm
    ```
    npm i elexis
    ```
2. Import to your project main entry js/ts file.
    ```ts
    import 'elexis';
    ```
3. Use web packaging tools like [Vite](https://vitejs.dev/) to compile your project.

## How to Create Element
Using the simple $ function to create any element with node name.
```ts
$('a');
```
> This is not jQuery selector! It looks like same but it actually create `<a>` element, not selecting them.

## Fluent method
Create and modify element in one line.
```ts
$('h1').class('title').css({color: 'red'})
```

## Build your first "Hello, world!" ElexisJS project
Let's try this in your entry file:
```ts
$(document.body).content([
    $('h1').class('title').content('Hello, world!')
])
```

## Extensions
1. [@elexis/router](https://github.com/elexisjs/router): Router for Single Page App.
2. [@elexis/layout](https://github.com/elexisjs/layout): Build waterfall/justified layout with automatic compute content size and position.