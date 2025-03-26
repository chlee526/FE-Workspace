import Vue from 'vue';
//highlight.js 라이브러리
// import hljs from 'highlight.js/lib/core';
// import javascript from 'highlight.js/lib/languages/javascript';
// import html from 'highlight.js/lib/languages/xml';
// import vuePlugin from '@highlightjs/vue-plugin';

import App from './App.vue';
//프로젝트 전역변수
import '@/plugins/global-components';
//css
import '@/assets/css/design.scss';
/**
 * JS Library Import
 * @shared/library : 공용 라이브러리
 * @/assets/js : 프로젝트 js파일 전체 로드
 */
import '@shared/library';
import '@/assets/js';
// 필수
import store from './store'; // Store
import * as filters from './filters'; // 필터(프로젝트)

import '@shared/router/permission'; // 권한
import router from '@/router'; // Router

/**
 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * 추가 라이브러리 설정
 * ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 */
//  여기에 추가
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// hljs.registerLanguage('javascript', javascript);
// hljs.registerLanguage('html', html);

// Vue.use(vuePlugin);

function startWorker() {
    if (process.env.VUE_APP_USEAGE_MSW === 'true') {
        // 목업 API 설정
        return import('@/api/mocks/browser').then(({ worker }) => {
            return worker.start({ onUnhandledRequest: 'bypass' });
        });
    }
    return Promise.resolve();
}
startWorker().then(() => {
    mountVueApp();
});

/**
 * Vue 설정/App 생성
 */
function mountVueApp() {
    Object.keys(filters).forEach((key) => {
        Vue.filter(key, filters[key]);
    });

    Vue.config.productionTip = false;
    new Vue({
        render: (h) => h(App),
        router,
        store,
    }).$mount('#wrap');
}
