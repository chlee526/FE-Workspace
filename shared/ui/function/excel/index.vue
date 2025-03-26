<template>
    <div id="excels">
        <!-- 
        2024-12-06
        기획팀에서 카운트 제거 요청
        신규 다운로드 건이 있을때만 표기 되도록 수정
        <transition name="fade_posy">
            <span class="badge" :class="blink ? 'blink' : ''" v-if="downList.length > 0">{{ downList.length }}</span>
        </transition> -->

        <span class="badge" :class="[{ 'is-loading': getLoading }, { 'is-blink': blink }]"></span>

        <div class="input" :class="{ 'is-blink': blink }" title="엑셀 다운로드 목록">
            <input id="excel_input" class="excel_open" type="checkbox" v-model="show" />
            <label for="excel_input" class="excel_open"><span class="icon-excel"></span>{{ getUseageLNB ? '엑셀 다운로드 목록' : '' }}</label>
        </div>
        <transition name="fade_posy">
            <div class="list" v-show="show" v-click-outside="evt_docClick">
                <div class="header">
                    <h3>데이터 목록 다운로드</h3>
                    <button class="close_btn icon-close" @click="evt_close"></button>
                </div>
                <div class="all-delete"><comp-button class="is-small" @click="evt_all_remove">전체 삭제</comp-button></div>
                <div class="content" ref="content">
                    <div class="list_header">
                        <div class="path ui_al">다운로드 위치</div>
                        <div class="date">요청일시</div>
                        <div class="result">상태</div>
                        <div class="delete">삭제</div>
                    </div>
                    <ul class="excel_list" v-if="downList.length > 0">
                        <comp-excel-item v-for="$item in downList" v-bind:key="$item.key" :excelItem="$item" @update="updateStatus" @deleteExcel="deleteItem"></comp-excel-item>
                    </ul>
                    <div class="empty" v-else><p class="ui_no_data_txt">다운로드 항목이 없습니다</p></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { API_excels, API_delExcels } from '@shared/api/excels';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
import EventBus from '@shared/utils/eventBus';

import compExcelItem from './ExcelItem.vue';

export default {
    name: 'comp-excel',
    components: { compExcelItem },
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: {},
            downList: [],
            // downList: [
            //     { key: '1', file_name: 'path1', file_check: 'Y', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
            //     { key: '2', file_name: 'path1', file_check: 'N', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
            //     { key: '3', file_name: 'path1', file_check: 'F', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
            //     { key: '3', file_name: 'path1', file_check: 'E', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
            // ],
            show: false,
            blink: false,
        };
    },

    computed: {
        ...mapGetters(['getUser', 'getUseageLNB']),
        setBlink() {
            let result = '';
            if (this.incompleteItem.length <= 0) return;
            this.downList.forEach((item) => {
                if (item.result === 'N') {
                    if (item.result === 'Y') result = 'blink';
                }
            });
            return result;
        },
        getLoading() {
            return this.downList.some((item) => item.file_check === 'N');
        },
    },

    watch: {
        show: {
            handler(val) {
                if (val) this.blink = false;
            },
        },
    },

    created: function () {
        EventBus.$on('EXCEL_LIST', this.getExcelStatus);
    },
    mounted() {
        this.getDataList();
    },

    beforeDestroy() {
        EventBus.$off('EXCEL_LIST');
    },

    methods: {
        evt_docClick() {
            const content = this.$refs.content;
            this.show = false;
            content.scrollTo(0, 0);
        },

        evt_close() {
            const content = this.$refs.content;
            this.show = false;
            content.scrollTo(0, 0);
        },

        // 엑셀다운로드 목록 호출
        async getDataList() {
            await API_excels(this.apiUID)
                .then((res) => {
                    // 임시 데이터
                    // res.data = {
                    //     list: [
                    //         { key: '1', file_name: '파일명1', file_check: 'Y', menu_path: '메뉴1 > 섹션 1 > 컨텐츠 2', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
                    //         { key: '2', file_name: '파일명2', file_check: 'N', menu_path: '메뉴1 > 섹션 1 > 컨텐츠 2', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
                    //         { key: '3', file_name: '파일명3', file_check: 'F', menu_path: '메뉴1 > 섹션 1 > 컨텐츠 2', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
                    //         { key: '4', file_name: '파일명4', file_check: 'E', menu_path: '메뉴1 > 섹션 1 > 컨텐츠 2', date: '2022-12-16 13:55:45', file_url: '/tmp/tmp_excel.xlsx' },
                    //     ],
                    // };
                    if (res.data.list.length > 0) this.downList = [...res.data.list];
                })
                .catch((err) => {
                    console.log(err);
                    this.$store.dispatch('DIALOG_ERR', ['엑셀 다운로드 목록을 가져오지 못했습니다.<br>문제가 지속 될 경우 관리자에게 문의하세요.', '로드 실패', 0]);
                });
        },

        // 엑셀 진행상태
        async getExcelStatus(excelKey) {
            if (excelKey) {
                // key 값이 들어오면 엑셀 다운목록 api 호출
                const params = { key: parseInt(excelKey) };

                await API_excels(this.apiUID, params)
                    .then((res) => {
                        if (res.data.list.length > 0) this.downList.push(res.data.list[0]);
                    })
                    .catch((err) => {
                        console.log('*********************************************************');
                        console.log(err);
                    });
            }
        },

        // 다운로드 파일 삭제
        async deleteItem(val) {
            const params = { key: parseInt(val) };

            await API_delExcels(this.apiUID, params)
                .then((res) => {
                    if (res.status === 200) {
                        let updated = this.downList.filter((item) => item.key !== val);
                        this.downList = updated;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    this.$store.dispatch('DIALOG_ERR', ['삭제 하지 못했습니다.<br>문제가 지속 될 경우 관리자에게 문의하세요.', '삭제 실패', 0]);
                });
        },

        // 다운로드 파일 전체 삭제
        async evt_all_remove() {
            if (!this.downList.length) return;
            const promises = this.downList.map(async (item, idx) => {
                let params = { key: parseInt(item.key) };

                return await API_delExcels(this.apiUID + '_' + idx, params)
                    .then((res) => {
                        return res;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });

            let successList = [];
            let failList = [];
            await Promise.allSettled(promises)
                .then((res) => {
                    res.forEach((item) => {
                        if (item.status === 'fulfilled' && item.value.status === 200) successList.push(item);
                        if (item.status !== 'fulfilled' || !item.value) failList.push(item);
                    });
                })
                .finally(() => {
                    if (failList.length > 0) {
                        this.$store.dispatch('DIALOG_ERR', ['전체 삭제 하지 못했습니다.<br>문제가 지속 될 경우 관리자에게 문의하세요.', '삭제 실패', 0]);
                    } else {
                        this.downList = [];
                    }
                });
        },

        // 진행결과 업데이트
        updateStatus(val) {
            const updated = JSON.parse(JSON.stringify(this.downList));
            updated.forEach((item) => {
                if (parseInt(item.key) === parseInt(val.key)) {
                    if (item.file_check === 'N' && val.file_check === 'Y') {
                        if (!this.show) {
                            this.blink = true; // 다운로드 가능 상태가 되면 깜박임 처리
                        }
                        // this.$store.dispatch('NOTY_COM', `[${item.menu_path}] 엑셀 다운로드가 완료되었습니다.`);
                    }
                    item.file_check = val.file_check;
                }
            });
            this.downList = updated;
        },
    },
};
</script>

<style></style>
