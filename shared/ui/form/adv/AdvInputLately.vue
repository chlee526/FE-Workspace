<template>
    <div class="lately_list ui-loader-container" :class="{ 'is-loading': loading }">
        <ul v-if="list.some((val) => val.favorites)" class="favorites">
            <template v-for="(item, idx) in list">
                <li v-if="item.favorites" v-bind:key="'favorite_' + idx" style="display: flex; align-items: center; width: 100%">
                    <comp-favorites :id="'bookMark_' + idx" v-model="item.favorites" @input="evt_toggleFavorites(item)" title="즐겨찾기" tabIndex="-1"></comp-favorites>
                    <button type="button" tabindex="-1" @click="evt_itemClick(item)" :title="item.advChk ? item.ruleText : ''" :style="item.advChk ? 'paddingLeft: 30px;overflow: hidden;' : 'paddingLeft: 3px;overflow: hidden;'">
                        <span v-if="item.advChk" class="as">AS</span>
                        <span class="txt">
                            {{ item.name }}
                            <span v-if="item.advChk" style="color: #cccccc">({{ item.ruleText }})</span>
                        </span>
                    </button>
                </li>
            </template>
            <div class="favorites_divider"></div>
        </ul>
        <ul>
            <template v-for="($item, $idx) in list">
                <li v-if="!$item.favorites" v-bind:key="$idx" style="display: flex; align-items: center; width: 100%" :style="$item.favorites && 'background: #ECECEC'">
                    <comp-favorites :id="'bookMark_' + $idx" v-model="$item.favorites" @input="evt_toggleFavorites($item)" :disabled="favoritesChk" :title="!favoritesChk ? '즐겨찾기' : '5개 이상 즐겨찾기 할 수 없습니다'" tabIndex="-1"></comp-favorites>
                    <button type="button" tabindex="-1" @click="evt_itemClick($item)" :title="$item.advChk ? $item.ruleText : ''" :style="$item.advChk ? 'paddingLeft: 30px;overflow: hidden;' : 'paddingLeft: 3px;overflow: hidden;'">
                        <span v-if="$item.advChk" class="as">AS</span>
                        <span class="txt">
                            {{ $item.name }}
                            <span v-if="$item.advChk" style="color: #cccccc">({{ $item.ruleText }})</span>
                        </span>
                    </button>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { API_lately } from '@shared/api/template/adv/lately';
import { API_addFavorites, API_delFavorites } from '@shared/api/template/adv/favorites';
import { combinationRule } from '@shared/utils/prototype/util.object';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
export default {
    name: 'comp-adv-input-lately',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            apiParams: null, // API 파라미터
            isFirst: true, // 첫로딩 확인용
            loading: false, // 로딩
            tmpList: [],
            list: [],
            favoritesChk: false,
        };
    },
    props: {
        value: {},
    },
    computed: {
        ...mapGetters(['getUser']),
        getList() {
            let result = JSON.parse(JSON.stringify(this.tmpList));

            result.forEach(($item) => {
                $item.keyword_normal = $item.keyword_normal.replace(/\\n/g, '\n');
                $item.keyword_adjacency = $item.keyword_adjacency.replace(/\\n/g, '\n');
                $item.keyword_construction = $item.keyword_construction.replace(/\\n/g, '\n');
                $item.keyword_except = $item.keyword_except.replace(/\\n/g, '\n');

                let chk = ($item.keyword_normal.length && $item.keyword_normal.split('\n').filter((val) => val.length).length > 1) || ($item.keyword_normal.length && $item.keyword_normal.split(' ').filter((val2) => val2.length).length > 1) || $item.keyword_construction.length || $item.keyword_adjacency.length || $item.keyword_except.length;

                $item.advChk = chk === true || chk !== 0 ? true : false;
                $item.rule = combinationRule($item);
                $item.ruleText = $item.rule.replace(/[\\n\\"']/g, '');
            });

            return result;
        },
        getFavoritesList() {
            return this.list.filter((item) => item.favorites);
        },
    },
    mounted() {
        this.fetchData();
    },
    watch: {},
    methods: {
        async fetchData() {
            this.loading = true;
            this.apiParams = {
                user_id: this.getUser.id,
            };

            /**
             * API 임시 대체
             */
            await API_lately(this.apiUID, this.apiParams)
                .then((res) => {
                    /**
                     * 임시 데이터
                     */
                    res.data = [
                        { favorites: true, json_data: '{"keyword_construction":"","code":"GS리테일_2","color":"#FDA535","pe_date":{"date":"2023-03-29"},"rule":"((\\\\\\"GS리테일\\\\\\") OR (\\\\\\"GS\\\\\\" AND \\\\\\"리테일\\\\ngs\\\\n기업\\\\\\"))","date_disabled":true,"ps_date":{"date":"2023-03-23"},"keyword_except":"","e_date":{"date":"2023-04-05"},"keyword_adjacency":"","keyword_normal":"GS리테일\\\\nGS 리테일\\\\ngs\\\\n기업","name":"GS리테일","s_date":{"date":"2023-03-30"},"seq":2}', seq: '844' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"흑토끼_2","color":"#FDA535","pe_date":{"date":"2023-01-07"},"rule":"((\\\\\\"흑토끼\\\\\\")) OR ((\\\\\\"GS리테일\\\\\\"~15) OR (\\\\\\"GS 리테일\\\\\\"~15) OR (\\\\\\"gs\\\\\\"~15) OR (\\\\\\"기업\\\\\\"~15))","range":"90","date_disabled":true,"ps_date":{"date":"2022-11-30"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"GS리테일\\\\nGS 리테일\\\\ngs\\\\n기업","keyword_normal":"흑토끼","name":"흑토끼","s_date":{"date":"2023-01-08"},"seq":2}', seq: '870' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"토오오끼_1","color":"#0091FF","pe_date":{"date":"2023-01-07"},"rule":"((\\\\\\"토옥끼\\\\\\"))","range":"90","date_disabled":true,"ps_date":{"date":"2022-11-30"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"","keyword_normal":"토옥끼","name":"토오오끼","s_date":{"date":"2023-01-08"},"seq":1}', seq: '869' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"흑토끼_2","color":"#FDA535","pe_date":{"date":"2023-03-07"},"rule":"((\\\\\\"흑토끼\\\\\\")) OR ((\\\\\\"GS리테일\\\\\\"~15) OR (\\\\\\"GS 리테일\\\\ngs\\\\n기업\\\\\\"~15))","range":"90","date_disabled":true,"ps_date":{"date":"2023-02-06"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"GS리테일\\\\nGS 리테일\\\\ngs\\\\n기업","keyword_normal":"흑토끼","name":"흑토끼","s_date":{"date":"2023-03-08"},"seq":2}', seq: '868' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"토오끼_1","color":"#0091FF","pe_date":{"date":"2023-03-07"},"rule":"((\\\\\\"토오끼\\\\\\"))","range":"90","date_disabled":true,"ps_date":{"date":"2023-02-06"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"","keyword_normal":"토오끼","name":"토오끼","s_date":{"date":"2023-03-08"},"seq":1}', seq: '867' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"미뉴트빠삐용_1","color":"#0091FF","pe_date":{"date":"2023-03-30"},"rule":"((\\\\\\"미뉴트빠삐용\\\\\\"))","range":"2","date_disabled":false,"ps_date":{"date":"2023-03-28"},"keyword_except":"","e_date":{"date":"2023-04-02"},"keyword_adjacency":"","keyword_normal":"미뉴트빠삐용","name":"미뉴트빠삐용","s_date":{"date":"2023-03-31"},"seq":1}', seq: '862' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"테스트_1","color":"#0091FF","pe_date":{"date":"2023-03-07"},"rule":"((\\\\\\"테스트\\\\\\"))","range":"90","date_disabled":true,"ps_date":{"date":"2023-02-06"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"","keyword_normal":"테스트","name":"테스트","s_date":{"date":"2023-03-08"},"seq":1}', seq: '864' },
                        { favorites: false, json_data: '{"keyword_construction":"","code":"테스트_1","color":"#0091FF","pe_date":{"date":"2023-03-07"},"rule":"((\\\\\\"테스트\\\\\\"))","range":"90","date_disabled":true,"ps_date":{"date":"2023-02-06"},"keyword_except":"","e_date":{"date":"2023-04-06"},"keyword_adjacency":"","keyword_normal":"테스트","name":"테스트","s_date":{"date":"2023-03-08"},"seq":1}', seq: '864' },
                    ];
                    // 임시데이터

                    // 데이터 변환
                    res.data.forEach((item) => {
                        let data = JSON.parse(item.json_data);
                        item.name = data.name;
                        item.keyword_normal = data.keyword_normal;
                        item.keyword_construction = data.keyword_construction;
                        item.keyword_adjacency = data.keyword_adjacency;
                        item.keyword_except = data.keyword_except;
                        item.rule = data.rule;

                        delete data.advChk;
                        delete data.favorites;
                        delete data.json_data;
                    });

                    this.tmpList = res.data;
                    this.list = this.getList;
                    this.favoritesChk = this.getFavoritesList.length >= 5;
                })
                .catch((err) => {
                    console.log(err);
                });

            this.loading = false;
        },

        evt_itemClick(val) {
            this.$emit('selected', val);
        },

        // 최근검색어 고정/해제
        async evt_toggleFavorites(item) {
            const params = {};
            params.user_id = this.getUser.id;
            params.seq = item.seq;

            // 즐겨찾기 최대 5개
            this.favoritesChk = this.getFavoritesList.length >= 5;

            if (item.favorites) {
                await API_addFavorites(this.apiUID, params)
                    .then((res) => {
                        if (!res.data.result) {
                            this.$store.dispatch('NOTY_ERR', '즐겨찾기 추가에 실패했습니다. 목록을 다시 로드합니다.');
                            this.fetchData();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                await API_delFavorites(this.apiUID, params)
                    .then((res) => {
                        if (!res.data.result) {
                            this.$store.dispatch('NOTY_ERR', '즐겨찾기 삭제에 실패했습니다. 목록을 다시 로드합니다.');
                            this.fetchData();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
