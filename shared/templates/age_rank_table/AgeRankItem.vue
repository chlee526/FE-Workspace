<template>
    <table class="keyword_table ui-loader-container" :class="{ 'is-loading': loading }">
        <thead>
            <tr>
                <th>
                    <div class="ui_multi_opts_select is-large">
                        <div class="input" @click="evt_inputClick">
                            <strong>{{ selected_txt }}<span :class="expanded ? 'icon-caret-up' : 'icon-caret-down'" style="margin-left: 5px"></span></strong>
                        </div>
                        <div ref="list" class="list">
                            <transition name="fade_posy">
                                <div v-if="expanded" class="wrap">
                                    <div class="list_option">
                                        <div>
                                            <div class="dcp radio is-box is-small" v-for="(item, idx) in gender_opts" :key="idx + '_key'">
                                                <input v-model="genderCd" type="radio" :id="'radio_01_' + item.code + '_' + id" :name="'radio_01_' + item.code + '_' + id" :value="item.code" />
                                                <label :for="'radio_01_' + item.code + '_' + id"
                                                    ><span class="txt">{{ item.name }}</span></label
                                                >
                                            </div>
                                        </div>
                                        <div>
                                            <div class="dcp radio is-box is-small" v-for="(item, idx) in age_opts" :key="idx + '_key'">
                                                <input v-model="ageCd" type="radio" :id="'radio_02_' + item.code + '_' + id" :name="'radio_02_' + item.code + '_' + id" :value="item.code" />
                                                <label :for="'radio_02_' + item.code + '_' + id"
                                                    ><span class="txt">{{ item.name }}</span></label
                                                >
                                            </div>
                                        </div>
                                    </div>
                                    <div class="btns" style="display: flex; padding: 5px; background: #f1f1f1; box-sizing: border-box; text-align: center">
                                        <button class="ui_btn is-small is-icon-only" title="선택초기화" @click="evt_allCancleClick"><span class="icon">&#xe020;</span></button>
                                        <button class="ui_btn is-small is-color-black" @click="evt_confirmClick" style="margin-left: auto" :disabled="confirmChck"><span>검색</span></button>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody v-if="keywords.length">
            <tr v-for="(rank, idx) in rankRange" :key="idx" :class="{ on: ageRankList[idx]?.name === focusWord }">
                <td v-if="ageRankList[idx]" :class="{ 'is-custom-active': analsList[0] && analsList[0].code === ageRankList[idx].code }" :style="analsList[0] && analsList[0].code === ageRankList[idx].code ? '--color:' + setAnalColor : ''" @click="evt_keywordClick(ageRankList[idx])" @mouseover="updateFocusWord(ageRankList[idx].name)" @mouseout="updateFocusWord()">
                    <div>
                        <span>{{ ageRankList[idx].name }}</span>
                    </div>
                </td>
                <td v-else>
                    <div>
                        <span>-</span>
                    </div>
                </td>
            </tr>
        </tbody>
        <tbody v-else class="empty_table">
            <tr class="no_data">
                <td class="no_data">
                    <span class="ui_no_data_txt">데이터가 없습니다.</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { uuid } from 'vue-uuid';
import $ from 'jquery';
import { API_rkeywordWithAttr } from '@shared/api/rkeyword';
import EventBus from '@shared/utils/eventBus';
export default {
    name: 'tmpl-age-rank-item',
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            loading: false,
            ageCd: 0, // 연령 코드
            genderCd: 0, // 성별 코드
            ageRankList: [], // 데이터 리스트
            gender_opts: [], // 성별 옵션
            age_opts: [], // 연령 옵션
            expanded: false, // 헤더 toggle
            showList: true,
        };
    },
    props: {
        rankRange: { type: [String, Number], default: '20' }, //순위 범위
        keywords: { type: Array }, // 연령, 성별 검색 조건
        id: { type: Number },
        commonSearchOpts: { type: Object }, // 공통 검색 조건
        value: {},
        focusWord: { type: String, default: '' },
    },
    computed: {
        analsList: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        setAnalColor() {
            let color = this.$store.getters.getAnalTargets.default[0].color;
            return color;
        },
        selected_txt() {
            let result = '';

            if (!this.genderCd || !this.ageCd) {
                return (result = '선택해주세요');
            } else {
                const gender = this.gender_opts.find((item) => {
                    if (item.code == this.genderCd) {
                        return item;
                    }
                });

                const age = this.age_opts.find((item) => {
                    if (item.code == this.ageCd) {
                        return item;
                    }
                });

                if (gender.length == 0 || age.length == 0) {
                    result = '선택해주세요';
                } else {
                    result = gender.name + ' X ' + age.name;
                }

                return result;
            }
        },
        confirmChck() {
            if (!this.genderCd || !this.ageCd) {
                return true;
            } else {
                return false;
            }
        },
    },
    created() {
        this.keywords.forEach((item) => {
            if (!this.gender_opts.length && item.name == 'gender') {
                this.gender_opts = item.list;
                this.genderCd = item.dv;
            }

            if (!this.age_opts.length && item.name == 'age') {
                this.age_opts = item.list;
                this.ageCd = item.dv;
            }
        });
    },
    mounted() {
        if (!this.ageRankList.length) {
            this.fetchList();
        }
    },
    watch: {
        keywords: {
            deep: true,
            handler(val) {
                if (
                    this.genderCd !=
                        val.find((item) => {
                            if (item.name == 'gender') {
                                return item;
                            }
                        }).dv ||
                    this.ageCd !=
                        val.find((item) => {
                            if (item.name == 'age') {
                                return item;
                            }
                        }).dv
                ) {
                    this.genderCd = val.find((item) => {
                        if (item.name == 'gender') {
                            return item;
                        }
                    }).dv;

                    this.ageCd = val.find((item) => {
                        if (item.name == 'age') {
                            return item;
                        }
                    }).dv;

                    this.fetchList();
                }
            },
        },
        expanded(val) {
            if (val) {
                $(document).click(this.evt_docClick);
            } else {
                $(document).unbind('click', this.evt_docClick);
            }
        },
        commonSearchOpts: {
            deep: true,
            handler(val) {
                this.fetchList();
            },
        },
    },
    methods: {
        /**
         * v-model 초기화
         */
        resetAnalsList() {
            if (this.analsList.length) {
                let checkedWord = this.ageRankList ? this.ageRankList.filter((item) => item.code === this.analsList[0].code) : '';

                // 기존 analsList에 적용된 컴포넌트였는데 기존 분석대상이 없을 경우 초기화
                if (!checkedWord.length && this.analsList[0].id === this.id) {
                    this.analsList = [];
                }
            }
        },

        /**
         * 연관어 fetch
         *
         */

        async fetchList() {
            // 선택 값 초기화
            this.analsList = [];

            if (!this.genderCd || !this.ageCd) {
                this.expanded = true;
                this.showList = true;
                this.ageRankList = [];
            } else {
                this.loading = true;
                this.apiParams = JSON.parse(JSON.stringify(this.commonSearchOpts));
                this.apiParams.row_limit = this.rankRange;

                this.apiParams.type_code = {
                    gender: this.genderCd,
                    age: this.ageCd,
                };

                await API_rkeywordWithAttr(this.apiUID, this.apiParams)
                    .then((res) => {
                        const dataList = res.data;

                        // data 코드에 고유값 부여
                        if (dataList) {
                            this.expanded = false;
                            dataList.forEach((item) => {
                                item.code = `${this.id}_${item.name}`;
                            });
                        }

                        this.ageRankList = dataList;
                    })
                    .finally(() => {
                        this.showList = !this.ageRankList.length ? true : false;
                        this.resetAnalsList();
                        this.age_setAnalsList(this.ageRankList);
                        this.loading = false;
                    });
            }
        },

        /**
         * 검색 조건 영역 외 클릭 이벤트
         */
        evt_docClick(e) {
            if (!this.genderCd || !this.ageCd) {
                this.expanded = true;
            } else {
                if (!$.contains(this.$el, e.target)) {
                    if (this.keywords[0].dv !== this.genderCd) {
                        this.genderCd = this.keywords[0].dv;
                    }

                    if (this.keywords[1].dv !== this.ageCd) {
                        this.ageCd = this.keywords[1].dv;
                    }

                    this.keywords.forEach((item, idx) => {
                        if (item.name == 'gender') {
                            if (item.dv != this.genderCd) {
                                this.genderCd = item.dv;
                            }
                        } else {
                            if (item.dv != this.ageCd) {
                                this.ageCd = item.dv;
                            }
                        }
                    });

                    this.expanded = false;
                }
            }
        },

        /**
         * 검색 조건 초기화
         */
        evt_allCancleClick() {
            if (!this.keywords[0].dv || !this.keywords[1].dv) {
                this.genderCd = '';
                this.ageCd = '';
            } else {
                this.genderCd = this.keywords[0].dv;
                this.ageCd = this.keywords[1].dv;
            }
        },

        /**
         * 검색 조건 적용
         */
        evt_confirmClick() {
            this.fetchList();
            this.expanded = false;

            this.$emit('updateOpts', { id: this.id, gender: this.genderCd, age: this.ageCd });
        },

        /**
         * 검색 조건 헤더 클릭 시 활성화/비활성화
         */
        evt_inputClick() {
            this.expanded = !this.expanded;
        },

        /**
         * 키워드 클릭 이벤트
         */
        evt_keywordClick(keyword) {
            let analsList = [
                {
                    id: this.id, //클릭 한 테이블 index
                    genderCode: this.genderCd, //성별 선택
                    ageCode: this.ageCd, //연령 선택
                    selected_txt: this.selected_txt, //성별X연령
                    name: keyword.name, //클릭 한 키워드
                    code: keyword.code, //클릭 한 키워드 코드
                },
            ];

            this.analsList = analsList;
        },

        updateFocusWord(val) {
            this.$emit('updateFocusWord', val);
        },

        /**
         * template option 업데이트 전용
         * age_setAnalsList 키값을 가진 eventbus가 있을 때만 실행
         *
         */
        age_setAnalsList(val) {
            if (EventBus._events['age_setAnalsList']) {
                let tmp = val.map((item) => {
                    item = {
                        id: this.id, //클릭 한 테이블 index
                        genderCode: this.genderCd, //성별 선택
                        ageCode: this.ageCd, //연령 선택
                        selected_txt: this.selected_txt, //성별X연령
                        name: item.name, // 키워드
                        code: item.code, // 키워드 코드
                    };

                    return item;
                });

                EventBus.$emit('age_setAnalsList', tmp);
            }
        },
    },
};
</script>
