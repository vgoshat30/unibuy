import {Tags} from "./tags.model";

export interface Filter {
    tags?: Tags[];
    wordSearch?: string;
    colors?: string[];
    limit: number;
}
