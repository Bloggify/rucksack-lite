## Documentation

You can see below the API reference of this module.

### constructor

Ruckasck
Creates a new instance of `Ruckasck`.

#### Params

- **Object** `opts`: The Rucksack options.

#### Return
- **Object** The Rucksack instance.

### `add(resPath, root)`
Downloads the script from the resource file.

#### Params

- **String** `resPath`: The path of the resource.
- **String** `root`: The file's root path.

### `addJS(resPath, inline)`
Downloads the JS scripts from the resource.

#### Params

- **String** `resPath`: The path of the resource.
- **Boolean** `inline`: Confirms if the resource needs to be downloaded or not.

### `addCSS(resPath, inline)`
Adds a new CSS path.

#### Params

- **String** `resPath`: The CSS resource path to add.
- **Boolean** `inline`: Whether to add the CSS content inline or not.

### `bundle()`
Bundles the JavaScript and CSS resources.

#### Return
- **Promise** A promise object.

### `toObject()`
Creates an array of elements containing the resource type and the url.

E.g.:

```js
[
 { type: "script", url: "https://.../myscript.js" },
 ...
 { type: "stylesheet", url: "https://.../mystyle.css" },
]
```

#### Return
- **Array** The resources list.

### `cssHtml()`
Generates the HTML markup for CSS assets.

#### Return
- **String** The HTML markup.

### `jsHtml()`
Generates the HTML markup for JS assets.

#### Return
- **String** The HTML markup.

### `html(resources)`
Generates the HTML for both CSS and JS assets. Optionally, a custom array can be provided.

#### Params

- **Array** `resources`: An optional array of assets.

#### Return
- **String** The HTML markup.

