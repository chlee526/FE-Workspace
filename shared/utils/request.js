/**
 * @author incheon
 *
 */

import axios from 'axios';
import { getAccessToken, removeAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeRefreshToken, removeIsPwdCertify, removeUserNo } from '@shared/utils/auth';

import store from '@/store';
import router from '@/router';

const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    // withCredentials: false,
});

// Request List
let requestQue = [];
let resTimer = null;

// request interceptor
request.interceptors.request.use(
    async (config) => {
        // 이미 등록되어 있는 Req인지 체크 후, 기존 제거 또는 신규 등록

        const param = JSON.parse(JSON.stringify(config.data));

        if (config.id && !param.excel) {
            var queChk = null;
            requestQue.forEach(function ($req, $idx) {
                if ($req.id == config.id) {
                    queChk = $idx;
                    return false;
                }
            });
            if (queChk != null) {
                // Que에 이미 등록되어 있는 경우, Que에서 제거 및 Axios Cancel

                requestQue[queChk].cancel();
                requestQue.splice(queChk, 1);
            }

            // 신규 등록/CancelToken 등록
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            config.cancelToken = source.token;
            config.cancel = source.cancel;
            requestQue.push(config);
        }

        if (getAccessToken()) {
            config.headers['Authorization'] = 'Bearer ' + getAccessToken();
        } else {
            delete config.headers['Authorization'];
        }

        return config;
    },
    (error) => {
        console.log(error, 'request error');
        return Promise.reject(error);
    },
);

let renewTokenPromise = null; // 토큰 재발행 Promise(존재 여부로 토큰 재발행의 중복 실행을 방지)

request.interceptors.response.use(
    async (response) => {
        // anotherExcept.forEach((item, idx, arr) => {
        //     if (item.id === response.config.id) arr.splice(idx, 1);
        // });

        // request que제거

        requestQue.forEach(function ($item, $idx, $arr) {
            if ($item.id == response.config.id) {
                $arr.splice($idx, 1);
            }
        });

        // 전체 로딩 체크중일때 로더 완료 체크
        if (store.getters.getLoadingChk) {
            clearTimeout(resTimer);
            resTimer = setTimeout(() => {
                if (requestQue.length == 0) store.dispatch('opts/LOAD_COMPLETE');
            }, 500);
        }

        return response;
    },
    async (error) => {
        // console.log('request response error', error);
        // request에서 취소된 경우 Promise 제거
        if (axios.isCancel(error)) {
            return new Promise(() => {});
        }

        /**
         * Error Status별 처리
         */
        // 네트워크 오류(CORS...)
        if (error.request && !error.response) {
            store.dispatch('DIALOG_ERR', [`네트워크 오류가 발생했습니다.<br>확인을 누르시면 새로고침 됩니다.<br>문제가 지속될 경우, 관리자에게 문의하세요.`, `오류`, 0]).then(() => {
                location.reload();
            });
        }
        // 401에러 처리
        if (error.response && error.response.status === 401) {
            if (process.env.VUE_APP_USAGE_SESSION == 'true') {
                store.commit('user/SET_ACCESS_TOKEN', '');
                store.commit('user/SET_REFRESH_TOKEN', '');
                store.commit('user/SET_IS_PWD_CERTIFY', '');
                store.commit('user/SET_ID', '');
                store.commit('user/SET_NAME', '');
                store.commit('user/SET_ROUTE', []);
                removeAccessToken();
                removeRefreshToken();
                removeIsPwdCertify();
                removeUserNo();

                router.push('/err/401').catch(($err) => {});
            } else {
                // 401 에러가 발생했을 때
                if (!renewTokenPromise) {
                    // renewToken이 실행 중이 아닌 경우에만 실행
                    renewTokenPromise = renewToken(error.config).then(() => {
                        renewTokenPromise = null; // renewToken 실행 완료 후 상태 초기화
                    });
                }

                // 401 에러가 발생한 request를 저장
                const originalRequest = error.config;

                // renewToken이 완료될 때까지 대기
                await renewTokenPromise;

                // 저장한 request를 다시 실행하여 결과 반환
                return request(originalRequest);
            }
        }
        // 403: 인증실패
        if (error.response && error.response.status === 403) {
            store.commit('user/SET_ACCESS_TOKEN', '');
            store.commit('user/SET_REFRESH_TOKEN', '');
            store.commit('user/SET_IS_PWD_CERTIFY', '');
            store.commit('user/SET_ID', '');
            store.commit('user/SET_NAME', '');
            store.commit('user/SET_ROUTE', []);
            removeAccessToken();
            removeRefreshToken();
            removeIsPwdCertify();
            removeUserNo();

            router.push('/err/403').catch(($err) => {});
        }
        // 500: 500번대 에러
        if (error.response && parseInt(error.response.status) >= 500) {
            store.dispatch('DIALOG_ERR', [`오류가 발생했습니다.<br>확인을 누르시면 새로고침 됩니다.<br>문제가 지속될 경우, 관리자에게 문의하세요.`, `오류`, 0]).then(() => {
                location.reload();
            });
            return new Promise(() => {});
            // router.push(`/err/${error.response.status}`).catch(($err) => {});
        }

        // 다른 에러는 그대로 반환
        return Promise.reject(error);
    },
);

/**
 *
 * Access Token이 401에러 처리 되면 Refresh Token으로 토큰 재생성
 * @param {*} config
 * @returns
 */

async function renewToken(config) {
    const configuration = {
        headers: {
            Authorization: 'Bearer ' + getRefreshToken(),
        },
    };

    const originalRequest = config;

    const renewRes = await axios
        .post(`${process.env.VUE_APP_BASE_API}/api/auth/token.jsp`, {}, configuration)
        // Renew에서도 실패
        .catch((err) => {
            // Renew에서도 401이 났으므로, 권한인증 완전한 실패로 간주 -> 401에러 페이지로 전달
            store.commit('user/SET_ACCESS_TOKEN', '');
            store.commit('user/SET_REFRESH_TOKEN', '');
            store.commit('user/SET_IS_PWD_CERTIFY', '');
            store.commit('user/SET_ID', '');
            store.commit('user/SET_NAME', '');
            store.commit('user/SET_ROUTE', []);
            removeAccessToken();
            removeRefreshToken();
            removeIsPwdCertify();

            // 재발행 Promise 초기화
            renewTokenPromise = null;

            router.push('/err/401').catch(($err) => {});
        });

    if (renewRes && renewRes.headers) {
        const headers = renewRes.headers;

        //변수명 재정의 필요
        const { accesstoken, refreshtoken } = headers;

        removeAccessToken();
        removeRefreshToken();

        setAccessToken(accesstoken);
        setRefreshToken(refreshtoken);

        axios.defaults.headers.common.Authorization = 'Bearer ' + getAccessToken();
        originalRequest.headers.Authorization = 'Bearer ' + getAccessToken();

        return Promise.resolve(getAccessToken());
    } else {
        return Promise.reject();
    }
}

const queCancle = () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    requestQue.forEach((val) => {
        val.cancel();
    });

    requestQue = [];
};
// export default request;

export { request as default, queCancle };
