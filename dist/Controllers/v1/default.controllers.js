"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
function Get(req, res, next) {
    res.json({
        method: "GET",
        message: "GET Method is working",
        query: req.query
    });
}
exports.Get = Get;
function Post(req, res, next) {
    res.json({
        method: "POST",
        message: "POST Method is working",
        body: req.body
    });
}
exports.Post = Post;
