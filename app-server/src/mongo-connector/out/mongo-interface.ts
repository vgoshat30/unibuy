import {SellingItem} from "../../models/selling-item";
import {MongoConnector} from "../mongo-connector";

export class MongoInterface{
    protected sellingItemModel: any;

    constructor(mongoConnector:MongoConnector) {
        this.sellingItemModel = mongoConnector.sellingItemModel;
    }

    protected mapResponseToObject<T>(res): T{
        const val:T = res.toObject();
        val["_id"] = undefined;
        return val;
    }

    insert(selling: SellingItem[]) {
        const result = this.sellingItemModel.collection
            .insertMany(selling);
    }
}