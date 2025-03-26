const state = {
    devMode: process.env.NODE_ENV == 'development' ? true : false,
    helperEnable: process.env.VUE_APP_HELPER_ACTIVE, // 도움말
    helperList: [], // 도움말 목록
    topSearchExpanded: true, // 상단 검색바 활성화 여부
    curGnbLocation: [], // 현재 GNB Location
    helperUsage: process.env.VUE_APP_HELPER === 'true' ? true : false, // 도움말 사용 여부
    excelDownUsage: process.env.VUE_APP_EXCEL === 'true' ? true : false, // 엑셀 다운로드 사용여부
    scrollPositionY: {
        inputFormOffsetHeigth: 0,
        resultOffsetHeigth: 0,
    },
    commonPage: true,
    scrollWidth: null, //bubble위치 설정용 스크롤바 넓이
    useageLNB: process.env.VUE_APP_USEAGE_LNB === 'true' ? true : false, // LNB 사용 여부(환경설정)
    useageDefaultGNB: process.env.VUE_APP_USEAGE_DEFAULT_GNB === 'true', // GNB 기본값으로 사용여부 true: 기본 메뉴 레이아웃 GNB, false: 기본 메뉴 레이아웃 LNB
    adminMode: process.env.VUE_APP_ADMIN_MODE === 'true' ? true : false, // 관리자 모드
    asideWidth: null, // sidebar 크기
    helperPos: 0, // 도움말 버튼 위치
};
const mutations = {
    // 도움말
    SET_HELPERENABLE: function (state, val) {
        state.helperEnable = val;
    },
    // 도움말 목록(페이지내 도움말 목록)
    ADD_HELPERLIST: function (state, val) {
        state.helperList.push(val);
    },
    // 상단 검색바 활성화 여부
    SET_TOPSEARCHEXPANDED: function (state, val) {
        state.topSearchExpanded = val;
    },
    // 현재 GNB Location
    SET_CURGNBLOCATION: function (state, val) {
        state.curGnbLocation = val;
    },
    SET_SCROLL_POSITION_Y(state, position) {
        state.scrollPositionY = position;
    },
    SET_COMMONPAGE(state, val) {
        state.commonPage = val;
    },
    // 스크롤바 넓이
    SET_SCROLLWIDTH(state, val) {
        state.scrollWidth = val;
    },
    // LNB 사용 여부
    SET_USEAGELNB(state, val) {
        state.useageLNB = val;
    },
    // GNB 기본값으로 사용여부
    SET_USEAGEDEFAULTGNB(state, val) {
        state.useageDefaultGNB = val;
    },
    // ASIDE 크기
    SET_ASIDEWIDTH(state, val) {
        state.asideWidth = val;
    },
    // 도움말 버튼 위치
    SET_HELPERPOS(state, val) {
        state.helperPos = val;
    },
};

export default {
    namespaced: true,
    mutations,
    state,
};
