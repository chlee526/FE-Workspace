import { http, HttpResponse, delay } from 'msw';
import Chance from 'chance';

import store from '@/store';

const chance = new Chance();

const asyncHandler = async ({ request, params, cookies }) => {
    const body = await request.json(); // convert the stream to a JavaScript object

    let result = [];
    const maxIndex = body.row_limit * 2;
    const usedIndices = new Set();

    result = Array.from({ length: body.row_limit }).map((date, idx) => {
        let randomIndex;
        do {
            randomIndex = chance.integer({ min: 1, max: maxIndex });
        } while (usedIndices.has(randomIndex));

        usedIndices.add(randomIndex);

        return {
            code: idx,
            name: `연관어 ${randomIndex}`,
            new: chance.bool(),
            cnt_d: chance.integer({ min: 0, max: 1000 }),
            cnt_p: chance.integer({ min: 0, max: 1000 }),
            senti_1: chance.integer({ min: 0, max: 1000 }),
            senti_2: chance.integer({ min: 0, max: 1000 }),
            senti_3: chance.integer({ min: 0, max: 1000 }),
            factor_cnt: chance.integer({ min: -1000, max: 1000 }),
            factor_per: chance.floating({ min: -100, max: 100, fixed: 2 }),
        };
    });

    if (body.attr_type_code) {
        // 속성이 있으면
        const arrAttrs = body.attr_type_code.split(',');
        result.forEach((item) => {
            item.attr_type_code = chance.pickone(arrAttrs);
        });
    }

    // 정렬 로직 추가
    if (body.order_type === 'T') {
        result.sort((a, b) => b.cnt_d - a.cnt_d);
    } else if (body.order_type === 'H') {
        result.sort((a, b) => {
            // new가 true인 항목을 우선 정렬
            if (a.new && !b.new) return -1;
            if (!a.new && b.new) return 1;

            // new가 같은 경우 factor_per로 정렬
            return Number(b.factor_per) - Number(a.factor_per);
        });
    }

    console.log(`Request - ${body.cmd}  >>  `, body);
    // console.log(`Response - ${body.cmd}  >>  `, result);

    return new HttpResponse(JSON.stringify(result));
};

export const rk_handlers = [
    // 일반
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordList.jsp', asyncHandler),
    // 속성
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getRelationKeywordListAttr.jsp', asyncHandler),
];
