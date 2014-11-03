Bloggify.server.page.add(/\/api\/plugin-file\/.*\/.*/, function (lien) {

    var splits = lien.pathName.split("/");

    if (splits.length <= 3) {
        return Statique.error(req, res, 404);
    }

    var plugin = splits[3]
      , pathToFile = splits.slice(4, splits.length).join("/")
      ;

    if (!plugin || !pathToFile) {
        return Statique.error(req, res, 404);
    }

    var filePath = "/plugins/" + plugin + "/client/" + pathToFile;
    lien.file(filePath, Bloggify.ROOT);
});
