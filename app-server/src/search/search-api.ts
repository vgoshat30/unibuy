import {Application, Request, Response} from "express";
import {SellingItem} from "../models/selling-item";
import {Tags} from "../models/tags";
import {Filter} from "./models/filter";
import {MongoSearcher} from "./out/mongo-searcher";

export class SearchApi {

    sellingItems: SellingItem[] = [{
        name: 'awesome t-shirt',
        colors: ['red'],
        description: 'very very awesome t-shirt',
        tags: [Tags.T_SHIRT,Tags.SUMMER],
        image:'src',
        quantity: 10,
        sellersShop: {},
        creationDate: new Date(),
    },
    {
        name: 'not awesome jeans',
        colors: ['red'],
        description: 'very very not awesome jeans',
        tags: [Tags.JEANS, Tags.SHORT_PANTS, Tags.SUMMER],
        image:'src',
        quantity: 5,
        sellersShop: {},
        creationDate: new Date(),
    }];

    constructor(app: Application, private mongoSearcher:MongoSearcher) {
        app.post('/search',this.search.bind(this))
    }

    private search(req: Request, res: Response):void {
        const filter:Filter = req.body;
        this.mongoSearcher.insert(this.sellingItems);
        res.send(JSON.stringify(this.mongoSearcher.search(filter)));
    }
}