"use strict";

const Rucksack = require("..");


const r = new Rucksack({
    jsUrl: "my-bundle.js"
  , cssUrl: "my-bundle.css"
});

// Local files are supposed to be added via `rucksack`
// (which implements bundling)
// Those will *not* appear in the HTML output
r.add(`${__dirname}/data/bar.css`);
r.add(`${__dirname}/data/main.css`);

// On the other side, remote scripts and styles *will* appear
// in the output, because they don't need bundling.
r.add("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/default.min.js");
r.add("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.8.0/styles/default.min.css", false);

console.log(bundler.html())
