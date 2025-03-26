import { http, HttpResponse, delay } from 'msw';
import Chance from 'chance';

import store from '@/store';

const chance = new Chance();

// 연관 키워드
const asyncHandlerRK = async ({ request, params, cookies }) => {
    const body = await request.json(); // convert the stream to a JavaScript object

    const result = Array.from({ length: 40 }).map((date, idx) => {
        const name = chance.word();
        const resultData = {
            attr_type_code: chance.pickone(['top', 'hot', 'in', 'out']),
            code: name,
            name: name,
            compare_rank: chance.floating({ min: 1, max: 20 }).toFixed(1),
            cur_rank: chance.floating({ min: 1, max: 20 }).toFixed(1),
        };
        resultData.factor_rank = resultData.cur_rank - resultData.compare_rank;
        return resultData;
    });

    // console.log(`Request - ${body.cmd}  >>  `, body);
    // console.log(`Response - ${body.cmd}  >>  `, result);

    return new HttpResponse(JSON.stringify(result));
};

// 성별
const asyncHandlerGender = async ({ request, params, cookies }) => {
    const body = await request.json(); // convert the stream to a JavaScript object

    const malePercent = chance.floating({ min: 1, max: 100 }).toFixed(1);
    const result = [
        {
            male: malePercent,
            female: 100 - malePercent,
        },
    ];

    // console.log(`Request - ${body.cmd}  >>  `, body);
    // console.log(`Response - ${body.cmd}  >>  `, result);

    return new HttpResponse(JSON.stringify(result));
};

// 나이
const asyncHandlerAge = async ({ request, params, cookies }) => {
    const body = await request.json(); // convert the stream to a JavaScript object

    const malePercent = chance.floating({ min: 1, max: 100 }).toFixed(1);
    const ages = ['10', '20', '30', '40', '50', '60'];
    const result = ages.map((age, idx) => ({
        cnt: chance.integer({ min: 0, max: 1000 }),
        age: age,
    }));

    // console.log(`Request - ${body.cmd}  >>  `, body);
    // console.log(`Response - ${body.cmd}  >>  `, result);

    return new HttpResponse(JSON.stringify(result));
};

export const dlab_handlers = [
    // 연관 키워드
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordListDLab.jsp', asyncHandlerRK),
    // 성별
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getDataLabGender.jsp', asyncHandlerGender),
    // 나이
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getDataLabAge.jsp', asyncHandlerAge),
];
