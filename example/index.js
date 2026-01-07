"use strict";

import RucksackLite from "../lib/index.js";

const __dirname = new URL(".", import.meta.url).pathname;

const r = new RucksackLite({
  name: "my-app",
  bundle_dir: `${__dirname}/output`,
  bundle_url: "/static",
  input: "main.js"
});

r.add("https://example.com/index.js");
r.add("https://example.com/styles.css");

console.log(r.html())
// <script src="/static/my-app.js"></script>
// <script src="https://example.com/index.js"></script>
// <link rel="stylesheet" href="/static/my-app.css" />
// <link rel="stylesheet" href="https://example.com/styles.css" />