import {Filter} from "../models/filter";
import {MongoConnector} from "../../mongo-connector/mongo-connector";
import {MongoInterface} from "../../mongo-connector/out/mongo-interface";
import {SellingItem} from "../../models/selling-item";

export class MongoSearcher extends MongoInterface{
    private sellingItemModel: any;

    constructor(mongoConnector:MongoConnector) {
        super();
        this.sellingItemModel = mongoConnector.sellingItemModel;
    }

    search(filter:Filter): SellingItem[]{
        const result = this.sellingItemModel
            .find({
                name: filter.wordSearch,
                description: filter.wordSearch,
                tags: {$some: filter.tags},
                colors: {$some: filter.colors}
            })
            .limit(filter.limit);
        return result.map(this.mapResponseToObject<SellingItem[]>);
    }
    insert(selling) {
        const result = this.sellingItemModel
            .insert(selling);
    }
}