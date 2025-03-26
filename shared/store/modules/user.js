import { API_auth } from '@shared/api/common/auth';
import { API_login, API_logout } from '@shared/api/member/login';
import { API_SET_PW } from '@shared/api/member/user';
import { API_helperList } from '@shared/api/helper';
import { getAccessToken, getRefreshToken, getIsPwdCertify, setAccessToken, setRefreshToken, setIsPwdCertify, removeAccessToken, removeRefreshToken, removeIsPwdCertify, setUserNo, removeUserNo } from '@shared/utils/auth';
import { routerAuthUpdate } from '@shared/router';

import store from '@/store';
import { contentRoutes } from '@/router';

const state = {
    user: {
        name: '',
        id: '',
    },
    route: [],
    system: {},
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
    isPwdCertify: getIsPwdCertify(),
    permissions: 0,
    helperMenuList: null,
    helperMenu: false,
};
const mutations = {
    SET_ID: function ($state, $val) {
        $state.user.id = $val;
    },
    SET_NAME: function ($state, $val) {
        $state.user.name = $val;
    },
    SET_ROUTE: function ($state, $val) {
        $state.route = $val;
    },
    SET_USER_NO: function ($state, $val) {
        $state.user.user_no = $val;
    },
    // State
    SET_USER_STATE: function ($state, $val) {
        if ($val.system) $state.system = $val.system;
        if ($val.user) $state.user = $val.user;
        if ($val.route) $state.route = $val.route;
    },

    SET_ACCESS_TOKEN: ($state, accessToken) => {
        $state.accessToken = accessToken;
    },

    SET_REFRESH_TOKEN: ($state, refreshToken) => {
        $state.refreshToken = refreshToken;
    },

    SET_IS_PWD_CERTIFY: ($state, isPwdCertify) => {
        $state.isPwdCertify = isPwdCertify;
    },
    SET_PERMISSIONS: ($state, permissions) => {
        $state.permissions = permissions;
    },
    SET_HELPER_MENU_LIST: ($state, helperMenuList) => {
        $state.helperMenuList = helperMenuList;
    },
    SET_HELPER_MENU: ($state, helperMenu) => {
        $state.helperMenu = helperMenu;
    },
};
const actions = {
    AUTH() {
        // return new Promise((resolve, reject) => {
        //     API_auth()
        //         .then((res) => {
        //             if (res.data?.result) {
        //                 // 라우터 권한 업데이트
        //                 routerAuthUpdate(res.data.result.route);

        //                 //state 할당
        //                 const userInfo = {
        //                     user: {
        //                         name: res.data.result.user.name,
        //                         id: res.data.result.user.id,
        //                     },
        //                     route: getFilteredRoute(res.data.result.route, contentRoutes),
        //                 };
        //                 if (res.data.result.system) {
        //                     userInfo.system = {
        //                         url: res.data.result.system.url,
        //                     };
        //                 }

        //                 store.commit('user/SET_USER_STATE', userInfo);

        //                 // if (res.data.user_no) store.commit('SET_USER_NO', res.data.user_no);
        //                 // store.commit('user/SET_ID', userInfo.user.id);
        //                 // store.commit('user/SET_NAME', userInfo.user.name);
        //                 // }
        //             }

        //             resolve(res);
        //         })
        //         .catch((err) => {
        //             reject(err);
        //         });
        // });
        return new Promise((resolve, reject) => {
            API_auth()
                .then((authRes) => {
                    let userInfo = null;

                    if (authRes.data?.result) {
                        // 라우터 권한 업데이트
                        routerAuthUpdate(authRes.data.result.route);

                        //state 할당
                        userInfo = {
                            user: {
                                name: authRes.data.result.user.name,
                                id: authRes.data.result.user.id,
                            },
                            route: getFilteredRoute(authRes.data.result.route, contentRoutes),
                        };
                        if (authRes.data.result.system) {
                            userInfo.system = {
                                url: authRes.data.result.system.url,
                            };
                        }
                        store.commit('user/SET_USER_STATE', userInfo);

                        // 도움말 메뉴 사용중인지 여부 판단해 사용중이면 도움말 목록 가져옴
                        if (process.env.VUE_APP_HELPER_MENU === 'true') {
                            const param = {
                                admin: 'N',
                            };
                            return API_helperList(null, param)
                                .then((helperListRes) => {
                                    // 두 번째 API 응답 처리
                                    if (helperListRes.data) {
                                        store.commit('user/SET_ROUTE', getFilteredHelperRoute(structuredClone(store.getters.getRoutes), helperListRes.data.result.list));
                                    }
                                    return { authRes };
                                })
                                .catch((err) => {
                                    return { authRes };
                                });
                        }
                    }

                    return { authRes };
                })
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    LOGIN({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            API_login(userInfo)
                .then((res) => {
                    if (!res.data.error_code) {
                        // Token 사용
                        commit('SET_ID', userInfo.id);
                        commit('SET_ACCESS_TOKEN', res.headers.accesstoken);
                        setAccessToken(res.headers.accesstoken);
                        commit('SET_REFRESH_TOKEN', res.headers.refreshtoken);
                        setRefreshToken(res.headers.refreshtoken);
                        if (res.data.jwt != undefined) {
                            commit('SET_IS_PWD_CERTIFY', res.data.jwt.isFirst);
                            setIsPwdCertify(!res.data.jwt.isFirst);
                        }
                    }

                    resolve(res);
                })
                .catch(function (err) {
                    console.log('err ==>', err);
                    reject(err);
                });
        });
    },
    LOGOUT({ commit }, state) {
        return new Promise((resolve, reject) => {
            API_logout()
                .then((res) => {
                    if (res.status == 200) {
                        if (!state?.thenDisabled) {
                            commit('SET_ACCESS_TOKEN', '');
                            commit('SET_REFRESH_TOKEN', '');
                            commit('SET_IS_PWD_CERTIFY', '');
                            commit('SET_ID', '');
                            commit('SET_NAME', '');
                            commit('SET_ROUTE', []);
                            removeAccessToken();
                            removeUserNo();
                            removeRefreshToken();
                            removeIsPwdCertify();
                        }
                        resolve();
                    }
                })
                .catch((err) => {
                    console.log('err ==>', err);
                    reject(err);
                });
        });
    },
    FIRST_SET_PW: function ({ commit }, state) {
        return new Promise((resolve, reject) => {
            API_SET_PW({ id: store.getters.getUser.id, newPw: state.pw })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    SYSTEM() {
        // console.log('SYSTEM', store.getters.getSystem);
        if (store.getters.getSystem)
            String(store.getters.getSystem.url).formSubmit({
                accessToken: getAccessToken(),
                refreshToken: getRefreshToken(),
            });
        else console.log('System URL is undefined');
    },
};

const getFilteredHelperRoute = (storeRoute, helperRoute) => {
    const result = storeRoute.filter((item) => {
        helperRoute.forEach((compareItem) => {
            if (item.seq === compareItem.menu_code && compareItem.use_yn === 'Y') {
                item.helper = compareItem.seq;

                if (item.children && compareItem.children) {
                    item.children = getFilteredHelperRoute(item.children, compareItem.children);
                }
            }
        });

        return item;
    });
    return result;
};

const getFilteredRoute = (apiRoute, contentRoutes) => {
    // 개발환경에서는 전체 라우트 반환
    // if (store.getters.getDevMode) return contentRoutes;

    const result = apiRoute.filter((item) => {
        let chk = false;
        contentRoutes.forEach((compareItem) => {
            if (compareItem.name == item.name && (compareItem.url == item.url || compareItem.link == item.link)) {
                chk = true;

                compareItem.seq = item.seq;

                // 퍼미션 업데이트
                if (item.permissions) compareItem.permissions = item.permissions;
                else delete item.permissions;

                if (compareItem.children && item.children) item.children = getFilteredRoute(item.children, compareItem.children);
            }
        });
        if (chk) {
            item.meta = {
                auth: true,
            };
            return item;
        }
    });
    return result;
};

export default {
    namespaced: true,
    mutations,
    actions,
    state,
};
