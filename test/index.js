import tester from "tester"
import RucksackLite, { RucksackResource } from "../lib/index.js"

tester.describe("rucksack-lite", t => {
    t.should("create the resources", () => {
        const res = new RucksackResource("https://example.com/index.js");
        t.expect(res).toEqual({
            path: "https://example.com/index.js",
            type: "js",
            root: null,
            source_type: "remote",
            is_remote: true,
            uri: "https://example.com/index.js"
        });

        const res2 = new RucksackResource({
            path: "styles.css",
            root: "/static/assets"
        });
        t.expect(res2).toEqual({
            path: "styles.css",
            type: "css",
            root: "/static/assets",
            source_type: "local",
            is_remote: false,
            uri: "/static/assets/styles.css"
        });
    });

    t.should("detect remote paths", () => {
        t.expect(RucksackLite.isRemote("https://example.com/index.js")).toBe(true);
        t.expect(RucksackLite.isRemote("http://example.com/index.js")).toBe(true);
        t.expect(RucksackLite.isRemote("/static/index.js")).toBe(false);
        t.expect(RucksackLite.isRemote("index.js")).toBe(false);
    });

    t.should("create a RucksackLite instance", () => {
        const r = new RucksackLite({
            name: "my-app",
            bundle_dir: "/output",
            bundle_url: "/static",
            input: "main.js"
        });

        t.expect(r).toBeInstanceOf(RucksackLite);
        t.expect(r.options.name).toBe("my-app");
        t.expect(r.options.bundle_dir).toBe("/output");
        t.expect(r.options.bundle_url).toBe("/static");
        t.expect(r.options.input).toBe("main.js");
        t.expect(r.bundle_paths.js).toBe("/output/my-app.js");
        t.expect(r.bundle_paths.css).toBe("/output/my-app.css");
        t.expect(r.bundle_urls.js).toBe("/static/my-app.js");
        t.expect(r.bundle_urls.css).toBe("/static/my-app.css");
        t.expect(r.markup.js).toBe('<script src="/static/my-app.js"></script>');
    });

    t.should("add resources", () => {
        const r = new RucksackLite();
        r.add("https://example.com/index.js");
        r.add("/static/styles.css");

        t.expect(r.remote.js.length).toBe(1);
        t.expect(r.remote.js[0].path).toBe("https://example.com/index.js");
        t.expect(r.local.css.length).toBe(2);
        t.expect(r.local.css[1].path).toBe("/static/styles.css");
    });
});