import opts from '@shared/store/modules/opts';

import store from '@/store';

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * State
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

// 감성
opts.state.sentis = [
    {
        code: 's_1',
        color: '#78B4DC',
        name: '긍정',
    },
    {
        code: 's_2',
        color: '#E25B5B',
        name: '부정',
    },
    {
        code: 's_3',
        color: '#A5A5A5',
        name: '중립',
    },
];

// 채널
opts.state.channels = [
    {
        code: 'c_1',
        color: '#48B8C8',
        name: '뉴스',
    },
    {
        code: 'c_2',
        color: '#A5D148',
        name: '커뮤니티',
    },
    {
        code: 'c_3',
        color: '#62A87E',
        name: '블로그',
    },
    {
        code: 'c_4',
        color: '#E46F1A',
        name: '카페',
    },
    {
        code: 'c_5',
        color: '#6BB3DC',
        name: '트위터',
    },
    {
        code: 'c_6',
        color: '#B05BCE',
        name: '인스타그램',
    },
    {
        code: 'c_7',
        color: '#C24343',
        name: '유튜브',
    },
    {
        code: 'c_8',
        color: '#738EEC',
        name: '페이스북',
    },
    {
        code: 'c_9',
        color: '#348E94',
        name: '지식인',
    },
    {
        code: 'c_10',
        color: '#CDCDCD',
        name: '기타',
    },
];

// 버즈타입
opts.state.buzzType = [
    { code: '1', name: 'News', color: '#8ea1e0' },
    { code: '2', name: 'Organic', color: '#f0b86f' },
    { code: '3', name: 'Owned', color: '#77b7c9' },
    { code: '4', name: 'Paid', color: '#ccd57c' },
];
// TPOP
opts.state.tpop = [
    { code: '1', name: 'Time' },
    { code: '2', name: 'Place' },
    { code: '3', name: 'Occasion' },
    { code: '4', name: 'Person' },
];
// 관능어
opts.state.sensuality = [
    { code: '1', name: '식감', color: '#8c59ff' },
    { code: '2', name: '맛', color: '#ed69f5' },
    { code: '3', name: '향', color: '#34bdc9' },
    { code: '4', name: '색', color: '#ABC834' },
    { code: '5', name: '모양', color: '#69B229' },
    { code: '6', name: '온도', color: '#28AA53' },
];
// 점포유형
opts.state.storeType = [
    { code: '1', name: '주거지' },
    { code: '2', name: '생활번화가' },
    { code: '3', name: '근무지' },
    { code: '4', name: '영파워' },
    { code: '4', name: '여행지' },
];
// 연관키워드 속성
opts.state.rkAttrs = {
    // 기본
    default: [
        [
            { code: '1_1', name: '자사', color: '#53C2F0' },
            { code: '1_2', name: '경쟁사', color: '#F1711B' },
        ],
        [
            {
                code: '',
                name: '제품군',
                color: '#77c976',
                children: [
                    { code: '11_1', name: 'TFT' },
                    { code: '11_2', name: '식품' },
                ],
            },
        ],
        [{ code: '4_5', name: '평가', color: '#FFA901' }],
        [{ code: '4_4', name: '이슈', color: '#2DB24A' }],
        [{ code: '3_2', name: '긴급', color: '#F77890' }],
    ],
    // 속성 1
    attr01: [
        [
            { code: 's_1', name: '긍정', color: '#5BA1E0' },
            { code: 's_2', name: '부정', color: '#EA7071' },
        ],
    ],
};
// 분석대상
opts.state.analTargets.comp = [
    { code: '2_1', pcode: '1_1', color: '#8c59ff', name: '빙그레' },
    { code: '2_3', pcode: '1_2', color: '#ed69f5', name: '남양유업' },
    { code: '2_4', pcode: '1_2', color: '#34bdc9', name: '동원F&B' },
    { code: '2_5', pcode: '1_2', color: '#ABC834', name: '롯데제과/푸드' },
    { code: '2_6', pcode: '1_2', color: '#69B229', name: '매일유업' },
    { code: '2_7', pcode: '1_2', color: '#28AA53', name: '서울우유' },
];

opts.state.ranks = {
    default: [
        { rank: '3', color: '#ed9595' },
        { rank: '6', color: '#bad357' },
        { rank: '10', color: '#7ec5df' },
        { rank: '', color: '#c7c7c7' },
    ],
};

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Mutation
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Action
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

export default opts;
