export class MongoInterface{
    protected mapResponseToObject<T>(res): T{
        const val:T = res.toObject();
        val["_id"] = undefined;
        return val;
    }
}