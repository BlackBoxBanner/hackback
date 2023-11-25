"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = void 0;
function Get(req, res, next) {
    res.json({
        method: "GET",
        message: "Express template",
        query: req.query
    });
}
exports.Get = Get;
function Post(req, res, next) {
    res.json({
        method: "POST",
        message: "Express template",
        body: req.body
    });
}
exports.Post = Post;
