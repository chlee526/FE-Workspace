import $ from 'jquery';
import Cookies from 'js-cookie';

import { getItemLocalStorage, setItemLocalStorage, removeItemLocalStorage } from './localStorage';

const UserNo = 'user_no';
const AccessTokenKey = 'access_token';
const RefreshTokenKey = 'refresh_token';
const IsPwdCertify = 'is-pwd-certify';

// Session사용시
export function getUserNo() {
    return Cookies.get(UserNo);
}
export function setUserNo(userNo) {
    return Cookies.set(UserNo, userNo, { path: '/' });
}
export function removeUserNo() {
    return Cookies.remove(UserNo, { path: '/' });
}

// Token 사용시
export function getAccessToken() {
    return Cookies.get(AccessTokenKey);
}
export function setAccessToken(token) {
    return Cookies.set(AccessTokenKey, token, { path: '/' });
}

export function getRefreshToken() {
    return Cookies.get(RefreshTokenKey);
}
export function setRefreshToken(token) {
    return Cookies.set(RefreshTokenKey, token, { path: '/' });
}

export function removeAccessToken() {
    return Cookies.remove(AccessTokenKey, { path: '/' });
}

export function removeRefreshToken() {
    return Cookies.remove(RefreshTokenKey, { path: '/' });
}

export function getIsPwdCertify() {
    return getItemLocalStorage('is-pwd-certify');
}

export function setIsPwdCertify(isPwdCertify) {
    setItemLocalStorage('is-pwd-certify', isPwdCertify);
}

export function removeIsPwdCertify() {
    return Cookies.remove(IsPwdCertify, { path: '/' });
}

export function setScrollPositionY(scroll) {
    setItemLocalStorage('scrollPositionY', scroll);
}

export function getScrollPositionY() {
    return getItemLocalStorage('scrollPositionY');
}

export function removeScrollPositionY() {
    removeItemLocalStorage('scrollPositionY');
}

export function setRefreshStatus(chck) {
    setItemLocalStorage('refreshStatus', chck);
}

export function getRefreshStatus() {
    return getItemLocalStorage('refreshStatus');
}
