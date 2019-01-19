let jsdom = require("jsdom-global");

const globalAny: any = global;

globalAny.document = jsdom("");
globalAny.expect = require("expect");
