Config.options.clientScripts = [];

function serveClientFile(req, res) {
    var url = req.url
      , splits = url.split("/")
      ;

    if (splits.length <= 3) {
        return Statique.error(req, res, 404);
    }

    var plugin = splits[3]
      , pathToFile = splits.slice(4, splits.length).join("/")
      ;

    if (!plugin || !pathToFile) {
        return Statique.error(req, res, 404);
    }

    var fullPath = Config.root + "/plugins/" + plugin + "/client/" + pathToFile;
    Statique.serveFile(fullPath, 200, res, req, {}, "/");
}

Statique._regexpRoutes.push({
    regexp: /\/api\/serve-file\/.*\/.*/
  , type: "regexp"
  , url: {
        get: serveClientFile
    }
});
