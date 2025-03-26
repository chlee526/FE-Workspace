import Vue from 'vue';
import Router from 'vue-router';
import { fixRoutes, scrollBehaviorGetReroadChck } from '@shared/router'; // 고정 라우터

import store from '@/store';

/**■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Router 등록/생성
 * 고정 라우터 목록
 * 404, 401, 로그인, 처음사용자 비밀번호 변경
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
Vue.use(Router);

// 컨텐츠 라우터(메뉴구성)
export const contentRoutes = [
    {
        seq: 1,
        url: '/view/commonpages',
        name: '공통/화면',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 7,
                url: '/view/commonpages/layout',
                name: '레이아웃',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 8,
                url: '/view/commonpages/colors',
                name: '컬러 정의',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
    {
        seq: 2,
        url: '/view/ui',
        name: 'UI',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 9,
                url: '/view/ui/icon',
                name: 'Icon',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 10,
                url: '/view/ui/image',
                name: 'Image',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 11,
                url: '/view/ui/tooltip',
                name: 'Tooltip',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 12,
                url: '/view/ui/helper',
                name: '도움말',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 13,
                url: '/view/ui/tree_view',
                name: '트리뷰',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 14,
                url: '/view/ui/form/button',
                name: 'Form - Button',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 15,
                url: '/view/ui/form/colorpicker',
                name: 'Form - ColorPicker',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 16,
                url: '/view/ui/form/timepicker',
                name: 'Form - TimePicker',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 17,
                url: '/view/ui/form/datepicker',
                name: 'Form - DatePicker',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 18,
                url: '/view/ui/form/checkbox',
                name: 'Form - CheckBox/Group',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 19,
                url: '/view/ui/form/radio',
                name: 'Form - Radio/Group',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 20,
                url: '/view/ui/form/selectbox',
                name: 'Form - SelectBox',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 21,
                url: '/view/ui/form/switch',
                name: 'Form - Switch',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 22,
                url: '/view/ui/form/inputbox',
                name: 'Form - InputBox',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 23,
                url: '/view/ui/form/textarea',
                name: 'Form - Textarea',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 24,
                url: '/view/ui/form/tab',
                name: 'Form - Tab',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 25,
                url: '/view/ui/form/filtergrp',
                name: 'Form - FilterGroup',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 26,
                url: '/view/ui/form/listGrp',
                name: 'Form - ListGrp',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 27,
                url: '/view/ui/form/slider',
                name: 'Form - Slider',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 28,
                url: '/view/ui/form/favorite',
                name: 'Form - 즐겨찾기',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 29,
                url: '/view/ui/form/advs',
                name: 'Form - 고급검색',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 30,
                url: '/view/ui/form/editor',
                name: 'Form - 에디터',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
    {
        seq: 3,
        name: '게시판',
        url: '/view/board',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 31,
                url: '/view/board/default',
                name: '일반형',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 32,
                url: '/view/board/data',
                name: '데이터형',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 33,
                url: '/view/board/input',
                name: '입력',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
    {
        seq: 4,
        name: '차트',
        url: '/view/chart',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 34,
                name: 'Pie',
                url: '/view/chart/pie',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 35,
                name: 'Radar',
                url: '/view/chart/radar',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 36,
                name: 'Column/Line',
                url: '/view/chart/column_line',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 37,
                name: 'Word Cloud',
                url: '/view/chart/wordcloud',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 38,
                name: 'Treemap',
                url: '/view/chart/treemap',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 39,
                name: '성별',
                url: '/view/chart/gender',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 40,
                name: '나이',
                url: '/view/chart/age',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 41,
                name: 'Gage',
                url: '/view/chart/gage',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
    {
        seq: 5,
        name: '기능',
        url: '/view/function',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 42,
                name: 'Dialog',
                url: '/view/function/dialog',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 43,
                name: 'Noty',
                url: '/view/function/noty',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 44,
                name: 'Excel',
                url: '/view/function/excel',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 45,
                name: 'Copy',
                url: '/view/function/copy',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
    {
        seq: 6,
        name: '템플릿',
        url: '/view/template',
        meta: { auth: true },
        permissions: 3,
        beforeEnter(to, from, next) {
            const sameRoute = store.getters.getRoutes.filter((route) => route.url === to.path || route.url === to.path + '/');
            const sameChildRoute = sameRoute[0].children.filter((route) => route.meta.auth);
            next(sameChildRoute[0].url);
        },
        children: [
            {
                seq: 46,
                name: '정보량',
                url: '/view/template/volume',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 47,
                name: '연관키워드',
                url: '/view/template/rkeyword',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 48,
                name: '팝업 - 관련정보',
                url: '/view/template/popup/relinfo',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 49,
                name: '팝업 - 공통(검색량/반응량/유사수량)',
                url: '/view/template/popup/other',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 50,
                name: '분류체계(브랜드)선택',
                url: '/view/template/attr_selector',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 51,
                name: '인기 검색어 순위변화',
                url: '/view/template/hot_keyword_rank_table',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 52,
                name: '성별/연령별 인기 검색어 순위',
                url: '/view/template/age_rank_table',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 53,
                name: '라이프사이클',
                url: '/view/template/inc_genderage',
                meta: { auth: true },
                permissions: 3,
            },
            {
                seq: 54,
                name: '분석대상별 언급량 점유율',
                url: '/view/template/share_comparison',
                meta: { auth: true },
                permissions: 3,
            },
        ],
    },
];

// 최초 라우터 생성

// shared의 'fixRoutes'에 'contentRoutes'를 합쳐 App에서 사용할 route정보로 변환
contentRoutes.forEach(($item) => {
    let wrapComp = fixRoutes[fixRoutes.length - 1];

    if ($item.children) {
        const item = {
            path: $item.url,
            link: $item.link,
            name: $item.name,
            meta: {
                auth: $item.meta ? $item.meta.auth : process.env.NODE_ENV == 'development' ? true : false,
            },
            beforeEnter: $item.beforeEnter,
        };
        if ($item.redirect) item.redirect = $item.redirect;
        wrapComp.children.push(item);

        $item.children.forEach(($subItem) => {
            const compName = $subItem.url.replace('/view/', '');
            const item2 = {
                path: $subItem.url,
                link: $subItem.link,
                name: $subItem.name,
                component: () => import(`@/view/${compName}`),
                meta: {
                    auth: $item.meta ? $item.meta.auth : $subItem.meta ? $subItem.meta.auth : process.env.NODE_ENV == 'development' ? true : false,
                },
                beforeEnter: $subItem.beforeEnter,
            };
            wrapComp.children.push(item2);
        });
    } else {
        const compName = $item.url.replace('/view/', '');
        const item = {
            path: $item.url,
            link: $item.link,
            name: $item.name,
            component: () => import(`@/view/${compName}`),
            meta: {
                auth: $item.meta ? $item.meta.auth : process.env.NODE_ENV == 'development' ? true : false,
            },
            beforeEnter: $item.beforeEnter,
        };
        wrapComp.children.push(item);
    }
});

// 전역 Router 선언
let router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        /**
         * router 새로고침 시 이동 되는 scroll 위치와 다른 route로 이동 시 이동하는 스크롤 영역 return
         * savePosition은 이전 페이지 기록을 담는 param
         * 이후에 뒤로가기 시 스크롤 이동 처리 개발 된다면 수정 예정
         */
        return scrollBehaviorGetReroadChck(savedPosition);
    },

    routes: fixRoutes,
});

export default router;
