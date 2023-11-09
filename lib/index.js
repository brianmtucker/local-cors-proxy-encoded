var express = require("express");
var request = require("request");
var cors = require("cors");
var chalk = require("chalk");
var url = require("url");
var proxy = express();

var startProxy = function (port, credentials, origin) {
    proxy.use(cors({ credentials: credentials, origin: origin }));
    proxy.options("*", cors({ credentials: credentials, origin: origin }));

    proxy.use("/*", function (req, res) {
        var fullUrl = decodeURIComponent(req.params[0]);
        try {
            // Ensure the URL starts with http:// or https://
            if (!/^https?:\/\//i.test(fullUrl)) {
                throw new Error("Invalid URL");
            }
            var parsedUrl = url.parse(fullUrl);
            console.log(chalk.green("Request Proxied -> " + parsedUrl.href));
            req.pipe(
                request(parsedUrl.href).on("response", (response) => {
                    const accessControlAllowOriginHeader = response.headers["access-control-allow-origin"];
                    if (accessControlAllowOriginHeader && accessControlAllowOriginHeader !== origin) {
                        console.log(chalk.blue("Override access-control-allow-origin header from proxified URL : " + chalk.green(accessControlAllowOriginHeader) + "\n"));
                        response.headers["access-control-allow-origin"] = origin;
                    }
                })
            ).pipe(res);
        } catch (e) {
            res.status(500).send("Proxy error: " + e.message);
        }
    });

    proxy.listen(port);

    console.log(chalk.bgGreen.black.bold.underline("\n Proxy Active \n"));
    console.log(chalk.blue("PORT: " + chalk.green(port)));
    console.log(chalk.blue("Credentials: " + chalk.green(credentials)));
    console.log(chalk.blue("Origin: " + chalk.green(origin) + "\n"));
    console.log(chalk.cyan("To start using the proxy simply replace your url with: " + chalk.bold("http://localhost:" + port + "/[encoded_full_url_here]") + "\n"));
};

exports.startProxy = startProxy;
