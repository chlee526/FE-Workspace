<template>
    <li class="excel_item">
        <div class="path ui_al" :class="[{ dims: excelItem.file_check === 'E' || excelItem.file_check === 'F' }]">{{ excelItem.menu_path }}</div>
        <div class="date" :class="[{ dims: excelItem.file_check === 'E' || excelItem.file_check === 'F' }]">{{ excelItem.date.dateToStr('-', 'YYYY-MM-DD hh:mm:ss') }}</div>
        <div class="result" :class="[{ dims: excelItem.file_check === 'E' }]">
            <div v-if="excelItem.file_check == 'N'" class="loader"></div>
            <span v-else-if="excelItem.file_check == 'F'" class="fail" title="실패">실패</span>
            <span v-else-if="excelItem.file_check == 'E'" title="만료">만료</span>
            <a v-else-if="excelItem.file_check == 'Y'" class="icon-excel" href="#" @click.prevent="downloadExcel" title="다운로드"></a>
        </div>
        <button class="delete icon-delete" :disabled="excelItem.file_check == 'N'" @click="deleteItem" title="삭제"></button>
    </li>
</template>

<script>
import { API_excels } from '@shared/api/excels';
import { uuid } from 'vue-uuid';
import { mapGetters } from 'vuex';
export default {
    name: 'comp-excel-item',
    data() {
        return {
            apiUID: uuid.v4(),
            timeOutCheck: null,
        };
    },
    props: { excelItem: { type: Object, default: null } },

    computed: {
        ...mapGetters(['getUser']),
    },

    beforeDestroy() {
        clearTimeout(this.timeOutCheck);
        this.timeOutCheck = null;
    },
    methods: {
        // result='N' 인 아이템 5초마다 API 통신
        async getItemResult() {
            if (this.excelItem.file_check === 'Y' || this.excelItem.file_check === 'F') return;
            const prams = { key: parseInt(this.excelItem.key) };

            await API_excels(this.apiUID, prams)
                .then((res) => {
                    if (res.data.list.length === 0) return;
                    this.$emit('update', res.data.list[0]);
                })
                .catch((err) => {
                    console.log('*********************************************************');
                    console.log(err);
                });

            this.timeOutCheck = setTimeout(() => {
                this.getItemResult();
            }, 5000);
        },

        // 파일 삭제
        deleteItem() {
            this.$emit('deleteExcel', this.excelItem.key);
        },

        /** 엑셀 파일명 설정을 위해, blob으로 변환후 다운로드 실행  */
        async downloadExcel() {
            try {
                const response = await fetch(this.excelItem.file_url);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = this.excelItem.file_name;
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);

                // this.deleteItem();
            } catch (error) {
                console.error('Download failed:', error);
            }
        },
    },

    mounted() {
        this.timeOutCheck = setTimeout(() => {
            this.getItemResult();
        }, 5000);
    },
};
</script>

<style lang="scss" scoped></style>
