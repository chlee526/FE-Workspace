<template>
    <comp-topsearch :search-input-datas.sync="inputDatas" :search-datas.sync="resultDatas">
        <!-- 조건 -->
        <template slot="input_forms">
            <tr>
                <th>
                    <comp-bubble-box content="필수값 입니다" class="is-validation" pos="LB" :show-fixed="!inputDatas.advs.keyword_1.name.length && !inputDatas.advs.keyword_2.name.length && !inputDatas.advs.keyword_3.name.length">
                        <h4>검색어</h4>
                    </comp-bubble-box>
                </th>
                <td>
                    <comp-adv v-model="inputDatas.advs"></comp-adv>
                </td>
            </tr>
        </template>

        <template slot="input_result">
            <span>
                <span class="title">검색어 1</span>
                <template>
                    <span v-if="inputDatas.advs.keyword_1.useAdv" class="is-as">AS</span>
                    {{ inputDatas.advs.keyword_1.name.length ? inputDatas.advs.keyword_1.name : '-' }}
                </template>
            </span>
            <span v-for="$idx in 2" v-bind:key="$idx + 1">
                <span class="title">검색어 {{ $idx + 1 }}</span>
                <template v-if="inputDatas.advs['keyword_' + ($idx + 1)].name.length"><span v-if="inputDatas.advs['keyword_' + ($idx + 1)].useAdv" class="is-as">AS</span>{{ inputDatas.advs['keyword_' + ($idx + 1)].name }}</template>
                <template v-else> - </template>
            </span>
            <span>
                <span class="title">검색기간</span>
                <span v-html="searchDates"></span>
            </span>
            <span>
                <span class="title">비교기간</span>
                <span v-html="searchPrevDates"></span>
            </span>
        </template>

        <!-- 결과 -->
        <template slot="results">
            <span class="item">
                <span v-html="getResultDate"></span>
            </span>
            <span v-for="($item, $idx) in getResultKeywords" v-bind:key="$idx" class="item is-customColor" v-html="$item.resultTxt" :style="'--color:' + $item.color"></span>
        </template>
    </comp-topsearch>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'comp-adv-top-searchs',
    data: function () {
        return {
            isFirstSet: true,
            inputDatas: {
                // 고급 검색 키워드
                advs: {
                    keyword_1: {
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.$store.getters.getAnalTargets.ts[0].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        date_disabled: true, // 범위달력 사용 여부
                        s_date: {
                            date: new Date().dateToStr(), // 시작 날짜
                        },
                        e_date: {
                            date: new Date().dateToStr(), // 종료 날짜
                        },
                        ps_date: {
                            date: new Date().dateToStr(), // 시작 날짜(이전기간)
                        },
                        pe_date: {
                            date: new Date().dateToStr(), // 종료 날짜(이전기간)
                        },
                        popChk: true,
                        useAdv: null,
                    },
                    keyword_2: {
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.$store.getters.getAnalTargets.ts[1].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        date_disabled: true, // 범위달력 사용 여부
                        s_date: {
                            date: '', // 시작 날짜
                        },
                        e_date: {
                            date: '', // 종료 날짜
                        },
                        ps_date: {
                            date: '', // 시작 날짜(이전기간)
                        },
                        pe_date: {
                            date: '', // 종료 날짜(이전기간)
                        },
                        popChk: true,
                        useAdv: null,
                    },
                    keyword_3: {
                        name: '', // 이름
                        keyword_normal: '', // 일반 키워드
                        keyword_construction: '', // 구문 키워드
                        keyword_adjacency: '', // 인접 키워드
                        keyword_except: '', // 제외 키워드
                        color: this.$store.getters.getAnalTargets.ts[2].color, // 컬러
                        rule: '', // 키워드 조합 룰
                        date_disabled: true, // 범위달력 사용 여부
                        s_date: {
                            date: '', // 시작 날짜
                        },
                        e_date: {
                            date: '', // 종료 날짜
                        },
                        ps_date: {
                            date: '', // 시작 날짜(이전기간)
                        },
                        pe_date: {
                            date: '', // 종료 날짜(이전기간)
                        },
                        popChk: true,
                        useAdv: null,
                    },
                },

                // 분석대상
                // 검색 키워드 분석 대상으로 변경
                analsList: [
                    // { s_date: { date: '2022-10-01' }, e_date: { date: '2022-10-15' }, ps_date: { date: '2022-09-16' }, pe_date: { date: '2022-09-31' }, code: '2_1', color: '#8c59ff', name: '빙그레' },
                    // { s_date: { date: '2022-10-11' }, e_date: { date: '2022-10-25' }, ps_date: { date: '2022-09-25' }, pe_date: { date: '2022-10-10' }, code: '2_3', color: '#ed69f5', name: '남양유업' },
                    // { s_date: { date: '2022-10-16' }, e_date: { date: '2022-10-30' }, ps_date: { date: '2022-09-30' }, pe_date: { date: '2022-10-15' }, code: '2_4', color: '#34bdc9', name: '동원F&B' },
                ],

                // 날짜(달력)
                min_date: '2022-12-01',
                max_date: new Date().dateToStr(),
                p_min_date: '2022-11-30',
                p_max_date: new Date().dateToStr(),

                // 검색 버튼 비활성화
                searchDisabled: false,
            },
            searchDates: {},
            searchPrevDates: {},
            popChk: true,
            resultDatas: {},
            useAdvChk: null,
        };
    },
    props: {
        searchInputDatas: { type: Object },
        searchDatas: { type: Object },
    },
    computed: {
        ...mapGetters(['getAnalTargets']),
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
        getSearchDate() {
            if (!this.inputDatas.advs.keyword_1.date_disabled) return '개별설정';
            return this.inputDatas.advs.keyword_1.s_date.date + '~' + this.inputDatas.advs.keyword_1.e_date.date;
        },
        getPervSearchDate() {
            if (!this.inputDatas.advs.keyword_1.date_disabled) return '-';
            if (!this.inputDatas.advs.keyword_1.ps_date || !this.inputDatas.advs.keyword_1.pe_date) return '';
            return this.inputDatas.advs.keyword_1.ps_date.date + '~' + this.inputDatas.advs.keyword_1.pe_date.date;
        },
        getAnalList() {
            let result = [];

            if (this.inputDatas.advs) {
                for (var Loop1 = 1; Loop1 <= 3; ++Loop1) {
                    if (this.inputDatas.advs['keyword_' + Loop1].name.length) {
                        let item = this.inputDatas.advs['keyword_' + Loop1];
                        result.push({
                            seq: Loop1,
                            s_date: item.s_date,
                            e_date: item.e_date,
                            ps_date: item.ps_date,
                            pe_date: item.pe_date,
                            code: item.name,
                            color: item.color,
                            name: item.name,
                            keyword_normal: item.keyword_normal,
                            keyword_adjacency: item.keyword_adjacency,
                            keyword_except: item.keyword_except,
                            keyword_construction: item.keyword_construction,
                            rule: item.rule,
                            range: item.range,
                            date_disabled: item.date_disabled,
                        });
                    }
                }
            }
            return result;
        },
        getResultDate() {
            let result = '';
            if (this.searchDatas.advs && !this.searchDatas.advs.keyword_1.date_disabled) {
                result = '기간 개별설정(PoP)';
            } else {
                if (this.searchDatas.advs) {
                    result = '' + '<span>' + this.searchDatas.advs.keyword_1.ps_date.date + '~' + this.searchDatas.advs.keyword_1.pe_date.date + '</span>' + ' ~ ' + '<strong>' + this.searchDatas.advs.keyword_1.s_date.date + '~' + this.searchDatas.advs.keyword_1.e_date.date + '</strong>';
                }
            }
            return result;
        },
        getResultKeywords() {
            let result = [];
            if (this.resultDatas.advs) {
                for (var Loop1 = 1; Loop1 <= 3; ++Loop1) {
                    let item = JSON.parse(JSON.stringify(this.resultDatas.advs['keyword_' + Loop1]));
                    if (item.name.length) {
                        item.resultTxt = '';
                        if (item.useAdv) {
                            item.resultTxt += '<span class="is-as">AS</span>';
                        }
                        item.resultTxt += item.name;

                        result.push(item);
                    }
                }
            }
            return result;
        },
        validateMinlength() {
            // 검색어 글자수 2자 미만 일 때 검색 버튼 비활성화
            const advs = this.inputDatas.advs;
            let validateMinlength = Object.values(advs).filter(adv => adv.validation);
            return validateMinlength.length > 0;
        },
    },
    created() {
        if (this.searchInputDatas && Object.keys(this.searchInputDatas).length) {
            Object.assign(this.inputDatas, this.searchInputDatas);
        } else {
            this.inputDatas.advs.keyword_1.name = 'GS리테일';
            this.inputDatas.advs.keyword_1.keyword_normal = 'GS리테일';
        }
    },
    mounted() {},
    watch: {
        inputDatas: {
            deep: true,
            handler($val) {
                if ((this.getAnalList && !this.getAnalList.length) || (!$val.advs.keyword_1.date_disabled && !$val.advs.keyword_1.range) || this.validateMinlength) this.inputDatas.searchDisabled = true;
                else this.inputDatas.searchDisabled = false;

                // 검색(현재/이전) 날짜 변경
                this.searchDates = !$val.advs.keyword_1.date_disabled ? '개별설정' : '<strong>' + $val.advs.keyword_1.s_date.date + '~' + $val.advs.keyword_1.e_date.date + '</strong>';
                this.searchPrevDates = !$val.advs.keyword_1.date_disabled ? '직전동기간' : $val.advs.keyword_1.ps_date.date + '~' + $val.advs.keyword_1.pe_date.date + ($val.advs.keyword_1.popChk ? '(직전동기간)' : '');
                $val.analsList = this.getAnalList;

                // 컬러 재정의
                $val.advs.keyword_1.color = this.getAnalTargets.ts[0].color;
                $val.advs.keyword_2.color = this.getAnalTargets.ts[1].color;
                $val.advs.keyword_3.color = this.getAnalTargets.ts[2].color;

                this.$emit('update:searchInputDatas', JSON.parse(JSON.stringify($val)));
            },
        },
        resultDatas($val) {
            let tmp = JSON.parse(JSON.stringify(this.inputDatas));

            // 검색(현재/이전) 날짜 변경
            this.result_searchDates = !$val.advs.keyword_1.date_disabled ? '개별설정' : '<strong>' + $val.advs.keyword_1.s_date.date + '~' + $val.advs.keyword_1.e_date.date + '</strong>';
            this.result_searchPrevDates = !$val.advs.keyword_1.date_disabled ? '직전동기간' : $val.advs.keyword_1.ps_date.date + '~' + $val.advs.keyword_1.pe_date.date + ($val.advs.keyword_1.popChk ? '(직전동기간)' : '');

            // 가비지 파라미터 제거
            delete tmp.advs.keyword_1.json_data;
            delete tmp.advs.keyword_2.json_data;
            delete tmp.advs.keyword_3.json_data;
            delete tmp.advs.keyword_1.advChk;
            delete tmp.advs.keyword_2.advChk;
            delete tmp.advs.keyword_3.advChk;
            delete tmp.advs.keyword_1.favorites;
            delete tmp.advs.keyword_2.favorites;
            delete tmp.advs.keyword_3.favorites;

            // 컬러 재정의
            tmp.advs.keyword_1.color = this.getAnalTargets.ts[0].color;
            tmp.advs.keyword_2.color = this.getAnalTargets.ts[1].color;
            tmp.advs.keyword_3.color = this.getAnalTargets.ts[2].color;

            this.$emit('update:searchDatas', tmp);

            // 검색조건 저장
            // if (!this.isFirstSet) {
            //     let sendDatas = JSON.parse(JSON.stringify(tmp));

            //     // 개행 \n -> \\n 치환
            //     let items = [sendDatas.advs.keyword_1, sendDatas.advs.keyword_2, sendDatas.advs.keyword_3];
            //     sendDatas.analsList.forEach($item => {
            //         items.push($item);
            //     });
            //     items.forEach($item => {
            //         $item.keyword_normal = $item.keyword_normal.trim().replaceAll('\n', '\\n');
            //         $item.keyword_construction = $item.keyword_construction.trim().replaceAll('\n', '\\n');
            //         $item.keyword_adjacency = $item.keyword_adjacency.trim().replaceAll('\n', '\\n');
            //         $item.keyword_except = $item.keyword_except.trim().replaceAll('\n', '\\n');
            //     });

            //     this.$store.dispatch('SAVE_SEARHOPTIONS', [this.$store.getters.getPage, this.$store.getters.getUser.id, sendDatas]).then($res => {
            //     if (!$res.data.result) {
            //         this.$store.dispatch('NOTY_ERR', '검색조건을 저장하지 못했습니다.');
            //     }
            // })
            // .catch($err => {
            //     this.$store.dispatch('NOTY_ERR', '검색조건을 저장하지 못했습니다.');
            //     console.log($err)
            // });
            // }

            // 최초 설정 후 값 변경
            // this.isFirstSet = false;

            // 전체 로딩 시작
            // this.$store.dispatch.$emit('LOAD_START');
        },
    },
    methods: {},
};
</script>

<style lang="scss" scoped></style>
