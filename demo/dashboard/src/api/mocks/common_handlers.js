import { http, HttpResponse } from 'msw';

export const common_handlers = [
    // 로그인
    http.post(process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_LOGIN, () => {
        return new HttpResponse(null, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                Accesstoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25vIjoiMyIsImlzcyI6ImZlIiwic3ViIjoiZmUiLCJleHAiOjE3MDA0OTk1ODksImlhdCI6MTcwMDQ2NzE4OX0.e_w8rep-gU6yWHoDjkPKblbC0UVctAVFIbMaaz2j2Z0',
                Refreshtoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25vIjoiMyIsImlzcyI6ImZlIiwic3ViIjoiZmUiLCJleHAiOjE3MDA1MTAzODksImlhdCI6MTcwMDQ2NzE4OX0.6fHQeS0SRRlH05Qb_JhTrUyRoQrtn09NrrU60R92HpY',
            },
            body: JSON.stringify({ name: 'fe', auth: '1', user_no: '3' }),
        });
    }),
    // 로그아웃
    http.post(process.env.VUE_APP_BASE_API + '/api/auth/logout.jsp', () => {
        return new HttpResponse(null, {
            status: 200,
        });
    }),
    // 라우터
    http.post(process.env.VUE_APP_BASE_API + '/api/user/route.jsp', () => {
        return HttpResponse.json({
            result: {
                user: {
                    auth: '1',
                    id: 'fe',
                    name: 'fe',
                    user_no: '3',
                },
                route: [
                    {
                        seq: 1,
                        url: '/view/commonpages',
                        name: '공통/화면',
                        permissions: 3,
                        children: [
                            {
                                seq: 7,
                                url: '/view/commonpages/layout',
                                name: '레이아웃',
                                permissions: 3,
                            },
                            {
                                seq: 8,
                                url: '/view/commonpages/colors',
                                name: '컬러 정의',
                                permissions: 3,
                            },
                        ],
                    },
                    {
                        seq: 2,
                        url: '/view/ui',
                        name: 'UI',
                        permissions: 3,
                        children: [
                            {
                                seq: 9,
                                url: '/view/ui/icon',
                                name: 'Icon',
                                permissions: 3,
                            },
                            {
                                seq: 10,
                                url: '/view/ui/image',
                                name: 'Image',
                                permissions: 3,
                            },
                            {
                                seq: 11,
                                url: '/view/ui/tooltip',
                                name: 'Tooltip',
                                permissions: 3,
                            },
                            {
                                seq: 12,
                                url: '/view/ui/helper',
                                name: '도움말',
                                permissions: 3,
                            },
                            {
                                seq: 13,
                                url: '/view/ui/tree_view',
                                name: '트리뷰',
                                permissions: 3,
                            },
                            {
                                seq: 14,
                                url: '/view/ui/form/button',
                                name: 'Form - Button',
                                permissions: 3,
                            },
                            {
                                seq: 15,
                                url: '/view/ui/form/colorpicker',
                                name: 'Form - ColorPicker',
                                permissions: 3,
                            },
                            {
                                seq: 16,
                                url: '/view/ui/form/timepicker',
                                name: 'Form - TimePicker',
                                permissions: 3,
                            },
                            {
                                seq: 17,
                                url: '/view/ui/form/datepicker',
                                name: 'Form - DatePicker',
                                permissions: 3,
                            },
                            {
                                seq: 18,
                                url: '/view/ui/form/checkbox',
                                name: 'Form - CheckBox/Group',
                                permissions: 3,
                            },
                            {
                                seq: 19,
                                url: '/view/ui/form/radio',
                                name: 'Form - Radio/Group',
                                permissions: 3,
                            },
                            {
                                seq: 20,
                                url: '/view/ui/form/selectbox',
                                name: 'Form - SelectBox',
                                permissions: 3,
                            },
                            {
                                seq: 21,
                                url: '/view/ui/form/switch',
                                name: 'Form - Switch',
                                permissions: 3,
                            },
                            {
                                seq: 22,
                                url: '/view/ui/form/inputbox',
                                name: 'Form - InputBox',
                                permissions: 3,
                            },
                            {
                                seq: 23,
                                url: '/view/ui/form/textarea',
                                name: 'Form - Textarea',
                                permissions: 3,
                            },
                            {
                                seq: 24,
                                url: '/view/ui/form/tab',
                                name: 'Form - Tab',
                                permissions: 3,
                            },
                            {
                                seq: 25,
                                url: '/view/ui/form/filtergrp',
                                name: 'Form - FilterGroup',
                                permissions: 3,
                            },
                            {
                                seq: 26,
                                url: '/view/ui/form/listGrp',
                                name: 'Form - ListGrp',
                                permissions: 3,
                            },
                            {
                                seq: 27,
                                url: '/view/ui/form/slider',
                                name: 'Form - Slider',
                                permissions: 3,
                            },
                            {
                                seq: 28,
                                url: '/view/ui/form/favorite',
                                name: 'Form - 즐겨찾기',
                                permissions: 3,
                            },
                            {
                                seq: 29,
                                url: '/view/ui/form/advs',
                                name: 'Form - 고급검색',
                                permissions: 3,
                            },
                            {
                                seq: 30,
                                url: '/view/ui/form/editor',
                                name: 'Form - 에디터',
                                permissions: 3,
                            },
                        ],
                    },
                    {
                        seq: 3,
                        name: '게시판',
                        url: '/view/board',
                        permissions: 3,
                        children: [
                            {
                                seq: 31,
                                url: '/view/board/default',
                                name: '일반형',
                                permissions: 3,
                            },
                            {
                                seq: 32,
                                url: '/view/board/data',
                                name: '데이터형',
                                permissions: 3,
                            },
                            {
                                seq: 33,
                                url: '/view/board/input',
                                name: '입력',
                                permissions: 3,
                            },
                        ],
                    },
                    {
                        seq: 4,
                        name: '차트',
                        url: '/view/chart',
                        permissions: 3,
                        children: [
                            {
                                seq: 34,
                                name: 'Pie',
                                url: '/view/chart/pie',
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
                                permissions: 3,
                            },
                            {
                                seq: 37,
                                name: 'Word Cloud',
                                url: '/view/chart/wordcloud',
                                permissions: 3,
                            },
                            {
                                seq: 38,
                                name: 'Treemap',
                                url: '/view/chart/treemap',
                                permissions: 3,
                            },
                            {
                                seq: 39,
                                name: '성별',
                                url: '/view/chart/gender',
                                permissions: 3,
                            },
                            {
                                seq: 40,
                                name: '나이',
                                url: '/view/chart/age',
                                permissions: 3,
                            },
                            {
                                seq: 41,
                                name: 'Gage',
                                url: '/view/chart/gage',
                                permissions: 3,
                            },
                        ],
                    },
                    {
                        seq: 5,
                        name: '기능',
                        url: '/view/function',
                        permissions: 3,
                        children: [
                            {
                                seq: 42,
                                name: 'Dialog',
                                url: '/view/function/dialog',
                                permissions: 3,
                            },
                            {
                                seq: 43,
                                name: 'Noty',
                                url: '/view/function/noty',
                                permissions: 3,
                            },
                            {
                                seq: 44,
                                name: 'Excel',
                                url: '/view/function/excel',
                                permissions: 3,
                            },
                            {
                                seq: 45,
                                name: 'Copy',
                                url: '/view/function/copy',
                                permissions: 3,
                            },
                        ],
                    },
                    {
                        seq: 6,
                        name: '템플릿',
                        url: '/view/template',
                        permissions: 3,
                        children: [
                            {
                                seq: 46,
                                name: '정보량',
                                url: '/view/template/volume',
                                permissions: 3,
                            },
                            {
                                seq: 47,
                                name: '연관키워드',
                                url: '/view/template/rkeyword',
                                permissions: 3,
                            },
                            {
                                seq: 48,
                                name: '팝업 - 관련정보',
                                url: '/view/template/popup/relinfo',
                                permissions: 3,
                            },
                            {
                                seq: 49,
                                name: '팝업 - 공통(검색량/반응량/유사수량)',
                                url: '/view/template/popup/other',
                                permissions: 3,
                            },
                            {
                                seq: 50,
                                name: '분류체계(브랜드)선택',
                                url: '/view/template/attr_selector',
                                permissions: 3,
                            },
                            {
                                seq: 51,
                                name: '인기 검색어 순위변화',
                                url: '/view/template/hot_keyword_rank_table',
                                permissions: 3,
                            },
                            {
                                seq: 52,
                                name: '성별/연령별 인기 검색어 순위',
                                url: '/view/template/age_rank_table',
                                permissions: 3,
                            },
                            {
                                seq: 53,
                                name: '라이프사이클',
                                url: '/view/template/inc_genderage',
                                permissions: 3,
                            },
                            {
                                seq: 54,
                                name: '분석대상별 언급량 점유율',
                                url: '/view/template/share_comparison',
                                permissions: 3,
                            },
                        ],
                    },
                ],
            },
        });
    }),
    // 공용코드
    http.post(process.env.VUE_APP_BASE_API + '/api/admin/common', async ({ request, params, cookies }) => {
        const body = await request.json();
        let result = {};
        // 공용코드
        if (body.cmd === 'CG') {
            result = {
                list: [
                    {
                        seq: 1,
                        code: 1,
                        name: '채널',
                        level: '1',
                        color: '',
                        children: [
                            {
                                cmm_type: 1,
                                seq: 2,
                                code: 1,
                                name: '뉴스',
                                level: '2',
                                color: '',
                            },
                            {
                                cmm_type: 1,
                                seq: 25,
                                code: 2,
                                name: '포털',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 3,
                                code: 3,
                                name: '블로그',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 4,
                                code: 4,
                                name: '카페',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 5,
                                code: 5,
                                name: '커뮤니티',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 6,
                                code: 6,
                                name: '트위터',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 8,
                                code: 8,
                                name: '인스타그램',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 1,
                                seq: 7,
                                code: 9,
                                name: '유튜브',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 9,
                        code: 2,
                        name: '1차 필터링 조건',
                        level: '1',
                        color: null,
                        children: [
                            {
                                cmm_type: 2,
                                seq: 10,
                                code: 1,
                                name: '제목 + 내용',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 2,
                                seq: 11,
                                code: 2,
                                name: '제목',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 2,
                                seq: 12,
                                code: 3,
                                name: '내용',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 2,
                                seq: 24,
                                code: 4,
                                name: '메뉴명',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 13,
                        code: 3,
                        name: '2차 필터링 조건',
                        level: '1',
                        color: null,
                        children: [
                            {
                                cmm_type: 3,
                                seq: 14,
                                code: 1,
                                name: '특수문자포함',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 3,
                                seq: 15,
                                code: 2,
                                name: '특수문자제거',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 16,
                        code: 4,
                        name: '3차 필터링 조건',
                        level: '1',
                        color: null,
                        children: [
                            {
                                cmm_type: 4,
                                seq: 17,
                                code: 1,
                                name: '일반',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 4,
                                seq: 18,
                                code: 2,
                                name: '구문',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 4,
                                seq: 19,
                                code: 3,
                                name: '인접',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 20,
                        code: 5,
                        name: '검색조건',
                        level: '1',
                        color: null,
                        children: [
                            {
                                cmm_type: 5,
                                seq: 21,
                                code: 1,
                                name: '키워드',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 5,
                                seq: 22,
                                code: 2,
                                name: '제외키워드',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 5,
                                seq: 23,
                                code: 3,
                                name: '작성자',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 26,
                        code: 6,
                        name: '사용자그룹',
                        level: '1',
                        color: null,
                        children: [
                            {
                                cmm_type: 6,
                                seq: 27,
                                code: 1,
                                name: '기본그룹',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 6,
                                seq: 28,
                                code: 2,
                                name: '개발',
                                level: '2',
                                color: null,
                            },
                            {
                                cmm_type: 6,
                                seq: 29,
                                code: 3,
                                name: '관리자',
                                level: '2',
                                color: null,
                            },
                        ],
                    },
                    {
                        seq: 157,
                        code: 9,
                        name: '검색조건(로그정보)',
                        level: '1',
                        color: '',
                        children: [
                            {
                                cmm_type: 9,
                                seq: 159,
                                code: 1,
                                name: '부서명',
                                level: '2',
                                color: '',
                            },
                            {
                                cmm_type: 9,
                                seq: 160,
                                code: 2,
                                name: '사용자아이디',
                                level: '2',
                                color: '',
                            },
                            {
                                cmm_type: 9,
                                seq: 161,
                                code: 3,
                                name: '사용자이름',
                                level: '2',
                                color: '',
                            },
                        ],
                    },
                ],
            };
        }
        return HttpResponse.json({ result: result });
    }),
];
