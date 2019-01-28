import { MongoClient } from "mongodb";
import { from, iif, of } from "rxjs";
import { concatMap, map, mapTo } from "rxjs/operators";
import { RequestHandler } from "express";

interface Item {
    key: string;
    value: number;
}

const route: RequestHandler = (req, res) => {
    const config = req.app.get("custom.config");
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
}

export default route;