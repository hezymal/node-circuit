import * as React from "react";
import express from "express";
import mustache from "mustache-express";
import { MongoClient } from "mongodb";
import { renderToString } from "react-dom/server";
import { from, iif, of } from "rxjs";
import { filter, map, switchMap, mergeMap, tap, take, takeLast, mapTo, concatMap } from "rxjs/operators";
import Bootstrap from "./Components/Bootstrap";
import * as config from "../config.json";

const app = express();

app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", __dirname + "/Templates");

app.use(express.static("./dist"));

app.get("/", (req, res) => {
    const clientApp = renderToString(<Bootstrap />);
    const bundle = "/bundle.js"

    res.render("main", {
        title: "info-circuit",
        content: clientApp,
        bundle,
    });
});

interface Item {
    key: string;
    value: number;
}

app.get("/add", (req, res) => {
    const client = new MongoClient(config.db.url, { useNewUrlParser: true });
    from(client.connect())
        .pipe(
            map(client => client.db(config.db.name)),
            map(db => db.collection<Item>("items")),
            concatMap(items => from(items.countDocuments()).pipe(
                map(count => iif(
                    () => count === 0, 
                    of(() => items.insertMany([
                        { key: "1", value: 1 },
                        { key: "2", value: 2 },
                        { key: "3", value: 3 },
                    ])).pipe(mapTo(items)),
                    of(items),
                )),
                concatMap(items => items)
            )),
            concatMap(items => from(items.find({ key: "1" }).toArray())),
        )
        .subscribe(items => {
            client.close();

            let html = "";
            for (const item of items) {
                html += `<div>${item.value}</div>`;
            }

            res.writeHead(200);
            res.write(html);
            res.end();
        });
});

app.get("/add", async (req, res) => {
    const client = new MongoClient(config.db.url, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(config.db.name);
    const itemsCollection = db.collection<Item>("items");

    const count = await itemsCollection.countDocuments();
    if (count === 0) {
        itemsCollection.insertMany([
            { key: "1", value: 1 },
            { key: "2", value: 2 },
            { key: "3", value: 3 },
        ]);
    }

    let html = "";
    const items = await itemsCollection.find({}).toArray();
    for (const item of items) {
        html += `<div>${item.value}</div>`;
    }

    const all = await from(itemsCollection.find({}).toArray()).forEach(x => {
        x.
    });

    res.writeHead(200);
    res.write(html);
    res.end();

    client.close();
});

app.listen(config.server.port, () => {
    console.log(`Example app listening on port ${config.server.port}!`);
});
