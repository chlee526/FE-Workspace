<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- 사이드 영역 -->
            <comp-side-follow></comp-side-follow>
            <!-- 사이드 영역 -->

            <!-- Location -->
            <comp-location>
                <span class="item">로케이션</span>
            </comp-location>
            <!-- // Location -->

            <!-- 검색조건 -->
            <comp-adv-topsearchs :search-datas.sync="topSearchDatas"></comp-adv-topsearchs>
            <!-- // 검색조건 -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap is-cols-pad">
                            <div class="ui_col w12">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3>
                                                <span>고급 검색</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="code_viewer">
                                                <div class="description">고급 검색 컴포넌트.<br /></div>
                                                <div class="ref">
                                                    <dl class="nec">
                                                        <dt>v-model<span class="type">Object</span></dt>
                                                        <dd>검색어 정보</dd>
                                                    </dl>
                                                </div>
                                                <div class="wrap">
                                                    <highlightjs
                                                        language="html"
                                                        code='<!-- 기본 -->
<!-- 페이지내 topsearchs 파일에서 사용 -->

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
</comp-topsearch>

<script>
    data(){
        return {
            inputDatas: {
                advs: {
                    keyword_1: {
                        name: "", // 이름
                        keyword_normal: "", // 일반 키워드
                        keyword_construction: "", // 구문 키워드
                        keyword_adjacency: "", // 인접 키워드
                        keyword_except: "", // 제외 키워드
                        color: "", // 컬러
                        rule: "", // 키워드 조합 룰
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
                    },
                    keyword_2: {
                        name: "", // 이름
                        keyword_normal: "", // 일반 키워드
                        keyword_construction: "", // 구문 키워드
                        keyword_adjacency: "", // 인접 키워드
                        keyword_except: "", // 제외 키워드
                        color: "", // 컬러
                        rule: "", // 키워드 조합 룰
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
                    },
                    keyword_3: {
                        name: "", // 이름
                        keyword_normal: "", // 일반 키워드
                        keyword_construction: "", // 구문 키워드
                        keyword_adjacency: "", // 인접 키워드
                        keyword_except: "", // 제외 키워드
                        color: "", // 컬러
                        rule: "", // 키워드 조합 룰
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
                    },
                }
            }
        }
    }
</script>

        ' />
                                                </div>
                                            </div>

                                            <div class="ui_row">
                                                <div class="wrap is-cols-pad">
                                                    <div class="ui_col"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
import compAdvTopsearchs from './TopSearchs.vue';
export default {
    name: 'comp-adv',
    components: { compAdvTopsearchs },
    data() {
        return {
            topSearchInputDatas: {
                s_date: {
                    date: new Date(2022, 8, 12, 0, 0, 0).dateToStr(),
                },
                e_date: {
                    date: new Date(2022, 8, 20, 0, 0, 0).dateToStr(),
                },
                ps_date: {
                    date: new Date(2022, 8, 1, 0, 0, 0).dateToStr(),
                },
                pe_date: {
                    date: new Date(2022, 8, 9, 0, 0, 0).dateToStr(),
                },
                min_date: '2021-01-01',
                max_date: new Date().dateToStr(),
                p_min_date: '2021-01-01',
                p_max_date: new Date().dateToStr(),
            },
            topSearchDatas: {},
        };
    },
    computed: {
        getDateGrp() {
            var date = new Date();
            return [0, 7, date.getMonth() - 1 + 'M', date.getMonth() + 'M', date.getMonth() + 1 + 'M'];
        },
    },
    watch: {
        topSearchDatas(e) {
            // console.log(e);
        },
    },
};
</script>

<style></style>
