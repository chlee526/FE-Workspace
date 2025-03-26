<template>
    <div class="ui_box is-3dp">
        <div class="header">
            <div class="wrap">
                <h3>
                    <span>연관어</span>
                    <div v-if="apiParams && apiParams.ps_date && sort == 'H'" class="sub_title">
                        <span :title="apiParams.ps_date.date + ' ~ ' + apiParams.pe_date.date" class="keyword">{{ apiParams.ps_date.date }} ~ {{ apiParams.pe_date.date }}</span>
                    </div>
                </h3>
                <div class="rc_wrap">
                    <button title="Excel 다운로드" class="ui_btn is-icon-only is-small" @click="evt_excel"><span class="icon">&#xe005;</span></button>
                </div>
            </div>
        </div>
        <div v-if="searchParams.ps_date || useAttrs" class="ui_function is-box">
            <div class="lc">
                <comp-radio-grp :id="popName + '_cloud_sort'" class="is-small" :opts="getRkSorts" :name="popName + '_cloud_sort'" v-model="sort" :box="true"></comp-radio-grp>
                <!--
                    <hr>
                    <comp-button class="is-small" @click="exceptClick"><span>키워드 제외</span></comp-button>
                    -->
            </div>
            <div v-if="useAttrs" class="rc">
                <comp-selectbox id="popName + '_attrs'" class="is-small" :opts="getAttrOpts" v-model="selAttrs" :multiple="true" use-color useDisabled></comp-selectbox>
            </div>
        </div>
        <div class="content ui-loader-container" :class="{ 'is-loading': loading }">
            <comp-chart-wordcloud v-if="searchParams" id="'modal_relInfo_cloud'" class="is-click" :chart-data="getRkData" :opts="{ maxFont: 70 }" :use-view-type="false" :sort="sort" view-type="1" @click="evt_rkClick" :style="getHgt" :rotation="false"></comp-chart-wordcloud>
        </div>
    </div>
</template>
<script>
import { uuid } from 'vue-uuid';
import { API_rkeyword, API_rkeywordWithAttr } from '@shared/api/rkeyword';
import EventBus from '@shared/utils/eventBus';
import { getDatePOP } from '@shared/utils/prototype/util.date';

export default {
    name: 'tmpl-modal-relinfo-rkeyword',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null,
            loading: false, // 로딩
            isFirst: true,
            sort: 'T', // 정렬
            rk_len: 30, // 키워드 수
            selAttrs: '',
            rkData: {
                data: [],
            },
        };
    },
    props: {
        popName: { type: String, default: '' },
        searchParams: { type: Object },
        selectRk: { type: Object, default: null },
        useAttrs: { default: null },
        trendCatching: { type: Boolean, default: false },
    },
    computed: {
        // 연관 키워드 정렬 옵션
        getRkSorts() {
            return this.$store.getters.getRkSorts;
        },
        // 차트 높이 설정
        getHgt() {
            if (this.useAttrs || this.searchParams.ps_date) return 'height: 361px;';
            else return 'height: 405px;';
        },
        // 연관키워드 속성 옵션 파싱
        getAttrOpts() {
            const getRKAttrs = this.$store.getters.getRkAttrs.default.flat();
            return getRKAttrs.map(($item) => {
                return {
                    code: this.getItemCode($item),
                    name: $item.name,
                    color: $item.color,
                };
            });
        },
        // 연관키워드 데이터 파싱
        getRkData() {
            const result = JSON.parse(JSON.stringify(this.rkData));
            // 속성 사용시 컬러 설정
            if (this.useAttrs) {
                result.data.forEach(($item) => {
                    const get1dpData = this.useAttrs.flat().getRootData($item.attr_type_code);
                    $item.color = get1dpData.length ? get1dpData[0].color : '#666666';
                    $item.attrName = get1dpData.length ? get1dpData[0].name : '없음';
                });
            }
            return result;
        },
    },
    created() {
        if (this.useAttrs) this.selAttrs = this.getAttrOpts.arrObjAttrToStr('code');
    },
    mounted() {
        EventBus.$on('MODAL_CLOSE', this.modalClose);
        this.fetchData();
    },
    watch: {
        // 공통 검색 조건
        searchParams: {
            deep: true,
            handler() {
                if (!this.isFirst) this.fetchData();
            },
        },
        // Hot/Top
        sort() {
            if (!this.isFirst) this.fetchData();
        },
        selAttrs() {
            if (!this.isFirst) this.fetchData();
        },
    },
    methods: {
        /**
         * 연관키워드 속성 옵션 아이템 코드 반환
         * @param {Object} $data  연관키워드 속성 옵션 아이템
         * @returns {String}  연관키워드 속성 옵션 아이템 코드 '1,2...'
         */
        getItemCode($data) {
            const result = [];
            if ($data.children) {
                $data.children.forEach(($item) => {
                    result.push(this.getItemCode($item));
                });
            } else {
                result.push([$data.code]);
            }
            return result.flat().toString();
        },
        async fetchData() {
            this.loading = true;

            this.apiParams = JSON.parse(JSON.stringify(this.searchParams));
            this.apiParams.order_type = this.sort;
            this.apiParams.row_limit = this.rk_len;
            this.apiParams.sec_id = 'normal_keyword';

            // 추가 검색조건에서 선택한 날짜 범위가 있을 경우 s_date/e_date 업데이트
            if (this.apiParams.additionalCondition.selectDate) {
                let sDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[0] : this.apiParams.additionalCondition.selectDate;
                let eDate = Array.isArray(this.apiParams.additionalCondition.selectDate) ? this.apiParams.additionalCondition.selectDate[1] : this.apiParams.additionalCondition.selectDate;
                this.apiParams.s_date.date = sDate;
                this.apiParams.e_date.date = eDate;
                Object.assign(this.apiParams, getDatePOP(JSON.parse(JSON.stringify(this.apiParams))));
            }

            // useAttrs 속성이 있으면 attr_type_code 설정
            if (this.useAttrs) this.apiParams.attr_type_code = this.selAttrs;

            let api;
            if (this.useAttrs) api = API_rkeywordWithAttr(this.apiUID, this.apiParams);
            else api = API_rkeyword(this.apiUID, this.apiParams);

            await api
                .then(($res) => {
                    // /**
                    //  * 임시 데이터 사용
                    //  */
                    // $res = {
                    //     data: [],
                    // };
                    // for (let index = 0; index < _this.apiParams.row_limit; index++) {
                    //     let num = Math.floor(Math.random() * 1000);
                    //     let arr = _this.selAttrs.strToArr();
                    //     let pick = arr[Math.floor(Math.random() * arr.length)];
                    //     let res = { cnt_d: num, cnt_p: '0', code: index, factor_cnt: '0.0', factor_per: ((Math.random() * 1000) - 500).toFixed(1), name: '연관어' + index, senti_1: '0', senti_2: num, senti_3: '0', attr_type_code: pick };
                    //     $res.data.push(res);
                    // }
                    // $res.data.sort((a, b) => {
                    //     return b.cnt_d - a.cnt_d;
                    // });
                    // // 여기까지

                    this.rkData = {
                        data: $res.data,
                    };
                })
                .catch(($err) => {});

            this.isFirst = false;
            this.loading = false;
        },

        /**
         * 차트 클릭 이벤트 - subTitleSelect 에밋 전달
         * @param {Object} evt  연관키워드 정보
         */
        evt_rkClick(evt) {
            console.log('!!!!', evt);
            this.$emit('subTitleSelect', { type: 'rk', val: evt });
        },
        // 해시태그 제외 키워드 클릭
        exceptClick() {
            this.$store.dispatch('modal/MODAL_OPEN', [
                'ex_relation_keyword',
                {
                    code: '1',
                    name: '키워드',
                    sc_id: 'normal_keyword',
                    uid: this.apiUID,
                },
            ]);
        },
        // 해시태그 제외 팝업 종료 시 API 호출
        modalClose(name, param) {
            if (name === 'comp-modal-ex_relation_keyword' && param && param.sc_id === 'normal_keyword') {
                this.fetchData();
            }
        },

        // 엑셀 다운
        evt_excel() {
            const excelParams = JSON.parse(JSON.stringify(this.apiParams));
            excelParams.excel = true;
            excelParams.excel_id = 'relinfo_02';
            excelParams.ps_date = this.searchParams.ps_date;
            excelParams.pe_date = this.searchParams.pe_date;

            if (excelParams.advs) {
                let key = Object.keys(excelParams.advs)[0];
                excelParams.anal = excelParams.advs[key].name;
            } else if (excelParams.rk_seq) {
                excelParams.anal = excelParams.rk_seq[0].name;
            }

            let api;
            if (this.useAttrs) api = API_rkeywordWithAttr(this.apiUID, excelParams);
            else api = API_rkeyword(this.apiUID, excelParams);

            api.then((res) => {
                EventBus.$emit('EXCEL_DOWN', res);
            }).catch((err) => {
                console.log('*********************************************************');
                console.log(err);
            });
        },
    },
};
</script>
