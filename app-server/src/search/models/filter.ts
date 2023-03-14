import {Tags} from "../../models/tags";

export interface Filter {
    tags?: Tags[];
    wordSearch?: string;
    colors?: string[];
    limit: number;
}