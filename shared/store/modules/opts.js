import { API_attrs } from '@shared/api/attrs';

import store from '@/store';

const state = {
    // 로드완료 체크
    loadingChk: false,

    // 감성
    sentis: [],

    // 채널
    channels: [],

    // 이슈
    issues: [],

    // 게시판 줄 갯수
    brdViewLen: [
        { name: '5개씩 보기', code: '5' },
        { name: '10개씩 보기', code: '10' },
        { name: '30개씩 보기', code: '30' },
        { name: '50개씩 보기', code: '50' },
        { name: '100개씩 보기', code: '100' },
    ],

    // 연관어 정렬
    rkSorts: [
        { code: 'T', name: 'TOP', before: '&#xe074;' },
        { code: 'H', name: 'HOT', before: '&#xe075;' },
    ],

    // 키워드검색 타입
    searchKeywordType: [
        { code: 'A', name: '제목+본문' },
        { code: 'T', name: '제목' },
        { code: 'C', name: '본문' },
    ],

    // 분석대상
    analTargets: {
        // 분석 대상(색상만 사용)
        default: [
            { name: '분석대상 1', color: '#6e95e5' },
            { name: '분석대상 2', color: '#6abbbb' },
            { name: '분석대상 3', color: '#cbc975' },
        ],
    },

    // 성별
    gender: [
        { code: 'ALL', name: '전체', color: '#6e95e5' },
        {
            code: 'm',
            name: '남성',
            color: '#0091FF',
        },
        {
            code: 'f',
            name: '여성',
            color: '#FF7E87',
        },
    ],

    // 연령
    age: [
        { code: '10', name: '10대' },
        { code: '20', name: '20대' },
        { code: '30', name: '30대' },
        { code: '40', name: '40대' },
        { code: '50', name: '50대' },
        { code: '60', name: '60대' },
    ],
};
const mutations = {
    SET_ATTRS_SENTIS(state, val) {
        state.sentis = val;
    },
    SET_ATTRS_CHNS(state, val) {
        state.channels = val;
    },
    SET_ATTRS_ISSUES(state, val) {
        state.issues = val;
    },
    SET_LOADING_CHK: function ($state, $val) {
        $state.loadingChk = $val;
    },
};

const actions = {
    ATTRS(context, param) {
        return new Promise((resolve, reject) => {
            API_attrs(param)
                .then((res) => {
                    // 감성
                    if (res.data.result?.ID_SENTI || res.data.result?.SENTIMENT) store.commit('opts/SET_ATTRS_SENTIS', res.data.result.ID_SENTI || res.data.result.SENTIMENT);

                    // 채널
                    if (res.data.result?.SITE_GROUP) store.commit('opts/SET_ATTRS_CHNS', res.data.result.SITE_GROUP);

                    // 이슈코드
                    if (res.data.result?.ISSUE_CODE) store.commit('opts/SET_ATTRS_ISSUES', res.data.result.ISSUE_CODE);

                    resolve(res);
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },
    LOAD_START({ commit }) {
        store.commit('opts/SET_LOADING_CHK', true);
        store.dispatch('NOTY_INFO_LONG', ['데이터를 불러오고 있습니다.', 'noty_load_start']);
    },
    LOAD_COMPLETE({ commit }) {
        store.commit('opts/SET_LOADING_CHK', false);
        store.dispatch('NOTY_CLOSE', 'noty_load_start');
        // var _store = this;
        setTimeout(function () {}, 1000);
        store.dispatch('NOTY_COM', '데이터 불러오기가 완료되었습니다.');
    },
};

export default {
    namespaced: true,
    mutations,
    actions,
    state,
};
