import { getAccessToken, getIsPwdCertify, getRefreshStatus, getScrollPositionY, getUserNo } from '@shared/utils/auth';
import NProgress from 'nprogress';

import Layout from '@/layout';
import store from '@/store';

// Home경로 찾기
export function getHomePath() {
    if (!getAccessToken() && !getUserNo()) {
        return '/view/member/login';
    }

    let flatRouteItems = [];
    store.getters.getRoutes.forEach((item) => {
        if (item.children) {
            flatRouteItems = [...flatRouteItems, ...item.children];
        } else {
            flatRouteItems.push(item);
        }
    });
    const homePathMathed = flatRouteItems.filter((item) => item.url === process.env.VUE_APP_HOME_PATH);
    return homePathMathed.length ? process.env.VUE_APP_HOME_PATH : flatRouteItems[0].url;
}

/**■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 공통 페이지별 가드
 * 로그인, 비밀번호 최초 설정
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

/**
 * 로그인 페이지 권한 체크
 * @param {*} to    이동할 페이지 주소
 * @param {*} from  이전 페이지 주소
 * @param {*} next  이동할 페이지 진입 메서드
 * @returns {Boolean} 라우터 실행/정지
 */
export const isAuthLogin = (to, from, next) => {
    // console.log('Login Auth');
    if (!getAccessToken() && !getUserNo()) {
        // console.log('로그인 진입 성공 - 권한 없음');
        next();
        return false;
    } else {
        if (from.path == '/view/member/pass') {
            // console.log('로그인 -> 첫 비밀번호 에서 왔음');
            next();
            return false;
        } else {
            if (from.path == '/' || from.path == '/404') {
                // console.log('로그인 접근 -> ', from.path, '에서 와서 메인으로 이동', to.path);
                // next();
                next(process.env.VUE_APP_HOME_PATH);
            } else {
                // console.log('로그인 접근 -> ', from.path, '에서 와서 라우터 멈춤');
                NProgress.done();
                next(false);
                return false;
            }
        }
    }
};

/**
 * 비밀번호 페이지 권한 체크
 * @param {*} to    이동할 페이지 주소
 * @param {*} from  이전 페이지 주소
 * @param {*} next  이동할 페이지 진입 메서드
 * @returns {Boolean} 라우터 실행/정지
 */
export const isAuthPass = function (to, from, next) {
    if (process.env.VUE_APP_USEAGE_FIRST_PW_SET && !getIsPwdCertify()) {
        // 설정에서 비밀번호 최초 설정을 사용중이면
        if (getAccessToken() || getUserNo()) {
            // console.log('요기');
            next();
        } else {
            // console.log('조기');
            if (from.path == '/view/member/login') {
                NProgress.done();
                next(false);
                return false;
            } else {
                next('/view/member/login');
            }
        }
    } else {
        if (from.path == '/err/401' || from.path == '/err/403' || from.path == '/err/404') {
            NProgress.done();
            next(false);
            return false;
        } else {
            next('/err/403');
        }
    }
};

/**
 * 프로젝트 속성(분류체계) 코드
 * @param {*} to    이동할 페이지 주소
 * @param {*} from  이전 페이지 주소
 * @param {*} next  이동할 페이지 진입 메서드
 * @returns {Boolean} 라우터 실행/정지
 */
export const isPrjAttrs = async function (to, from, next) {
    if (getAccessToken()) {
        if (process.env.VUE_APP_USEAGE_BEFORE_API == 'true') {
            // 페이지 진입 전 코드 목록이 필요한 경우
            await store
                .dispatch('opts/ATTRS')
                .then(($err) => {
                    next();
                })
                .catch(($err) => {
                    console.log($err);
                    store
                        .dispatch('DIALOG_ERR', ['기본 정보를 로드하지 못했습니다.<br>확인을 누르시면 새로고침 됩니다.<br>문제가 지속 될 경우 관리자에게 문의하세요.', '속성 로드 실패', 0])
                        .then(($val) => {
                            location.reload();
                        })
                        .catch(($err) => {
                            console.log('error');
                        });
                });
        } else {
            // 페이지 진입 전 코드 목록이 필요하지 않은 경우
            next();
        }
    } else {
        next('/view/member/login');
    }
};

/**■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 라우터 공통 리소스
 * 공통 라우터, 라우터 업데이트 함수
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
/**
 * 공통 라우터
 * 404 리다이렉트, / -> Home연결, 에러(401, 403, 404), 로그인, 최초 비밀번호 설정, View Wrapper
 * fixroutes[5] 가 컨텐츠 라우터이며, index변경될 시, 관련 리소스들 수정 필요함
 */
export let fixRoutes = [
    {
        // 없는 주소 404 리다이렉트
        path: '*',
        redirect: '/err/404',
    },
    {
        // 서브 URL없는 경우 Home(환경설정 홈경로)으로 리다이렉트
        path: '/',
        name: 'root',
        meta: { auth: true },
        beforeEnter(to, from, next) {
            next(getHomePath());
        },
    },
    {
        // 에러페이지(401, 403, 404)
        path: '/err/:code',
        component: () => import('@shared/view/error'),
        meta: { auth: true },
    },
    {
        // 로그인
        path: '/view/member/login',
        name: 'login',
        component: () => import('@shared/view/member/login'),
        meta: { auth: true },
        beforeEnter: isAuthLogin,
    },
    {
        // 최초 비밀번호 설정
        path: '/view/member/pass',
        name: 'member-pass',
        component: () => import('@shared/view/member/pass'),
        meta: { auth: true },
        beforeEnter: isAuthPass,
    },
    {
        // 도움말 메뉴
        path: '/view/helper',
        name: 'helper',
        component: () => import('@shared/view/helper'),
        meta: { auth: true },
        beforeEnter: isPrjAttrs,
        children: [
            {
                // 도움말 메뉴
                path: ':seq',
                name: 'helper-detail',
                meta: { auth: true },
                component: () => import('@shared/view/helper/components/detail'),
            },
        ],
    },
    {
        // 고정값(메뉴를 감싸는 wrapper 라우터)
        path: '/view',
        component: Layout,
        redirect: '/',
        children: [],
        beforeEnter: isPrjAttrs, // 속성코드(분류체계코드) 가지고 옴(없는 경우에만)
    },
];

// env 설정에서 공지사항 사용중이면 공지사항 라우터 추가
if (process.env.VUE_APP_NOTICE == 'true') {
    fixRoutes[fixRoutes.length - 1].children = [
        {
            // 공지사항 페이지
            path: '/view/notice',
            component: () => import('@shared/view/notice'),
            meta: { auth: true },
        },
        {
            // 공지사항 상세
            path: '/view/notice/:seq',
            component: () => import('@shared/view/notice/NoticeDetail'),
            meta: { auth: true },
        },
    ];
}

/**
 * API를 통해서 받아온 라우터 정보와 프로젝트가 가진 라우터를 비교해 권한(meta.auth) 업데이트
 * 개발자 모드인 경우 권한 업데이트 하지 않음(프로젝트의 router를 그대로 사용)
 * @param {*} $authRoutes API를 통해서 가지고온 라우터
 * @returns void
 */
export const routerAuthUpdate = ($authRoutes) => {
    let contentRouter;
    // if (process.env.NODE_ENV == 'development') {
    //     console.log('■■■■■■■■■■■■ 개발자 모드로 라우터 권한 업데이트 없음');
    //     return false;
    // } else {
    fixRoutes.forEach(($item) => {
        if ($item.path == '/view') contentRouter = $item.children;
    });
    // 권한을 없는 상태로 초기화
    contentRouter.forEach((item) => {
        item.meta.auth = false;
    });

    // 접근이 가능한 메뉴를 찾아서 라우터 업데이트
    getSameRouter($authRoutes);

    function getSameRouter($routes) {
        $routes.forEach(($item) => {
            // 도움말 접근 권한 업데이트
            // 전체 접근 허용으로 변경(2025-01-08)
            // if ($item.url.includes('/view/admin/helper')) {
            //     const fixedRouteHelper = fixRoutes.filter((item) => item.path === '/view/helper');
            //     if (fixedRouteHelper.length) {
            //         fixedRouteHelper[0].meta.auth = true;
            //         fixedRouteHelper[0].children[0].meta.auth = true;
            //     }
            // }

            contentRouter.forEach(($compareItem) => {
                // 기본 상황
                if ($compareItem.name == $item.name && $compareItem.path == $item.url) {
                    $compareItem.meta.auth = true;
                    if ($item.children) return getSameRouter($item.children);
                }
            });
        });
    }
};

/**
 * router 새로고침 시 이동 되는 scroll 위치와 다른 route로 이동 시 이동하는 스크롤 영역 return
 * 이후에 뒤로가기 시 스크롤 이동 처리 개발 된다면 수정 예정
 * @param {*} savePosition 이전 페이지 기록
 */
export const scrollBehaviorGetReroadChck = (savedPosition) => {
    if (savedPosition) {
        return { x: 0, y: 0 };
    }

    if (getRefreshStatus() == 'true') {
        return { x: 0, y: parseInt(getScrollPositionY()) };
    } else {
        return { x: 0, y: 0 };
    }
};
