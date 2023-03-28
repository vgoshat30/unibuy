import {Filter} from "../models/filter";
import {MongoConnector} from "../../mongo-connector/mongo-connector";
import {MongoInterface} from "../../mongo-connector/out/mongo-interface";
import {SellingItem} from "../../models/selling-item";

export class MongoSearcher extends MongoInterface{

    constructor(mongoConnector:MongoConnector) {
        super(mongoConnector);
    }

    async search(filter:Filter): Promise<SellingItem[]> {
        const findObject = {
            $and: [
                ...(filter.wordSearch ? [{
                    $or: [{name: {$regex: filter.wordSearch, $options: 'i'}},
                        {description: {$regex: filter.wordSearch, $options: 'i'}}]
                }] : []),
                ...(filter.tags ? [{tags: {$in: filter.tags}}] : []),
                ...(filter.colors ? [{colors: {$in: filter.colors}}] : [])
            ]
        }
        const result = await this.sellingItemModel
            .find({...findObject})
            .limit(filter.limit);
        return result.map(this.mapResponseToObject<SellingItem[]>);
    }
}