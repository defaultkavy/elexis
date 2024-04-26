<picture style="display: flex; justify-content: center">
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/defaultkavy/elexis/blob/assets/logo_light.png?raw=true">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/defaultkavy/elexis/blob/assets/logo_dark.png?raw=true">
  <img src="https://github.com/defaultkavy/elexis/blob/assets/logo_dark.png?raw=true" alt="Elexis Logo">
</picture>
<p style="text-align: center">Build Web in Native JavaScript Syntax</p>

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
Let's try this code in your entry file:

```ts
$(document.body).content([
    $('h1').class('title').content('Hello, world!')
])
```

In the first line, we create a `$Container` to using Elexis API on `document.body` element. Then we see a `content` method after the container object, this method mean the following elements will be the content of container.

We can pass an array into `content` method. In this array, we put a new `<h1>` element which have a class name "title" and text content "Hello, world!".

Run the code, we will get this body structure in DOM:

```html
<body>
    <h1 class="title">Hello, world!</h1>
</body>
```

So far, we just simply do a hello world project that you can type less in HTML way, and these is not the point of ElexisJS. Let's figure out what ElexisJS will boost development speed in the following examples.

## Using `$State` to sync view and data changes

This line will create a `$State` value, usually we will put `$` sign behind variable name to mean this is a `$State` variable.

```ts
const number$ = $.state(42);
```

This `$State` value has been set a number `42`, which will become a number type `$State`. We can simply put this state value into any display content!

```ts
const value$ = $.state(42);

$(document.body).content([
    $('input').type('number').value(value$),
    $('p').content(['User input value: ', value$])
])
```

You will see the `<input>` element is fill with number `42`, and also `<p>` element will display `'User input value: 42'`. Now try to change input value in browser, the value text in `<p>` element will be synced by your input!

Using `set` method to set value of `$State`, all displayed content of `value$` will be synced.
```ts
value$.set(0)
```

## Extensions
1. [@elexis/router](https://github.com/elexisjs/router): Router for Single Page App.
2. [@elexis/layout](https://github.com/elexisjs/layout): Build waterfall/justified layout with automatic compute content size and position.