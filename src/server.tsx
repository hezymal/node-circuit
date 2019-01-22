import express from "express";
import { MongoClient } from "mongodb";
import mustache from "mustache-express";
import { from, iif, of } from "rxjs";
import { concatMap, map, mapTo } from "rxjs/operators";
import mainRoute from "Routes/main";
import * as config from "../config.json";

const app = express();

app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", __dirname + "/Templates");

app.use(express.static("./dist"));

app.get("/", mainRoute);

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

app.listen(config.server.port, () => {
    console.log(`Server listening on port: ${config.server.port}`);
});
