<template>
    <div class="wrap">
        <section ref="modal_item" class="ui_box popup_item popup_adv_detail">
            <span class="bg" @click="close"></span>
            <div class="header">
                <div class="wrap">
                    <h2>
                        <strong>고급검색어설정</strong>
                    </h2>
                    <button type="button" class="close" title="팝업 닫기" @click="close">팝업 닫기</button>
                </div>
            </div>
            <div class="wrap">
                <div class="content" :style="'max-height:' + (hgt - contentHgt) + 'px'">
                    <!-- 탭영역 -->
                    <div class="tab">
                        <ul>
                            <li v-for="($item, $idx) in advs" :key="$idx">
                                <comp-modal-adv-detail-tab :id="'adv_detail_tab_' + $idx" :class="{ 'is-active': selectIdx == $idx }" v-model="$item.name" :adv="$item" @reset="evt_reset($item)" :select-idx="selectIdx" @select="evt_select($idx)" @confirm="evt_input_confirm" :style="'--color:' + $item.color"></comp-modal-adv-detail-tab>
                            </li>
                        </ul>
                    </div>

                    <!-- 키워드 영역 -->
                    <div class="keywords">
                        <div class="keyword" v-for="($item, $idx) in getKeywords" :key="$idx">
                            <div class="title">
                                <comp-bubble-box :content="setErrorMsg($item.key)" class="is-validation" :arrow-fixed="true" :show-fixed="isShow($item.key)">
                                    <strong :style="'--color:' + $item.color">{{ $item.name }}</strong>
                                </comp-bubble-box>
                                <span>조건키워드</span>
                                <comp-bubble-box class="is-helper" :subject="$item.name + ' 조건 키워드'" :html-type="true" pos="CB">
                                    <button class="ui_btn is-icon-only is-xsmall"><span class="icon">&#xe006;</span></button>
                                    <div slot="html-content" v-html="$item.helper"></div>
                                </comp-bubble-box>
                            </div>
                            <comp-textarea :id="'adv_detail_ta_' + $idx" v-model="selectKeyword[$item.key]" rows="12" :placeholder="$item.ph" @blur="evt_ta_blur" @keyup="validationLength"></comp-textarea>
                        </div>
                    </div>

                    <!-- 버튼 -->
                    <div class="btns">
                        <comp-bubble-box content="입력 최대값(200자)을 넘었습니다" class="is-validation" :show-fixed="getInputKeywordLen > 200">
                            <button type="button" class="btn_set ui_btn is-large is-wide is-color-black" title="고급설정" tabindex="-1" @click="evt_confirm" :disabled="getInputKeywordLen > 200 || failValidation">
                                <span class="txt">저장 및 닫기</span>
                                <span style="width: 60px; font-size: 12px; text-align: right">({{ getInputKeywordLen }}/200)</span>
                            </button>
                        </comp-bubble-box>
                    </div>

                    <!-- 도움말 -->
                    <div class="ui_help_box is-fixed">
                        <div class="wrap">
                            <ul>
                                <li>
                                    <strong>일반, 구문, 인접조건 간에는 OR연산, 제외조건은 AND연산이 적용됩니다.</strong>
                                </li>
                                <li>
                                    <strong>동일 조건에 여러 개의 검색어 입력 시, 줄바꿈으로 구분해 주세요. (OR연산 적용)</strong>
                                </li>
                                <li>
                                    <strong>전체 검색어의 글자 수는 최대 200자입니다.</strong>
                                </li>
                                <li>
                                    <strong>조건 정의</strong>
                                    <ul>
                                        <li>일반조건 : 입력한 단어들이 모두 포함된 경우 검색</li>
                                        <li>구문조건 : 공백을 포함한 구문이 그대로 포함된 경우 검색</li>
                                        <li>인접조건 : 공백으로 구분된 단어들이 15자 이내에 포함된 경우 검색</li>
                                        <li>제외조건 : 입력한 단어가 포함된 경우 검색에서 제외</li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import compModalAdvDetailTab from './AdvInputDetailTab.vue';
import EventBus from '@shared/utils/eventBus';
export default {
    name: 'comp-modal-adv-detail',
    components: { compModalAdvDetailTab },
    data() {
        return {
            loading: false,
            contentHgt: 170,
            isFirst: true,

            selectIdx: null,
            selectKeyword: null,
            advs: {
                keyword_1: JSON.parse(JSON.stringify(this.searchParams.keyword_1)),
                keyword_2: JSON.parse(JSON.stringify(this.searchParams.keyword_2)),
                keyword_3: JSON.parse(JSON.stringify(this.searchParams.keyword_3)),
            },

            minlengthOpts: {}, //키워드 조건 별 최소 글자수 검증
            failValidation: false, //글자수 검증 통과 여부
        };
    },

    props: {
        popName: { type: String },
        searchParams: { type: Object },
        hgt: { type: Number },
        selectKeywordName: { type: String },
    },

    computed: {
        getKeywords() {
            return [
                {
                    name: '일반',
                    color: '#999999',
                    key: 'keyword_normal',
                    ph: '줄바꿈 / Enter 로 구분된 키워드들 중\r\n적어도 한 개가 포함(OR 조건)되면\r\n검색합니다.',
                    helper: `
                            <ul>
                                <li>
                                    개별 단어는 정확히 포함(구문 조건), 한 줄 내에 띄어쓰기로 구분된 단어들은 모두 포함(AND 조건)된 경우 검색합니다.
                                    <br>
                                    줄바꿈 / Enter 로 구분된 키워드들 중 적어도 한 개가 포함(OR 조건)되면 검색합니다.
                                    <br>
                                    <span class="ex is-block">
                                        <span style="display: flex">
                                            <span>일반 조건 키워드 :</span>
                                            <span style="padding-left: 8px;">애플 아이폰<br>삼성 갤럭시</span>
                                        </span>
                                        <br>
                                        ➔ 조합결과 : ("애플" AND "아이폰") OR ("삼성" AND "갤럭시")
                                        <br>
                                        ➔ 검색결과 : 키워드 간의 순서/거리 상관없이 '애플'과 '아이폰'이 모두 언급되었거나,<br>'삼성'과 '갤럭시'가 모두 포함된 문서
                                    </span>
                                </li>
                            </ul>
                        `,
                },
                {
                    name: '구문',
                    color: '#999999',
                    // color: '#81a5e7',
                    key: 'keyword_construction',
                    ph: '줄바꿈 / Enter 로 구분된 키워드들 중\r\n적어도 한 개가 포함(OR 조건)되면\r\n검색합니다.',
                    helper: `
                            <ul>
                                <li>
                                    한 줄 내에 띄어쓰기로 구분된 단어들이 정확히 포함(구문 조건)된 경우 검색합니다.
                                    <br>
                                    줄바꿈 / Enter 로 구분된 키워드들 중 적어도 한 개가 포함(OR 조건)되면 검색합니다.
                                    <br>
                                    <span class="ex is-block">
                                        <span style="display: flex">
                                            <span>구문 조건 키워드 :</span>
                                            <span style="padding-left: 8px;">애플 아이폰<br>삼성 갤럭시</span>
                                        </span>
                                        <br>
                                        ➔ 조합결과 : ("애플 아이폰") OR ("삼성 갤럭시")
                                        <br>
                                        ➔ 검색결과 : '애플 아이폰' 또는 '삼성 갤럭시'가 포함된 문서
                                    </span>
                                </li>
                            </ul>
                        `,
                },
                {
                    name: '인접',
                    color: '#999999',
                    // color: '#7bc77d',
                    key: 'keyword_adjacency',
                    ph: '줄바꿈 / Enter 로 구분된 키워드들 중\r\n적어도 한 개가 포함(OR 조건)되면\r\n검색합니다.',
                    helper: `
                            <ul>
                                <li>
                                    한 줄 내에 띄어쓰기로 구분된 단어들이 15글자 내에 모두 포함(인접 조건)된 경우 검색합니다.
                                    <br>
                                    줄바꿈 / Enter 로 구분된 키워드들 중 적어도 한 개가 포함(OR 조건)되면 검색합니다.
                                    <br>
                                    <span class="ex is-block">
                                        <span style="display: flex">
                                            <span>인접 조건 키워드 :</span>
                                            <span style="padding-left: 8px;">애플 아이폰<br>삼성 갤럭시</span>
                                        </span>
                                        <br>
                                        ➔ 조합결과 : ("애플 아이폰"~ 15) OR ("삼성 갤럭시"~ 15)
                                        <br>
                                        <span style="display: flex">
                                            <span>➔ 검색결과 : </span>
                                            <span style="padding-left: 8px;">키워드 간의 순서 상관없이 '애플'과 '아이폰'이 15글자 내에 모두 언급되었거나,<br>'삼성'과 '갤럭시'가 15글자 내에 모두 포함된 문서</span>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        `,
                },
                {
                    name: '제외',
                    color: '#999999',
                    // color: '#e98989',
                    key: 'keyword_except',
                    ph: '줄바꿈 / Enter 로 구분된 키워드들 중\r\n적어도 한 개가 포함(OR 조건)되면\r\n검색에서 제외합니다.',
                    helper: `
                            <ul>
                                <li>
                                    개별 단어는 정확히 포함(구문 조건), 한 줄 내에 띄어쓰기로 구분된 단어들은 모두 포함(AND 조건)된 경우 검색에서 제외합니다.
                                    <br>
                                    줄바꿈 / Enter 로 구분된 키워드들 중 적어도 한 개가 포함(OR 조건)되면 검색에서 제외합니다.
                                    <br>
                                    <span class="ex is-block">
                                        <span style="display: flex">
                                            <span>제외 조건 키워드 :</span>
                                            <span style="padding-left: 8px;">애플 아이폰<br>삼성 갤럭시</span>
                                        </span>
                                        <br>
                                        ➔ 조합결과 : NOT(("애플" AND "아이폰") OR ("삼성" AND "갤럭시"))
                                        <br>
                                        <span style="display: flex">
                                            <span>➔ 검색결과 : </span>
                                            <span style="padding-left: 8px;">키워드 간의 순서/거리 상관없이 '애플'과 '아이폰'이 모두 언급되었거나,<br>'삼성'과 '갤럭시'가 모두 포함된 문서 제외</span>
                                        </span>
                                    </span>
                                </li>
                            </ul>
                        `,
                },
            ];
        },
        /**
         * 고급검색을 사용중인지 체크
         * 조건키워드가 있거나, 노멀 키워드가 2개 이상이거나 이면 'true'
         * @returns {Boolean}
         */
        getUseAdv() {
            let result = (this.selectKeyword.keyword_normal.length && this.selectKeyword.keyword_normal.split('\n').filter($item => $item.length).length > 1) || (this.selectKeyword.keyword_normal.length && this.selectKeyword.keyword_normal.split(' ').filter($item => $item.length).length > 1) || this.selectKeyword.keyword_construction.length || this.selectKeyword.keyword_adjacency.length || this.selectKeyword.keyword_except.length;
            result = result === true || result !== 0 ? true : false;
            return result;
        },
        getTitle() {
            if (this.selectKeyword.keyword_normal.length > 0) return this.selectKeyword.keyword_normal;
            else if (this.selectKeyword.keyword_construction.length > 0) return this.selectKeyword.keyword_construction;
            else if (this.selectKeyword.keyword_adjacency.length > 0) return this.selectKeyword.keyword_adjacency;
            else if (this.selectKeyword.keyword_except.length > 0) return this.selectKeyword.keyword_except;
            return '';
        },
        getInputKeywordLen() {
            return this.selectKeyword.keyword_normal.length + this.selectKeyword.keyword_adjacency.length + this.selectKeyword.keyword_construction.length + this.selectKeyword.keyword_except.length;
        },
    },

    created() {
        this.selectIdx = this.selectKeywordName;
        this.selectKeyword = this.advs[this.selectIdx];
    },
    mounted() {
        this.validationLength();
    },
    watch: {
        'selectKeyword.name'($val) {
            if ($val.length > 15) this.selectKeyword.name = $val.slice(0, 14);
        },
    },
    methods: {
        trimKeyword(obj) {
            // 앞 뒤 공백제거 & 중복공백 공백하나로 변경
            if (this.selectKeyword[obj]) {
                this.selectKeyword[obj] = this.selectKeyword[obj].trim().replaceAll(/\s+(?=\s)|\n+(?=\s)|\s+(?=\n)|\n+(?=\n)/g, '');
            }
        },
        isShow(key) {
            return this.minlengthOpts[this.selectIdx][key].isOpen;
        },
        validationLength() {
            // 키워드 글자수 검증
            const val = this.selectKeyword;
            const keys = this.getKeywords.map(item => item.key);
            keys.forEach(item => {
                if (val[item]) {
                    // 앞 뒤 공백제거 & 중복공백 공백하나로 변경
                    let split = val[item].trim().replaceAll(/\s+(?=\s)|\n+(?=\s)|\s+(?=\n)|\n+(?=\n)/g, '');
                    switch (item) {
                        case 'keyword_adjacency':
                        case 'keyword_except':
                        case 'keyword_normal':
                            split = split.split(/\s|\n/);
                            break;
                        default:
                            split = split.split(/\n/);
                            break;
                    }
                    split = split.map(word => {
                        return { word: word, isOpen: word.length < 2 && word.length };
                    });
                    // 글자수가 부족하면 bubble open
                    this.minlengthOpts[this.selectIdx][item].isOpen = split.getParseDatas({ isOpen: true }).length > 0;
                } else {
                    this.minlengthOpts[this.selectIdx][item].isOpen = false;
                }
            });
            // 저장버튼 disabled
            let isOpenCnt = 0;
            Object.values(this.minlengthOpts).forEach(item => {
                isOpenCnt += Object.values(item).getParseDatas({ isOpen: true }).length;
            });
            this.failValidation = isOpenCnt > 0;
        },
        setErrorMsg(keyword) {
            this.minlengthOpts[this.selectIdx] = this.minlengthOpts[this.selectIdx] ? this.minlengthOpts[this.selectIdx] : {};
            if (!this.minlengthOpts[this.selectIdx][keyword]) {
                this.minlengthOpts[this.selectIdx][keyword] = { isOpen: false };
            }
            return '검색어는 2글자 이상 입력해주세요.';
        },
        // 키워드 선택(keyword_1, keyword_2, keyword_3)
        evt_select($idx) {
            this.selectIdx = $idx;
            this.selectKeyword = this.advs[$idx];
        },
        // 선택 키워드 리셋
        evt_reset($val) {
            $val.name = '';
            $val.keyword_normal = '';
            $val.keyword_construction = '';
            $val.keyword_adjacency = '';
            $val.keyword_except = '';
            $val.rule = '';
        },
        // 저장
        evt_confirm() {
            EventBus.$emit('ADV_SAVE', this.advs);
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },

        // 검색창 Blur
        evt_input_confirm() {
            if (!this.getUseAdv) {
                this.selectKeyword.keyword_normal = this.selectKeyword.name;
                this.validationLength();
            }
        },
        // 텍스트 에어리어 Blur
        evt_ta_blur() {
            this.trimKeyword('keyword_normal');
            this.trimKeyword('keyword_construction');
            this.trimKeyword('keyword_adjacency');
            this.trimKeyword('keyword_except');

            if (!this.selectKeyword.name.length) {
                if (this.selectKeyword.keyword_normal.length) this.selectKeyword.name = this.selectKeyword.keyword_normal.split('\n')[0];
                else if (this.selectKeyword.keyword_construction.length) this.selectKeyword.name = this.selectKeyword.keyword_construction.split('\n')[0];
                else if (this.selectKeyword.keyword_adjacency.length) this.selectKeyword.name = this.selectKeyword.keyword_adjacency.split('\n')[0];
                else if (this.selectKeyword.keyword_except.length) this.selectKeyword.name = this.selectKeyword.keyword_except.split('\n')[0];
            }
        },

        close: function () {
            EventBus.$emit('MODAL_CLOSE', this.popName);
        },
    },
};
</script>

<style lang="scss" scoped></style>
