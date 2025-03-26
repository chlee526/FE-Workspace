/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 
 * Navigation Guard 설정
 * 
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */

import NProgress from 'nprogress';
import { queCancle } from '@shared/utils/request';
import { getAccessToken, getRefreshStatus, getUserNo, setRefreshStatus } from '@shared/utils/auth';
import { find } from 'lodash';

import store from '@/store';
import router from '@/router';

// NProgress 설정
NProgress.configure({
    // Spinner 사용 안함
    showSpinner: false,
});

/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 라우터 가스
 * @param {String} to 이동 할 라우터 주소
 * @param {String} from 이전 라우터 주소
 * @param {Function} next 진행 메서드
 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
router.beforeEach(async (to, from, next) => {
    // 페이지 진입 시 Noty, Modal 전부 종료
    store.dispatch('NOTY_CLOSE_ALL');
    store.dispatch('MODAL_CLOSE_ALL');

    // 페이지 진입 시 새로고침(f5) 인지 아닌지 체크
    setRefreshStatus(getRefreshStatus());

    // NProgress 시작
    NProgress.start();

    // 라우트 이동 시 기존 요청한 axios 통신 모두 종료 처리
    queCancle();

    // 도움말 버튼
    // const helperBtn = document.querySelector('#helperBtn');
    // if (helperBtn) {
    //     helperBtn.classList.add('is-hide');
    // }

    // 500번대 에러는 조건없이 진입
    if (to.path.includes('/err/50')) {
        next();
        return;
    }

    // 토큰 있는지 없는지 확인 후, 이동 처리
    if (!getAccessToken() && !getUserNo()) {
        // 토큰(사용자번호)이 없는 경우 접근 가능 페이지
        if (to.path === '/' || to.path == '/view/member/login' || to.path == '/err/401' || to.path == '/err/403' || to.path == '/err/404') {
            store.commit('setting/SET_COMMONPAGE', false);
            next();
        } else {
            // 로그인되지 않은 상태에서 허용되지 않은 페이지 접근 시
            if (from.path == '/' && to.path == process.env.VUE_APP_HOME_PATH) {
                next('/view/member/login');
            } else {
                next('/err/403');
                NProgress.done();
            }
        }
        return;
    }

    // 토큰이 있는 경우 layoutFunction 렌더링
    store.commit('setting/SET_COMMONPAGE', true);

    try {
        await store.dispatch('user/AUTH');

        // root 접근 시 beforeEnter에서 homePath로 이동
        if (to.path === '/') {
            next();
            NProgress.done();
            return;
        }

        /**
         * permision(기능별권한) 있는경우 라우터에 담아보냄
         * to.query.permissions
         */
        const findExactRoute = (routes) => {
            for (let route of routes) {
                if (route.url === to.path) {
                    return route;
                }
                if (route.children && route.children.length > 0) {
                    const childMatch = findExactRoute(route.children);
                    if (childMatch) return childMatch;
                }
            }
            return null;
        };
        const routePermissions = findExactRoute(store.getters.getRoutes);

        if (routePermissions) {
            // 현재 메뉴의 seq 전달(query)
            to.query.seq = routePermissions.seq;
            // 현재 메뉴에 대한 사용자 권한 설정
            store.commit('user/SET_PERMISSIONS', routePermissions.permissions);
            // console.log('현재 페이지의 도움말 사용 여부    >>   ', routePermissions.attr?.helper === 'Y');
            store.commit('user/SET_HELPER_MENU', routePermissions.helper >= 0);

            // route,query에 permissions, attr 값 담아서 보냄
            if (routePermissions.permissions) to.query.permissions = routePermissions.permissions;
            if (routePermissions.attr) to.query.attr = routePermissions.attr;
            if (routePermissions.helper >= 0) to.query.helperSeq = routePermissions.helper;
        }

        // 페이지 진입 권한 확인
        if (to.meta.auth) {
            // 같은 페이지로 이동하는 경우 방지
            if (from.path === to.path) {
                NProgress.done();
                next(false);
                return;
            }
            NProgress.done();
            next();
            return;
        } else {
            NProgress.done();
            next('/err/403');
            return;
        }
    } catch (error) {
        console.log('error  >>  ', error);
        NProgress.done();
        next(false);
        return;
    }
});

/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Router After Each
 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
router.afterEach((to, from) => {
    // console.log('■■■■■■■■■■■■ after', to.path);
    NProgress.done();
});

/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Router Error
 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
router.onError(($err) => {
    console.log('router error ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■');
    console.log($err);
    console.log('■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ router error');
});

/** ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 가드 사용 무시하고 페이지 접근 시
 * @param {*} to 라우터 주소
 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
export const pushWithoutGuard = (to) => {
    const originalPush = router.push;
    router.push = function push(location, onComplete, onAbort) {
        if (onComplete || onAbort) return originalPush.call(this, location, onComplete, onAbort);
        return originalPush.call(this, to).catch((err) => err);
    };
};
