import {Application, Request, Response} from "express";
import {SellingItem} from "../models/selling-item";
import {MongoInterface} from "../mongo-connector/out/mongo-interface";

export class ShopApi {

    constructor(app: Application, private mongoInterface:MongoInterface) {
        app.post('/shop/insert', this.insert.bind(this))
    }

    private async insert(req: Request, res: Response): Promise<void> {
        try {
            const sellingItems: SellingItem[] = req.body;
            console.log(`inserting ${JSON.stringify(sellingItems)}`);
            await this.mongoInterface.insert(sellingItems);
            res.send({inserted: true});
        } catch (err) {
            console.error(err);
        }
    }
}