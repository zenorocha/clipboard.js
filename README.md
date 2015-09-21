# clipboard.js

> A modern approach to copy &amp; cut to the clipboard. No Flash. No dependencies. Just 2kb.

<a href="http://zenorocha.github.io/clipboard.js/"><img width="728" src="https://cloud.githubusercontent.com/assets/398893/9983535/5ab0a950-5fb4-11e5-9602-e73c0b661883.jpg" alt="Demo"></a>

## Install

You can get it on npm.

```
npm install clipboard --save
```

Or bower, too.

```
bower install clipboard --save
```

If you're not into package management, just [download a ZIP](https://github.com/zenorocha/clipboard.js/archive/master.zip) file.

## Setup

First, include the script located on the `dist` folder

```html
<script src="dist/clipboard.min.js"></script>
```

Now, you need to instantiate it using a DOM selector. This selector corresponds to the trigger element, i.e. `<button>`.

```js
new Clipboard('.btn');
```

# Usage

We're living a _declarative renaissance_, that's why we decided to take advantage of [HTML5 data attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) for better usability.

### Copy text from attribute

The easiest way to copy some content to the clipboard, is to include a `data-text` attribute in your trigger element.

<a href="http://zenorocha.github.io/clipboard.js/#example-1"><img width="147" alt="example-1" src="https://cloud.githubusercontent.com/assets/398893/10000347/6e16cf8c-6050-11e5-9883-1c5681f9ec45.png"></a>

```html
<!-- Trigger -->
<button class="btn" data-text="Just because you can doesn't mean you should — clipboard.js">
    Copy to clipboard
</button>
```

### Copy text from another element

Alternatively, you can copy content from another element by adding a `data-target` attribute in your trigger element.

The value you include on this attribute needs to match another's element `id` attribute.

<a href="http://zenorocha.github.io/clipboard.js/#example-2"><img width="473" alt="example-2" src="https://cloud.githubusercontent.com/assets/398893/9983467/a4946aaa-5fb1-11e5-9780-f09fcd7ca6c8.png"></a>

```html
<!-- Target -->
<input id="foo" value="https://github.com/zenorocha/clipboard.js.git">

<!-- Trigger -->
<button class="btn" data-target="foo">
    <img src="assets/clippy.svg" alt="Copy to clipboard">
</button>
```

### Cut text from another element

Additionally, you can define a `data-action` attribute to specify if you want to either `copy` or `cut` content.

If you omit this attribute, `copy` will be used by default.

<a href="http://zenorocha.github.io/clipboard.js/#example-2"><img width="473" alt="example-3" src="https://cloud.githubusercontent.com/assets/398893/10000358/7df57b9c-6050-11e5-9cd1-fbc51d2fd0a7.png"></a>

```html
<!-- Target -->
<textarea id="bar">Mussum ipsum cacilds...</textarea>

<!-- Trigger -->
<button class="btn" data-action="cut" data-target="bar">
    Cut to clipboard
</button>
```

As you may expect, the `cut` action only works on `<input>` or `<textarea>` elements.

## Events

There are cases where you'd like to capture what has been copied/cut or even check if there was an error.

That's why we fire custom events such as `success` and `error` for you to listen and implement your custom logic.

But to achieve that, first you need to access the `triggers` property from your clipboard instance.

```js
var clipboard = new Clipboard('.btn');
var btns = clipboard.triggers;
```

Internally, this property is just a collections of nodes resulted from a `querySelectorAll` operation. So all you have to do now is loop through that collection and attach listeners.

```js
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('success', function(e) {
        console.info('Action:', e.detail.action);
        console.info('Text:', e.detail.text);
    });

    btns[i].addEventListener('error', function(e) {
        alert(e.detail);
    });
}
```

## Browser Support

This library relies on both [Selection](https://developer.mozilla.org/en-US/docs/Web/API/Selection) and [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) APIs. When combined, they're supported in the following browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| 42+ ✔ | 41+ ✔ | 9+ ✔ | 29+ ✔ | Nope ✘ |

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
