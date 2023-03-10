import {Tags} from "./tags";

export interface SellingItem {
    name: string;
    description: string;
    creationDate: Date;
    quantity:number;
    image: string;
    tags: Tags[];
    sellersShop: Object;//todo: add seller object

}