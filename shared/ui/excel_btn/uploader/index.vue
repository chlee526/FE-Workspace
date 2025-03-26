<template>
    <div class="excel_uploader">
        <input type="file" ref="excelInput" accept=".xlsx" @click="resetInput" @change="handleFileUpload" hidden />
        <button class="ui_btn" :class="this.$vnode.data.staticClass" :style="getStyle" :disabled="disabled" @click="$refs.excelInput.click()">
            <slot></slot>
            <span>엑셀 업로드</span>
        </button>
    </div>
</template>

<script>
import { read as XLSX_read, utils as XLSX_utils } from 'xlsx';

export default {
    name: 'comp-excel-uploader',
    data() {
        return {
            // 엑셀 데이터
            excelData: [],
        };
    },
    props: {
        disabled: { type: Boolean, default: false },
        customColor: { type: String, default: null },
        title: { type: String },
        columns: {
            type: Array,
            required: true,
            default: () => [
                // =======예시=======
                // {
                //     key: 'date',
                //     name: '날짜',
                //     width: '250px',
                //     validation: function (item) {
                //         const value = item['date'];
                //         // 기본 형식 YYYY-MM-DD hh:mm:ss
                //         const datePattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
                //         if (!datePattern.test(value)) {
                //             return false;
                //         }
                //         // 날짜 유효성 검사
                //         const [datePart, timePart] = value.split(' ');
                //         const [year, month, day] = datePart.split('-').map(Number);
                //         const [hours, minutes, seconds] = timePart.split(':').map(Number);
                //         // 시간 유효성 검사
                //         if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
                //             return false;
                //         }
                //         // Date 객체로 변환하여 유효한 날짜인지 확인
                //         const date = new Date(year, month - 1, day);
                //         if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                //             return false;
                //         }
                //         // 입력값 검증
                //         return true;
                //     },
                //     changeEvent: function (value) {
                //         const date = value.replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*$/, '$1');
                //         return {
                //             date,
                //         };
                //     },
                // },
                // {
                //     key: 'content',
                //     name: '내용',
                //     inputType: 'textarea',
                //     align: 'left',
                //     isApplyMultiline: true,
                //     validation: function (item) {
                //         const value = item['content'];
                //         return value.length > 0 ? true : false;
                //     },
                //     changeEvent: function (value) {
                //         // 특수문자 제거
                //         const content = value.replace(/[|%\\^*[\](){}‘’<>"=+./:=?_`´~§±·]/g, '');
                //         return {
                //             content,
                //         };
                //     },
                // },
                // {
                //     key: 'senti',
                //     name: '성향',
                //     inputType: 'selectbox',
                //     options: [
                //         { code: 1, name: '중립' },
                //         { code: 2, name: '긍정' },
                //         { code: 3, name: '부정' },
                //     ],
                //     parse: function (value) {
                //         const senti = [
                //             { code: 1, name: '중립' },
                //             { code: 2, name: '긍정' },
                //             { code: 3, name: '부정' },
                //         ].find(({ name }) => name === value.trim().toLowerCase())?.code;
                //         return { senti };
                //     },
                // },
                // {
                //     key: 'brand',
                //     name: '브랜드',
                //     inputType: 'selectbox',
                //     options: [
                //         { code: '1', name: '테라', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //         { code: '2', name: '하이트', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //         { code: '3', name: '맥스', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //         { code: '4', name: '필라이트', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //         { code: '99', name: '기타', company: '99', category: '99', mainBrand: '0', alcoholtype: '99' },
                //     ],
                //     parse: function (value) {
                //         const brand = [
                //             { code: '1', name: '테라', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '2', name: '하이트', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '3', name: '맥스', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '4', name: '필라이트', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '99', name: '기타', company: '99', category: '99', mainBrand: '0', alcoholtype: '99' },
                //         ].find(({ name }) => {
                //             return name.replace(/\s+/g, '') === value.replace(/\s+/g, '');
                //         });
                //         return {
                //             brand: brand?.code,
                //             alcoholtype: brand?.alcoholtype,
                //             category: brand?.category,
                //         };
                //     },
                //     validation: function (item) {
                //         const brand = [
                //             { code: '1', name: '테라', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '2', name: '하이트', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '3', name: '맥스', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '4', name: '필라이트', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '99', name: '기타', company: '99', category: '99', mainBrand: '0', alcoholtype: '99' },
                //         ].find(({ code }) => code == item.brand);
                //         if (brand) {
                //             return item.alcoholtype === brand.alcoholtype && item.category === brand.category;
                //         }
                //         return false;
                //     },
                //     changeEvent: function (value) {
                //         const brand = [
                //             { code: '1', name: '테라', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '2', name: '하이트', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                //             { code: '3', name: '맥스', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '4', name: '필라이트', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                //             { code: '99', name: '기타', company: '99', category: '99', mainBrand: '0', alcoholtype: '99' },
                //         ].find(({ code }) => {
                //             return code === value;
                //         });
                //         return {
                //             brand: brand?.code,
                //             alcoholtype: brand?.alcoholtype,
                //             category: brand?.category,
                //         };
                //     },
                // },
            ],
        },
        saveDatas: {
            type: Function,
            required: true,
        },
        lengthLimit: { type: Number, default: 2000 },
    },
    computed: {
        getStyle() {
            let style = this.$vnode.data.style || this.$vnode.data.staticStyle || this.$vnode.data.normalizedStyle || '';

            if (style) style += ';';

            if (this.customColor) {
                // default;
                style += `border-color: rgba(${this.customColor.hexToRgb()}, 0.4);`;
                style += `color: ${this.customColor};`;

                // Over;
                if (this.isOver) {
                    style += `background-color: rgba(${this.customColor.hexToRgb()}, 0.1);`;
                }

                // Active
                if (this.$vnode.data.staticClass && this.$vnode.data.staticClass.indexOf('is-active') >= 0) {
                    style += `border-color: rgba(${this.customColor.hexToRgb()}, 1);`;
                    style += `background-color: rgba(${this.customColor.hexToRgb()}, 1);`;
                }
            }

            return style;
        },

        getColumnMapping() {
            const result = {};

            this.columns.forEach(({ key, name }) => {
                result[name] = key;
            });

            return result;
        },
    },
    methods: {
        async handleFileUpload() {
            this.$emit('isLoading', true);

            const input = this.$refs.excelInput;

            try {
                if (!input.files || !input.files[0]) {
                    throw new Error(`파일이 선택되지 않았습니다.`);
                }

                const file = input.files[0];

                // 엑셀 파일 확장자 검사 (xlsx 또는 xls)
                const validExtensions = ['.xlsx', '.xls'];
                const fileExtension = file.name.slice(file.name.lastIndexOf('.'));

                if (!validExtensions.includes(fileExtension)) {
                    throw new Error(`엑셀파일(확장자 '.xlsx', '.xls')이 아닙니다.`);
                }

                // 파일 읽기
                const fileContent = await this.readFileAsArrayBuffer(file);

                // 엑셀 파일 처리
                this.processExcelFile(fileContent);
            } catch (error) {
                // 에러 처리
                this.$store.dispatch('DIALOG_ERR', [error, '새글 등록 실패', 0]);
                console.error('파일을 읽는 중 오류 발생:', error);
            } finally {
                // 로딩 완료
                this.$emit('isLoading', false);
            }
        },

        /**
         * FileReader를 사용하여 파일을 ArrayBuffer로 읽기
         */
        readFileAsArrayBuffer(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                // ArrayBuffer 데이터 반환
                reader.onload = (e) => resolve(e.target.result);

                reader.onerror = (e) => reject(new Error(`파일을 읽는 중 오류 발생\n ${e}`));

                // ArrayBuffer로 읽기
                reader.readAsArrayBuffer(file);
            });
        },

        /**
         * 엑셀 파일을 JSON으로 변환하여 배열에 저장
         */
        processExcelFile(fileContent) {
            const workbook = XLSX_read(new Uint8Array(fileContent), {
                type: 'array',
                cellDates: true, // 날짜 셀을 Date 객체로 파싱
                dateNF: 'YYYY-MM-DD hh:mm:ss', // 날짜 형식 지정
            });

            this.excelData = workbook.SheetNames.map((sheetName) => {
                const jsonData = XLSX_utils.sheet_to_json(workbook.Sheets[sheetName], {
                    raw: false, // 원시 값 대신 형식화된 값 사용
                    dateNF: 'YYYY-MM-DD hh:mm:ss', // 날짜 형식 지정
                });

                return jsonData.map((row) => {
                    const obj = {};
                    for (const key in row) {
                        const column = this.getColumnMapping[key.toLowerCase()] || key;
                        if (column === 'date') {
                            // 날짜 처리
                            const dateValue = row[key];
                            obj[column] = new Date(dateValue).dateToStr('-', 'YYYY-MM-DD hh:mm:ss');
                        } else {
                            obj[column] = row[key];
                        }
                    }
                    return obj;
                });
            }).flat();

            if (this.excelData.length > this.lengthLimit) {
                throw new Error(`데이터는 ${this.lengthLimit.addComma()}개 이하만 등록할 수 있습니다.`);
            }

            this.openPopup();
        },

        resetInput(event) {
            event.currentTarget.value = '';
        },

        openPopup() {
            const searchParams = {
                columns: this.columns,
                datas: this.excelData,
                title: this.title,
            };
            const props = {
                saveDatas: this.saveDatas,
            };
            this.$store.dispatch('MODAL_OPEN', ['excel-uploader', searchParams, props]);
        },
    },
};
</script>

<style></style>
