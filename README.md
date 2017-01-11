
# rucksack

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/rucksack.svg)](https://www.npmjs.com/package/rucksack) [![Downloads](https://img.shields.io/npm/dt/rucksack.svg)](https://www.npmjs.com/package/rucksack) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> JavaScript and CSS bundler.

## :cloud: Installation

```sh
$ npm i --save rucksack
```


## :clipboard: Example



```js
const Rucksack = require("rucksack");


let bundler = new Rucksack();

// Add remote url as resource
//bundler.add("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js");
//bundler.add(`${__dirname}/data/main.js`);
//bundler.add(`${__dirname}/data/another-main.js`);
bundler.add(`${__dirname}/data/bar.css`);
bundler.add(`${__dirname}/data/main.css`);
bundler.addCSS("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/default.min.css", false);
bundler.bundleCSS();
```

## :memo: Documentation


### `()`



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`bloggify-prebuilt`](https://github.com/Bloggify/bloggify-prebuilt#readme)—The prebuilt Bloggify version.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
