Bloggify.server.page.add(/\/api\/plugin-file\/.*\/.*/, function (lien) {

    var splits = lien.pathName.split("/");

    if (splits.length <= 3) {
        return lien.end(404);
    }

    var plugin = splits[3]
      , pathToFile = splits.slice(4, splits.length).join("/")
      ;

    if (!plugin || !pathToFile) {
        return lien.end(404);
    }

    var filePath = "/" + plugin + "/client/" + pathToFile;
    lien.file(filePath, Bloggify.paths.plugins);
});
