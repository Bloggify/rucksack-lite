/**
 * serveClientFile
 * Serves client files from plugins
 *
 * @name serveClientFile
 * @function
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @return
 */
function serveClientFile(req, res) {
}

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

    var fullPath = Bloggify.ROOT + "/plugins/" + plugin + "/client/" + pathToFile;
    lien.file(fullPath);
});
