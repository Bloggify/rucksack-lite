class RucksackLite {

    /**
     * Creates a new instance of `RuckasckLite`.
     *
     * @name RucksackLite
     * @function
     * @param  {Object} options The options object:
     * 
     *   - `name` (String): The bundle name.
     *   - `bundle_dir` (String): The bundle directory.
     *   - `bundle_url` (String): The bundle URL.
     *   - `input` (String): The input file.
     * 
     * @return {Object} The Rucksack instance containing:
     * 
     *   - `options` (Object): The options object.
     *   - `bundle_paths` (Object): The bundle paths:
     *     - `js` (String): The JS bundle path.
     *     - `css` (String): The CSS bundle path.
     *   - `bundle_urls` (Object): The bundle URLs:
     *     - `js` (String): The JS bundle URL.
     *     - `css` (String): The CSS bundle URL.
     *   - `local` (Object): The local resources collection.
     *     - `js` (Array): The JS resources.
     *     - `css` (Array): The CSS resources.
     *   - `remote` (Object): The remote resources collection.
     *     - `js` (Array): The JS resources.
     *     - `css` (Array): The CSS resources.
     *   - `markup` (Object): The cached HTML markup:
     *     - `js` (String): The JS HTML markup.
     *     - `css` (String): The CSS HTML markup.
     *     - `all` (String): The combined HTML markup.
     */
    constructor (options = {}) {
        this.options = {
            name: "bundle",
            bundle_dir: "./dist",
            bundle_url: "/static",
            input: "main.js",
            ...options
        }

        this.bundle_paths = {
            js: `${this.options.bundle_dir}/${this.options.name}.js`,
            css: `${this.options.bundle_dir}/${this.options.name}.css`
        }

        this.bundle_urls = {
            js: `${this.options.bundle_url}/${this.options.name}.js`,
            css: `${this.options.bundle_url}/${this.options.name}.css`
        }

        this.local = {
            js: [],
            css: []
        }

        this.remote = {
            js: [],
            css: []
        }

        this.markup = {
            js: "",
            css: "",
            all: ""
        }

        this.add([
            this.bundle_urls.js,
            this.bundle_urls.css
        ]);        
    }

    /**
     * add
     * Adds the resource to the list.
     *
     * @param  {String|Array|RucksackResource} resource The resource path or object or an array of resources.
     * @returns {RucksackResource} The resource object.
     */
    add (resource) {
        if (Array.isArray(resource)) {
            return resource.map(c => this.add(c));
        }
        resource = new RucksackResource(resource);

        const sourceCollection = this[resource.source_type];
        if (sourceCollection) {
            const typeCollection = sourceCollection[resource.type];
            if (typeCollection) { 
                typeCollection.push(resource);
            } else {
                throw new Error(`Invalid resource type: ${resource.type}`);
            }
        } else {
            throw new Error(`Invalid source type: ${resource.source_type}`);
        }

        this.refreshMarkup();

        return resource;
    }

    bundleJS () {
        throw new Error("Not implemented. Use the `rucksack` package to bundle JavaScript resources.")
    }

    bundleCSS () {
        throw new Error("Not implemented. Use the `rucksack` package to bundle CSS resources.")
    }

    /**
     * bundle
     * Bundles the JavaScript and CSS resources.
     *
     * @name bundle
     * @return {Promise} A promise object.
     */
    async bundle () {
        try {
            await this.bundleJS();
        } catch (e) {
            console.error("Error while bundling JS:", e);
        }

        try {
            await this.bundleCSS();
        } catch (e) {
            console.error("Error while bundling CSS:", e);
        }
    }

    /**
     * toArray
     * Creates an array of resource objects. Optionally, a type can be provided to filter the results.
     *
     * E.g.:
     *
     * ```js
     * [
     *    {RucksackResource},
     *    {RucksackResource},
     *    ...
     * ]
     * ```
     *
     * @name toArray
     * @return {Array} The resources list.
     */
    toArray (type) {
        if (type) {
            return [
                ...this.local[type],
                ...this.remote[type]
            ]
        }

        return [
            ...this.local.js,
            ...this.remote.js,
            ...this.local.css,
            ...this.remote.css
        ]
    }

    /**
     * cssHtml
     * Generates the HTML markup for CSS assets.
     *
     * @name cssHtml
     * @return {String} The HTML markup.
     */
    cssHtml () {
        return this.html(this.toArray("css"));
    }


    /**
     * jsHtml
     * Generates the HTML markup for JS assets.
     *
     * @name jsHtml
     * @return {String} The HTML markup.
     */
    jsHtml () {
        return this.html(this.toArray("js"));
    }

    /**
     * html
     * Generates the HTML for both CSS and JS assets. Optionally, a custom array can be provided.
     *
     * @param  {Array} resources An array of resources.
     * @name html
     * @return {String} The HTML markup.
     */
    html (resources) {
        resources = resources || this.toArray();
        return resources.map(c => {
            switch (c.type) {
                case "js":
                    return `<script src="${c.uri}"></script>`;
                case "css":
                    return `<link rel="stylesheet" href="${c.uri}" />`
                default:
                    throw new Error("Invalid resource type.");
            }
        }).join("\n")
    }

    /**
     * refreshMarkup
     * Refreshes the cached HTML markup.
     *
     * @name refreshMarkup
     */
    refreshMarkup () {
        this.markup = {
            js: this.jsHtml(),
            css: this.cssHtml(),
            all: this.html()
        }
    }

    static isRemote (path) {
        return /^https?:\/\//.test(path);
    }

}

class RucksackResource {

    /**
     * RucksackResource
     * Creates a new instance of `RucksackResource`.
     * 
     * @name RucksackResource
     * @function
     * @param  {String|Object} resource The resource path or object containing:
     * 
     *   - `path` (String): The resource path.
     *   - `type` (String): The resource type. Either `js` or `css`.
     *   - `root` (String): The root path.
     * 
     * @returns {RucksackResource} The resource instance containing:
     * 
     *   - `path` (String): The resource path.
     *   - `root` (String): The root path.
     *   - `type` (String): The resource type. Either `js` or `css`.
     *   - `source_type` (String): The source type. Either `local` or `remote`.
     *   - `uri` (String): The resource URI (full path).
     * 
     */
    constructor (resource) {

        if (typeof resource === "string") {
            resource = { path: resource };
        }

        this.path = resource.path;
        this.type = resource.type || null;
        this.root = resource.root || null;
        this.source_type = RucksackLite.isRemote(this.path) ? "remote" : "local";
        this.is_remote = this.source_type === "remote";

        if (!this.is_remote && this.root) {
            this.uri = (`${this.root}/${this.path}`).replace(/\/\/+/g, "/");
        } else {
            this.uri = this.path;
        }

        if (!this.type) {
            if (this.path.endsWith(".js")) {
                this.type = "js";
            } else if (this.path.endsWith(".css")) {
                this.type = "css";
            }
        }
    }
}

export default RucksackLite;
export { RucksackResource };