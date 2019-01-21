import { RequestHandler } from "express";
import renderClient from "Root/back-client";

const route: RequestHandler = (req, res) => {
    const client = renderClient();
    const bundle = "/bundle.js";

    res.render("main", {
        title: "info-circuit",
        content: client,
        bundle,
    });
};

export default route;
