/**
 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * [ headerSetting ]
 * - 사용 : HeaderEnvironmentSet.vue
 * - 용도 : 헤더 스타일(useLNB), 주색상(primary,secondary, tertiary) 관리
 *
 * [ is-pwd-certify ]
 * - 사용 : auth.js
 * - 용도 : 비밀번호 변경 이력 관리
 *
 * [ scrollPositionY ]
 * - 사용 : auth.js
 * - 용도 : window y 좌표 관리
 *
 * [ refreshStatus ]
 * - 사용 : auth.js
 * - 용도 :브라우저 새로고침(F5) 여부 관리
 *
 * [ personalization ]
 * - 사용 : 개인화 적용이 필요한 컴포넌트
 * - 용도 : 사용자 PC별 개인화 적용이 필요한 항목 관리
 * - 형식 : {메뉴명 : {섹션명 : {컴포넌트명 : {설정 항목명1 : true, 설정 항목명2 : [], ... }, ...}, ...}, ...}
 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 */

export function getItemLocalStorage(key) {
    const data = window.localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

export function setItemLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeItemLocalStorage(key) {
    localStorage.removeItem(key);
}
