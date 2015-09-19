# clipboard.js

> A modern approach to copy &amp; cut to the clipboard. No Flash. No dependencies. Just 1kb.

## Install

You can get it using bower:

```
bower install clipboard --save
```

Or [download as ZIP](https://github.com/zenorocha/clipboard.js/archive/master.zip).

## Usage

First, you need to instantiate it using a selector. This selector corresponds to the trigger element, usually a `<button>`.

```js
new Clipboard('.btn');
```

The easiest way to copy some content to the clipboard, is to include a `value` attribute in your trigger element.

```html
<button class="btn" value="Lorem ipsum">Copy</button>
```

Another way of doing it, is to copy the content from an another element. You can do that by adding a `for` attribute in your trigger element. The value you include on this attribute needs to match another's element `id` attribute.

```html
<p id="target">Lorem ipsum</p>
<button class="btn" for="target">Copy</button>
```

Additionally, you can define a `type` attribute to specify if you want to either `copy` or `cut` content. If you omit this attribute, `copy` will be used.

```html
<input id="target" value="Lorem ipsum"></inpu>
<button class="btn" type="cut" for="target">Copy</button>
```

As you may expect, the `cut` action only works on `<input>` or `<textarea>` elements.

## Browser Support

This project relies on both [Select API](https://developer.mozilla.org/en-US/docs/Web/API/Selection) and [execCommand API](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand). When combined, they're supported in the following browsers.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| 42+ ✔ | 41+ ✔ | 9+ ✔ | 29+ ✔ | Nope ✘ |

## License

[MIT License](http://zenorocha.mit-license.org/) © Zeno Rocha
