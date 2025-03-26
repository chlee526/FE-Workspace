import { http, HttpResponse, delay } from 'msw';
import Chance from 'chance';

import store from '@/store';

const chance = new Chance();

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        dates.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export const volume_handlers = [
    // 키워드
    http.post(process.env.VUE_APP_BASE_API + '/api/data/getVolume.jsp', async ({ request, params, cookies }) => {
        const body = await request.json(); // convert the stream to a JavaScript object

        let result = [];

        if (body.grp?.type === 'date') {
            // 날짜별 데이터
            const startDate = body.s_date.date;
            const endDate = body.e_date.date;
            const dateRange = getDatesInRange(startDate, endDate);

            result = dateRange.map((date) => ({
                code: date,
                name: date,
                c_data: {
                    cnt: chance.integer({ min: 1000, max: 999999 }),
                    factor_per: chance.floating({ min: -100, max: 100, fixed: 1 }),
                },
            }));
        } else if (body.grp?.type) {
            let type;
            switch (body.grp.type) {
                case 'sg':
                    type = store.getters.getChns;
                    break;
                case 'senti':
                    type = store.getters.getSentis;
                    break;
                default:
                    type = [];
                    break;
            }

            result = type.map((item) => ({
                code: item.code || item.seq,
                name: item.name,
                c_data: {
                    cnt: chance.integer({ min: 1000, max: 999999 }),
                    factor_per: chance.floating({ min: -100, max: 100, fixed: 1 }),
                },
            }));
        } else {
            // 단일 데이터
            result = [
                {
                    code: '2024-01-01',
                    name: '2024-01-01',
                    c_data: {
                        cnt: chance.integer({ min: 1000, max: 999999 }),
                        factor_per: chance.floating({ min: -100, max: 100, fixed: 1 }),
                    },
                },
            ];
        }

        if (body.grp_sub) {
            result.forEach((item) => {
                body.grp_sub.code.split(',').forEach((sub) => {
                    item.c_data[`value_${sub}`] = chance.integer({ min: 0, max: 100 });
                });
            });
        }

        // 감성 포함
        if (body.senti) {
            result.forEach((item) => {
                item.c_data.value_s_1 = chance.integer({ min: 0, max: 100 });
                item.c_data.value_s_2 = chance.integer({ min: 0, max: 100 });
                item.c_data.value_s_3 = chance.integer({ min: 0, max: 100 });
            });
        }

        console.log(`Request - ${body.cmd}  >>  `, body);
        console.log(`Response - ${body.cmd}  >>  `, result);

        return new HttpResponse(JSON.stringify(result));
    }),
];
