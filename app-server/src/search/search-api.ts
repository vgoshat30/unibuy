import {Application, Request, Response} from "express";
import {SellingItem} from "../models/selling-item";
import {Tags} from "../models/tags";

export class SearchApi {

    sellingItems: SellingItem[] = [{
        name: 'awesome t-shirt',
        description: 'very very awesome t-shirt',
        tags: [Tags.T_SHIRT,Tags.SUMMER],
        image:'src',
        quantity: 10,
        sellersShop: {},
        creationDate: new Date(),
    },
    {
        name: 'not awesome jeans',
        description: 'very very not awesome jeans',
        tags: [Tags.JEANS, Tags.SHORT_PANTS, Tags.SUMMER],
        image:'src',
        quantity: 5,
        sellersShop: {},
        creationDate: new Date(),
    }]
    constructor(app: Application) {
        app.get('/search',this.search.bind(this))
    }

    private search(req: Request, res: Response):void {
        res.send(JSON.stringify(this.sellingItems));
    }
}