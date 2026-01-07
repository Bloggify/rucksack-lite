## Documentation

You can see below the API reference of this module.

### `RucksackLite(options)`
Creates a new instance of `RuckasckLite`.

#### Params

- **Object** `options`: The options object:
  - `name` (String): The bundle name.
  - `bundle_dir` (String): The bundle directory.
  - `bundle_url` (String): The bundle URL.
  - `input` (String): The input file.

#### Return
- **Object** The Rucksack instance containing:
  - `options` (Object): The options object.
  - `bundle_paths` (Object): The bundle paths:
    - `js` (String): The JS bundle path.
    - `css` (String): The CSS bundle path.
  - `bundle_urls` (Object): The bundle URLs:
    - `js` (String): The JS bundle URL.
    - `css` (String): The CSS bundle URL.
  - `local` (Object): The local resources collection.
    - `js` (Array): The JS resources.
    - `css` (Array): The CSS resources.
  - `remote` (Object): The remote resources collection.
    - `js` (Array): The JS resources.
    - `css` (Array): The CSS resources.
  - `markup` (Object): The cached HTML markup:
    - `js` (String): The JS HTML markup.
    - `css` (String): The CSS HTML markup.
    - `all` (String): The combined HTML markup.

### `add(resource)`
Adds the resource to the list.

#### Params

- **String|Array|RucksackResource** `resource`: The resource path or object or an array of resources.

#### Return
- **RucksackResource** The resource object.

### bundle

Bundles the JavaScript and CSS resources.

#### Return
- **Promise** A promise object.

### `toArray()`
Creates an array of resource objects. Optionally, a type can be provided to filter the results.

E.g.:

```js
[
   {RucksackResource},
   {RucksackResource},
   ...
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

- **Array** `resources`: An array of resources.

#### Return
- **String** The HTML markup.

### `refreshMarkup()`
Refreshes the cached HTML markup.

### `RucksackResource(resource)`
Creates a new instance of `RucksackResource`.

#### Params

- **String|Object** `resource`: The resource path or object containing:
  - `path` (String): The resource path.
  - `type` (String): The resource type. Either `js` or `css`.
  - `root` (String): The root path.

#### Return
- **RucksackResource** The resource instance containing:
  - `path` (String): The resource path.
  - `root` (String): The root path.
  - `type` (String): The resource type. Either `js` or `css`.
  - `source_type` (String): The source type. Either `local` or `remote`.
  - `uri` (String): The resource URI (full path).

