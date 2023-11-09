#!/usr/bin/env node

var lcp = require("../lib/index.js");
var commandLineArgs = require("command-line-args");

var optionDefinitions = [
    { name: "port", alias: "p", type: Number, defaultValue: 8010 },
    { name: "credentials", type: Boolean, defaultValue: false },
    { name: "origin", type: String, defaultValue: "*" },
];

try {
    var options = commandLineArgs(optionDefinitions);
    lcp.startProxy(options.port, options.credentials, options.origin);
} catch (error) {
    console.error(error);
}
