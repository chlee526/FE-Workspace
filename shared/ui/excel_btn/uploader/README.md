# UI - excel_btn - Uploader

-   엑셀 업로드 버튼
-   엑셀 파일 첨부시 오류 수정 가능한 모달 열림

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [ColumnConfig ](#columnconfig)
6. [Events](#events)

---

### History

| 일자       | 버전  | 내용                           |
| ---------- | ----- | ------------------------------ |
| 2024-12-10 | 1.0.0 | 엑셀 업로드 버튼 컴포넌트 개발 |

---

#### File

| 파일명           | 타입     | 설명                       |
| ---------------- | -------- | -------------------------- |
| index            | index    | 공유 컴포넌트 메인         |
| ExcelUploadModal | 컴포넌트 | 엑셀 데이터 확인/수정/저장 |

---

#### Useage

```vue
<template>
    <!-- 기본 엑셀 업로더 -->
    <comp-excel-uploader :columns="customColumns" :saveDatas="saveDatas" />

    <!-- 버튼 내용 변경 -->
    <comp-excel-uploader :columns="customColumns" :saveDatas="saveDatas">
        <span class="icon">&#xe017;</span>
    </comp-excel-uploader>

    <!-- 비활성화된 엑셀 업로더 -->
    <comp-excel-uploader :columns="customColumns" :saveDatas="saveDatas" :disabled="true" />

    <!-- 커스텀 색상 적용 -->
    <comp-excel-uploader :columns="customColumns" :saveDatas="saveDatas" :custom-color="'#FF0000'" />

    <!-- 전체 옵션 사용 -->
    <comp-excel-uploader :columns="customColumns" :saveDatas="saveDatas" :disabled="false" customColor="#007bff" :lengthLimit="3000" />
</template>

<script>
export default {
    data() {
        return {
            customColumns: [
                {
                    key: 'date',
                    name: '날짜',
                    width: '250px',
                    validation: function (item) {
                        const value = item['date'];

                        // 기본 형식 YYYY-MM-DD hh:mm:ss
                        const datePattern = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

                        if (!datePattern.test(value)) {
                            return false;
                        }

                        // 날짜 유효성 검사
                        const [datePart, timePart] = value.split(' ');
                        const [year, month, day] = datePart.split('-').map(Number);
                        const [hours, minutes, seconds] = timePart.split(':').map(Number);

                        // 시간 유효성 검사
                        if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
                            return false;
                        }

                        // Date 객체로 변환하여 유효한 날짜인지 확인
                        const date = new Date(year, month - 1, day);
                        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
                            return false;
                        }

                        // 입력값 검증
                        return true;
                    },
                    changeEvent: function (value) {
                        const date = value.replace(/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*$/, '$1');
                        return {
                            date,
                        };
                    },
                },
                {
                    key: 'content',
                    name: '내용',
                    inputType: 'textarea',
                    align: 'left',
                    isApplyMultiline: true,
                    validation: function (item) {
                        const value = item['content'];

                        return value.length > 0 ? true : false;
                    },
                    changeEvent: function (value) {
                        // 특수문자 제거
                        const content = value.replace(/[|%\\^*[\](){}‘’<>"=+./:=?_`´~§±·]/g, '');
                        return {
                            content,
                        };
                    },
                },
                {
                    key: 'senti',
                    name: '성향',
                    inputType: 'selectbox',
                    options: [
                        { code: 1, name: '중립' },
                        { code: 2, name: '긍정' },
                        { code: 3, name: '부정' },
                    ],

                    parse: function (value) {
                        const state = [
                            { code: 1, name: '중립' },
                            { code: 2, name: '긍정' },
                            { code: 3, name: '부정' },
                        ].find(({ name }) => name === value.trim().toLowerCase())?.code;

                        return { state };
                    },
                },
                {
                    key: 'brand',
                    name: '브랜드',
                    inputType: 'selectbox',
                    options: [...this.getBrandOptions],

                    parse: function (value) {
                        const brand = this.getBrandOptions.find(({ name, code }) => {
                            return name.replace(/\s+/g, '') === brandData.replace(/\s+/g, '');
                        });

                        return {
                            brand: brand?.code,
                            alcoholtype: brand?.alcoholtype,
                            category: brand?.category,
                        };
                    },
                    validation: function (item) {
                        const brand = this.getBrandOptions.find(({ code }) => code == item.brand);

                        if (brand) {
                            return item.alcoholtype === brand.alcoholtype && item.category === brand.category;
                        }

                        return false;
                    },
                    changeEvent: function (value) {
                        const brand = this.getBrandOptions.find(({ name, code }) => {
                            return code === brandData;
                        });

                        return {
                            brand: brand?.code,
                            alcoholtype: brand?.alcoholtype,
                            category: brand?.category,
                        };
                    },
                },
            ],
        };
    },
    computed: {
        getBrandOptions() {
            return [
                { code: '1', name: '테라', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                { code: '2', name: '하이트', company: '1', category: '1', mainBrand: '1', alcoholtype: '1' },
                { code: '3', name: '맥스', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                { code: '4', name: '필라이트', company: '1', category: '1', mainBrand: '0', alcoholtype: '1' },
                { code: '99', name: '기타', company: '99', category: '99', mainBrand: '0', alcoholtype: '99' },
            ];
        },
    },
    methods: {
        saveDatas(datas) {
            console.log('saveDatas >>>', datas);
            // API 작업 등...
            this.$store.dispatch('MODAL_CLOSE', 'excel-uploader');
        },
    },
};
</script>
```

---

#### Props

|        필수        | Prop            | 설명                          | 타입/값               | Default |
| :----------------: | :-------------- | :---------------------------- | --------------------- | ------- |
| :heavy_check_mark: | **columns**     | 엑셀 업로더 컬럼 설정         | `Array<ColumnConfig>` | `[]`    |
| :heavy_check_mark: | **saveDatas**   | 데이터 저장 콜백 함수         | `Function`            |         |
|                    | **title**       | 모달 헤더 타이틀 변경 시 설정 | `String`              |         |
|                    | **lengthLimit** | 엑셀 데이터 갯수 제한         | `Number`              | `2000`  |
|                    | **customColor** | 커스텀 색상 (Hex 코드)        | `Hex`                 | `null`  |
|                    | **class**       | 클래스 <br>`'is-small'`       | `String`              |         |
|                    | **disabled**    | 비활성화 여부                 | `Boolean`             | `false` |

---

#### ColumnConfig

|        필수        | key                  | 설명                                       | 타입/값                                                    | Default      |
| :----------------: | :------------------- | :----------------------------------------- | ---------------------------------------------------------- | ------------ |
| :heavy_check_mark: | **key**              | 컬럼의 고유 식별자 (예: 'date', 'content') | `String`                                                   |              |
| :heavy_check_mark: | **name**             | 데이터 저장 콜백 함수                      | `String`                                                   |              |
|                    | **inputType**        | 오류 수정시 입력 타입                      | `selectbox/textarea`                                       | `'inputbox'` |
|                    | **isApplyMultiline** | `<br>` 태그 등 줄바꿈 적용 여부            | `Boolean`                                                  | `false`      |
|                    | **width**            | 컬럼 너비                                  | `String`                                                   |              |
|                    | **align**            | 텍스트 정렬                                | `String`                                                   | `'center'`   |
|                    | **validation**       | 데이터 검증 함수                           | `Function`<br>`@param value`<br>`@returns Boolean`         |              |
|                    | **changeEvent**      | input Event발생 시 동작하는 함수           | `Function`<br>`@param value`<br>`@returns { key : value }` |              |
|                    | **options**          | inputType이 `selectbox`일 경우 필수        | `Array`                                                    |              |
|                    | **parse**            | 데이터 파싱 함수                           | `Function`<br>`@param value`<br>`@returns { key : value }` |              |

---
