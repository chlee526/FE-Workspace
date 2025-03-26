import { http, HttpResponse, delay } from 'msw';
import Chance from 'chance';
import moment from 'moment';

import store from '@/store';

const chance = new Chance();

const asyncHandler = async ({ request, params, cookies }) => {
    const body = await request.json(); // convert the stream to a JavaScript object

    const result = {
        total_cnt: chance.integer({ min: 1, max: 9999 }),
        list: [],
    };

    result.list = Array.from({ length: body.row_limit }).map((date, idx) => {
        return {
            URL: chance.url(),
            CAFE_URL: chance.url(),
            SG_SEQ: chance.pickone(['DN', 'BL', 'NS', 'DM']),
            S_SEQ: chance.integer({ min: 1000, max: 9999 }),
            SITE_NAME: chance.company(),
            TITLE: chance.sentence({ words: 5 }),
            CONTENT: chance.paragraph(),
            REG_DATE: moment(chance.date()).format('YYYY-MM-DD'),
            POPULARITY: chance.integer({ min: 0, max: 1000 }),
        };
    });

    // console.log(`Request - ${body.cmd}  >>  `, body);
    // console.log(`Response - ${body.cmd}  >>  `, result);

    return new HttpResponse(JSON.stringify(result));
};

export const rd_handlers = [http.post(process.env.VUE_APP_BASE_API + '/api/data/getRawDataList.jsp', asyncHandler)];
