<template>
    <div>
        <comp-button class="ui_btn is-icon-only" title="Excel 다운로드" @click="evt_click" :loading="loading ? loading : excelLoading">
            <span class="icon">&#xe005;</span>
        </comp-button>
        <a ref="excelDown" download style="display: none"></a>
    </div>
</template>

<script>
import { API_excel } from '@shared/api/excels';
import { uuid } from 'vue-uuid';

export default {
    name: 'comp-excel-btn',
    data() {
        return {
            apiUID: uuid.v4(),
            apiParams: null,
            excelLoading: false,
        };
    },
    props: {
        excelParams: { type: Object, default: null },
        loading: { type: Boolean, default: false },
    },
    methods: {
        async evt_click() {
            if (!this.excelParams) return;
            this.excelLoading = true;
            this.apiParams = {
                ...JSON.parse(JSON.stringify(this.excelParams)),
            };
            this.$store.dispatch('NOTY_INFO', '엑셀 다운로드를 시작합니다.');
            await API_excel(this.apiUID, this.apiParams)
                .then((res) => {
                    if (res.data.result.link) {
                        // 엑셀 다운
                        let a = this.$refs.excelDown;
                        a.href = res.data.result.link;
                        a.click();
                        this.$store.dispatch('NOTY_COM', '엑셀 다운로드가 완료되었습니다.');
                    } else if (res.data.result.key) {
                        // 엑셀 데이터 목록 호출
                        this.$store.dispatch('EXCEL_LIST', res);
                        // this.$store.dispatch('NOTY_COM', '엑셀 다운로드목록에 추가되었습니다.');
                    }
                })
                .catch((err) => {
                    this.$store.dispatch('NOTY_ERR', '엑셀 다운로드에 실패하였습니다.');
                    console.log('*********************************************************');
                    console.log(err);
                })
                .finally(() => {
                    this.excelLoading = false;
                });
        },
    },
};
</script>

<style></style>
