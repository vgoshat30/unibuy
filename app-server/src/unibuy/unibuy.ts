import path from "path";
import express from 'express'
import {SearchApi} from "../search/search-api";

export class Unibuy {

    init() {
        const app = express();
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'pug');
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));
        new SearchApi(app);
        app.listen(8080, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:8080`);
        });
    }
}