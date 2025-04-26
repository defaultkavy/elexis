<picture style="display: flex; justify-content: center">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/defaultkavy-dev/elexis/refs/heads/assets/logo_light.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/defaultkavy-dev/elexis/refs/heads/assets/logo_dark.png">
  <img src="https://raw.githubusercontent.com/defaultkavy-dev/elexis/refs/heads/assets/logo_dark.png" alt="Elexis Logo">
</picture>
<p style="text-align: center">Building Web App using only JavaScript</p>

## What does ElexisJS bring to developers?
1. Write website with Native JavaScript syntax and full TypeScript development experiance, no more HTML or JSX.
2. TypeScript first class, typesafe is good.
3. Method chain make code easy for reading.
4. Everything can be modular, make bundle size smaller depend on you need.

## Installation
1. Install
    ```
    npm i elexis
    bun i elexis
    ```
2. Import to your project main entry js/ts file.
    ```ts
    import 'elexis';
    ```
3. Use web packaging tools like [Vite](https://vitejs.dev/) to compile your project.

## How to Create Element
Just use the `$` function to create any element with node name.
```ts
$('a');
```
> [!NOTE]
> This is not jQuery selector! It looks like same but it actually create `<a>` element, not selecting them.

## Fluent method
Create and modify element attributes in one line.
```ts
// set the class name and style
$('h1').class('title').style({color: 'red'})
```

## Build your first "Hello, world!" ElexisJS project
Let's try this code in your entry file:

```ts
$(document.body).content([
    $('h1').class('title large-text').content('Hello, world!')
])
```

In the first line, we create a `$Container` to using Elexis API on `document.body` element. Then we see a `content` method after the container object, this method mean the following elements will be the content of container.

We can pass an array into `content` method. In this array, we put a new `<h1>` element which have a class name "title" and text content "Hello, world!".

Run the code, we will get this body structure in DOM:

```html
<body>
    <h1 class="title large-text">Hello, world!</h1>
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
// it's recommended place '$' after the variable name
// to indicate this is $State object.
const number$ = $.state(42);

$(document.body).content([
    $('input').type('number').value(number$),
    $('p').content([`User input value: ${number$}`])
])
```

You will see the `<input>` element is fill with number `42`, and also `<p>` element will display `'User input value: 42'`. Now try to change input value in browser, the value text in `<p>` element will be synced by your input!

Using `set` method to set value of `$State`, all displayed content of `value$` will be synced.
```ts
number$.value(0)
```

## Build Your Custom Element
You can easily create your own element with writing `class` that extends from `$Node`:
```ts
class $CustomDiv extends $Container {
    constructor(name: string) {
        super('custom-div');
        this.class('custom-block').content(name);
    }
}
```
And this is how to append it in dom tree:
```ts
$(document.body).content([
    $($CustomDiv, 'This is custom div element!').style({fontSize: '2rem'})
])
```

## Minimize ElexisJS Codebase Size
In default, ElexisJS imports all basic elements to your project. If you need more customize of ElexisJS modules, we offer the way to make your bundle size as small as possible. Use this import line instead `import 'elexis'`.
```ts
import 'elexis/core';
```

With this `elexis/core`, the minimum required modules will be imported. If you need more basic element API import to your project, you can write import like this:
```ts
import 'elexis/core'; // import basic element
import 'elexis/node/img'; // import $Image
import 'elexis/node/a'; // import $Anchor
import 'elexis/method/trycatch';

$('img').src(...) // => $Image
$('a').href(...) // => $Anchor
$.trycatch(() => true) // trycatch handler
```
Each module in `node/*` and `method/*` will register tag name and functions to `$` method, TypeScript server will handle these result of type for you. You can also directly import the element to your code and place element constructor inside `$` method:
```ts
import 'elexis/core';
import { $Input } from 'elexis/src/node/$Input';

$($Input).value(42) // => $Input
```
> [!CAUTION]
> Don't use the import path like `import { $Input } from 'elexis'`, this will make compiler use the default entry point that import every things to your project.

## Extensions
1. [@elexis.js/router](https://github.com/elexis-js/router): Router for Single Page App.
2. [@elexis.js/layout](https://github.com/elexis-js/layout): Build waterfall/justified layout with automatic compute content size and position.
3. [@elexis.js/view](https://github.com/elexis-js/view): Multiple content switch handler.
4. [@elexis.js/css](https://github.com/elexis-js/css): Write CSS in JavaScript.
5. [@elexis.js/idb](https://github.com/elexis-js/idb): Simplify API of IndexedDB.
6. [@elexis.js/focus](https://github.com/elexis-js/focus): Element focus state controller.