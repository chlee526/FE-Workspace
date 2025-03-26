<template>
    <div class="searchPage">
        <h2>무엇을 도와드릴까요?</h2>
        <div class="search">
            <!-- <comp-input-box id="brd_searchKeyword" v-model="brdOpts.input_search_keyword" type="search" placeholder="이름, 아이디, 연락처, 이메일 검색" focusResetVisible @search="searchKeyword" /> -->
            <comp-input-box id="helper_searchKeyword" class="is-wid100p" v-model="searchInput.keyword" type="search" placeholder="키워드를 입력하세요" @search="evtSearch" focusResetVisible />
        </div>
        <div v-if="isSearch" class="result">
            <template v-if="getFilterData">
                <CompItem v-for="item in getFilterData" :key="item.seq" :helpData="item" :keyword="searchData.keyword.trim()" />
            </template>
            <div v-else class="noData">
                <strong>"{{ searchData.keyword }}"</strong> 에 대한 검색 결과가 없습니다.
            </div>
        </div>
    </div>
</template>

<script>
import CompItem from './searchItem.vue';

export default {
    name: 'comp-helper-search',
    data() {
        return {
            isSearch: false,
            searchInput: {
                keyword: '',
            },
            searchData: {
                keyword: '',
            },
            brdDatas: {
                contnent: null,
                modifier: null,
                modi_date: null,
            },
        };
    },
    props: {
        helperData: { type: Array },
    },
    components: {
        CompItem,
    },
    computed: {
        /**
         * 필터링 데이터
         * 1. 키워드 매칭 되는 데이터
         * 2. 매칭된 데이터의 content 글자 수 제한
         */
        getFilterData() {
            const keyword = this.searchData.keyword.trim().length ? this.searchData.keyword.trim().toLowerCase() : null;

            const filteredItems = (item) => {
                if (!keyword) return null;

                const matchesKeyword = (text) => text && text.toLowerCase().includes(keyword);

                let newItem = { ...item };

                let isMatch = matchesKeyword(item.subject) || matchesKeyword(item.content);

                // 내용 자르기 함수
                const truncateContent = (content) => {
                    if (content && content.length > 200) {
                        return content.slice(0, 200) + '...';
                    }
                    return content;
                };

                if (item.content) {
                    if (isMatch) {
                        const lowerContent = item.content.toLowerCase();
                        const keywordIndex = lowerContent.indexOf(keyword);
                        if (keywordIndex !== -1) {
                            const start = Math.max(0, keywordIndex - 20);
                            const end = Math.min(item.content.length, keywordIndex + keyword.length + 200);
                            newItem.content = item.content.slice(start, end);
                            if (start > 0) newItem.content = '...' + newItem.content;
                            if (end < item.content.length) newItem.content += '...';
                        }
                    } else {
                        newItem.content = truncateContent(item.content);
                    }
                }

                if (item.children && item.children.length > 0) {
                    const matchedChildren = item.children.map(filteredItems).filter(Boolean);
                    if (matchedChildren.length > 0) {
                        newItem.children = matchedChildren.map((child) => ({
                            ...child,
                            content: truncateContent(child.content),
                        }));
                        isMatch = true;
                    }
                }

                return isMatch ? newItem : null;
            };

            const result = this.helperData.map(filteredItems).filter(Boolean);
            return result.length ? result : null;
        },
    },
    mounted() {
        this.evtSearch();
    },
    methods: {
        // 이벤트 - 검색
        evtSearch() {
            this.isSearch = !!this.searchInput.keyword.length;
            this.searchData = structuredClone(this.searchInput);
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
