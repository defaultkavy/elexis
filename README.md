# Fluent.ts - A mordern way to build web.
Inspired by jQuery, but not selecting query anymore, just create it.

## Usage
```ts
import { $ } from 'fluent'

const $app = $('app').content([
    $('h1').content('Hello World!')
])

document.body.append($app.dom) // render $app
```

## Forget HTML, create any element just like this
```ts
$('a') 
```

## Yes, Fluent Method.
```ts
$('h1').class('amazing-title').css({color: 'red'}).content('Fluuuuuuuuuuuuent!')
```

## Router? I got you.
```ts
const router = new Router('/')
    // example.com
    .addRoute(new Route('/', () => 'Welcome to your first page!'))

    // example.com/user/anyusername
    .addRoute(new Route('/user/:username', (params) => {
        return $('div').content([
            $('h1').content(params.username)
        ])
    }))

    .listen() // start resolve pathname and listen state change
```

## Single Page App
```ts
$.anchorPreventDefault = true;
$.anchorHandler = (url) => { router.open(url) }

$('a').href('/about').content('Click me will not reload page.')
```

## Insert element(s) with condition
```ts
// Example 1
$('div').content([
    $('h1').content(params.username),
    // conditional
    params.username === 'admin' ? $('span').content('Admin is here!') : undefined
])

// Example 2
$('div').content([
    $('h1').content(params.username),
    params.username === 'alien' ? [
        // the elements in this array will insert to <div> when conditional is true
        $('span').content('Warning'),
        $('span').content('You are contacting with alien!')
    ] : undefined
])
```

## Replace or Insert
```ts
$('div').content(['1', '2', '3']) // 123
    .content(['4']) // 4
    // content method will replace children with elements

    .insert(['5', '6', '7']) // 4567
    // using insert method to avoid replacement

    .class('class1, class2') // class1, class2
    // class method is replacement method

    .addClass('class3') // class1, class2, class3
    // using addClass method
```

## Multiple element builder
```ts
$('ul').content([
    // create 10 <li> element with same content
    $.builder('li', 10, ($li) => $li.content('Not a unique content of list item!'))

    // create <li> element depend on array length
    $.builder('li', [
        // if insert a function,
        // builder will callback this function after create this <li> element
        ($li) => $li.css({color: 'red'}).content('List item with customize style!'),
        
        // if insert a string or element,
        // builder will create <li> element and insert this into <li>
        'List item with just text',
        $('a').href('/').content('List item but with a link!')
    ])
])
```

## Element builder with function
```ts
// This is a template function that return a <div> element
function UserCard(name: string, age: number) {
    return $('div').content([
        $('h2').content(name),
        $('span').content(`${bio} year old`)
    ])
}

// A user data array
const userDataList = [
    { name: 'Amateras', age: 16 },
    { name: 'Tsukimi', age: 16},
    { name: 'Rei', age: 14},
    { name: 'Ichi', age: 14},
]

// This function will create 10 UserCard element with same name and age
// Using tuple [Function, ...args] to call function with paramerters
$.builder([UserCard, 'Shizuka', 16], 100)

// This function will create UserCard with the amount depend on array length
$.builder(
    UserCard, 
    userDataList.map(userData => [userData.name, userData.age]))

// Same result as (prefer)
userDataList.map(userData => UserCard(userData.name, userData.age))
```