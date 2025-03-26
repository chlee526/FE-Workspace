export default {
    // Setting
    getDevMode: (state) => state.setting.devMode,
    getHelperEnable: (state) => state.setting.helperEnable,
    getHelperList: (state) => state.setting.helperList,
    getTopSearchExpanded: (state) => state.setting.topSearchExpanded,
    getCurGnbLocation: (state) => state.setting.curGnbLocation,
    getHelperlUsage: (state) => state.setting.helperUsage,
    getExcelUsage: (state) => state.setting.excelDownUsage,
    getLoadingChk: (state) => state.opts.loadingChk,
    getLoadingChkLen: (state) => state.opts.loadingChkLen,
    getScrollPositionY: (state) => state.setting.scrollPositionY,
    getCommonPage: (state) => state.setting.commonPage,
    getScrollWidth: (state) => state.setting.scrollWidth,
    getUseageLNB: (state) => state.setting.useageLNB,
    getUseageDefaultGNB: (state) => state.setting.useageDefaultGNB,
    getAdminMode: (state) => state.setting.adminMode,
    getAsideWidth: (state) => state.setting.asideWidth,
    getHelperPos: (state) => state.setting.helperPos,

    // User
    getAccessToken: (state) => state.user.accessToken,
    getRefreshToken: (state) => state.user.refreshToken,
    getIsPwdCertify: (state) => state.user.isPwdCertify,
    getPage: (state) => state.opts.curPage,
    getUser: (state) => state.user.user,
    getSystem: (state) => state.user.system,
    // getRoutes: state => state.UserStore.route,
    getRoutes: (state) => state.user.route,
    getUserPermissions: (state) => state.user.permissions,
    getUserHelperMenuList: (state) => state.user.helperMenuList,
    getUserHelperMenu: (state) => state.user.helperMenu,

    // Opt(API)
    getSentis: (state) => state.opts.sentis, // 감성 목록
    getChns: (state) => state.opts.channels, // 채널 목록
    getIssues: (state) => state.opts.issues, // 이슈(전체) 목록
    getBuzzType: (state) => state.opts.buzzType, // 버즈타입 목록
    getTpop: (state) => state.opts.tpop, // TPOP 목록
    getSensuality: (state) => state.opts.sensuality, // 관능어 목록
    getStoreType: (state) => state.opts.storeType, // 점포목록 목록
    getGender: (state) => state.opts.gender, // 성별
    getAge: (state) => state.opts.age, // 연령대

    // Opt(Project)
    getBrdViewLen: (state) => state.opts.brdViewLen, // 게시판 View 타입
    getRkSorts: (state) => state.opts.rkSorts, // 연관키워드 정렬(Top/Hot)
    getRkAttrs: (state) => state.opts.rkAttrs, // 연관키워드 속성
    getAnalTargets: (state) => state.opts.analTargets, // 분석대상 속성
    getSearchKeywordType: (state) => state.opts.searchKeywordType, // 검색키워드 타입 종류
    getRanks: (state) => state.opts.ranks, // 순위

    // 도움말
    getHelperContent: (state) => state.helper.helpers, // 순위
};
