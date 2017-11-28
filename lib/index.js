"use strict";

const isRemote = require("url-remote")
    , typpy = require("typpy")
    ;

module.exports = class RucksackLite {

    /**
     * Ruckasck
     * Creates a new instance of `Ruckasck`.
     *
     * @param  {Object} opts The Rucksack options.
     * @return {Object}      The Rucksack instance.
     */
    constructor (opts) {
        opts = this.opts = opts || {}

        this.scripts = [
            this.opts.jsUrl
        ];

        this.stylesheets = [
            this.opts.cssUrl
        ];

        this.cssPaths = [];

        this.remote = {
            js: []
          , css: []
        };
    }


    /**
     * add
     * Downloads the script from the resource file.
     *
     * @param  {String} resPath The path of the resource.
     * @param  {String} root    The file's root path.
     */
    add (resPath, root) {

        let type = "";
        let inline = false;
        if (typpy(resPath, Object)) {
            if (resPath.type) {
                type = resPath.type;
                resPath = resPath.url;
                inline = resPath.inline;
            } else {
                this.add(resPath.styles, root);
                this.add(resPath.scripts, root);
                return;
            }
        } else if (typpy(resPath, Array)) {
            resPath.forEach(c => this.add(c, root));
            return;
        } else if (!typpy(resPath, String)) {
            return;
        }

        if (!isRemote(resPath) && typpy(root, String)) {
            resPath = root + "/" + resPath;
        }

        if (!type) {
            if (resPath.endsWith(".js")) {
                type = "js";
            } else if (resPath.endsWith(".css")) {
                type = "css";
            }
        }

        switch (type) {
            case "js":
                this.addJS(resPath, inline);
                break;
            case "css":
                this.addCSS(resPath, inline);
                break;
            default:
                throw new Error("Unknown resource type.");
                break;
        }
    }

    /**
     * addJS
     * Downloads the JS scripts from the resource.
     *
     * @param  {String} resPath The path of the resource.
     * @param  {Boolean} inline Confirms if the resource needs to be downloaded or not.
     */
    addJS (resPath, inline) {
        let pathIsRemote = isRemote(resPath);
        if (pathIsRemote) {
            if (inline === true) {
                this.remote.js.push(resPath);
            } else {
                this.scripts.push(resPath);
            }
        } else {
            if (this.browserify) {
                this.browserify.add(resPath);
            }
        }
    }

    /**
     * addCSS
     * Adds a new CSS path.
     *
     * @name addCSS
     * @function
     * @param {String} resPath The CSS resource path to add.
     * @param {Boolean} inline Whether to add the CSS content inline or not.
     */
    addCSS (resPath, inline) {
        this.cssPaths.push(resPath);
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
    bundle () {
        return new Promise((res, rej) => {
            this.bundleJS(null, err => {
                if (err) { return rej(err); }
                this.bundleCSS(null, err => {
                    if (err) { return rej(err); }
                    res();
                });
            });
        });
    }


    /**
     * toObject
     * Creates an array of elements containing the resource type and the url.
     *
     * E.g.:
     *
     * ```js
     * [
     *  { type: "script", url: "https://.../myscript.js" },
     *  ...
     *  { type: "stylesheet", url: "https://.../mystyle.css" },
     * ]
     * ```
     *
     * @name toObject
     * @return {Array}  The resources list.
     */
    toObject () {
        let resources = [];
        resources.push.apply(resources, this.scripts.map(c => ({
            type: "script"
          , url: c
        })));
        resources.push.apply(resources, this.stylesheets.map(c => ({
            type: "stylesheet"
          , url: c
        })));
        return resources;
    }


    /**
     * cssHtml
     * Generates the HTML markup for CSS assets.
     *
     * @name cssHtml
     * @return {String} The HTML markup.
     */
    cssHtml () {
        return this.html(this.toObject().filter(c => c.type === "stylesheet"));
    }


    /**
     * jsHtml
     * Generates the HTML markup for JS assets.
     *
     * @name jsHtml
     * @return {String} The HTML markup.
     */
    jsHtml () {
        return this.html(this.toObject().filter(c => c.type === "script"));
    }


    /**
     * html
     * Generates the HTML for both CSS and JS assets. Optionally, a custom array can be provided.
     *
     * @param  {Array} resources An optional array of assets.
     * @return {String}          The HTML markup.
     */
    html (resources) {
        resources = resources || this.toObject();
        return resources.map(c => {
            switch (c.type) {
                case "script":
                    return `<script src="${c.url}"></script>`;
                case "stylesheet":
                    return `<link rel="stylesheet" href="${c.url}" />`
                default:
                    throw new Error("Invalid resource type.");
            }
        }).join("\n")
    }
};
