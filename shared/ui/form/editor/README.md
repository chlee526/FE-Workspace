# UI - Form - Editor

-   에디터 컴포넌트
-   'vue-quill-editor', 'quill-html-edit-button', 'jodit' 라이브러리 사용

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Etcs](#etcs)
6. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                           |
| ---------- | ----- | -------------------------------------------------------------- |
| 2024-12-16 | 1.2.0 | jodit 에디터 타입 추가 (기존 GS 리테일에서 사용한 에디터 참고) |
| 2023-07-18 | 1.1.0 | 에디터 기본 폰트 목록 수정, 'addFonts' props 추가              |
| 2023-07-14 | 1.0.0 | 에디터 컴포넌트 개발                                           |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<template>
    <comp-editor id="아이디명" v-model="콘텐츠 내용(html)" :jodit="jodit type 사용 여부" :toolOpts="toolBox 스타일링" :contentsOpts="contents 스타일링" :add-fonts="추가할 폰트명" :placeholder="placeholder" style="인라인스타일(넓이 높이값 설정)"></comp-editor>
</template>

<!-- 폰트 추가시 ./style.scss 파일 내 폰트 설정 스타일 추가  -->
<style lang="scss">
/* ./style.scss */
.ql-snow {
    .ql-picker.ql-font {
        .ql-picker-label[data-value='Pretendard']::before,
        .ql-picker-item[data-value='Pretendard']::before {
            content: 'Pretendard';
            font-family: 'Pretendard Variable';
        }
        .ql-picker-label[data-value='맑은 고딕']::before,
        .ql-picker-item[data-value='맑은 고딕']::before {
            content: '맑은 고딕';
            font-family: '맑은 고딕';
        }
        /*
         * 추가 폰트 설정
         */
        // 여기에 추가
        // addFonts=['Courier'] 일 경우 예시
        .ql-picker-label[data-value='Courier']::before,
        .ql-picker-item[data-value='Courier']::before {
            content: 'Courier';
            font-family: 'Courier';
        }
        // =====================================================
    }

    .ql-font-Pretendard {
        font-family: 'Pretendard Variable';
    }

    .ql-font-맑은고딕 {
        font-family: '맑은 고딕';
    }

    /*
     * 추가 폰트 설정
     */
    // 여기에 추가
    // addFonts=['Courier'] 일 경우 예시
    .ql-font-Courier {
        font-family: 'Courier';
    }
    // =====================================================
}
</style>
```

---

### Props

|           필수            | Prop             | 설명                   | 타입/값   | Default |
| :-----------------------: | :--------------- | :--------------------- | --------- | ------- |
| :triangular_flag_on_post: | **id**           | 아이디                 | `String`  |         |
| :triangular_flag_on_post: | **v-model**      | 콘텐츠 내용(html)      | `String`  |         |
|                           | **jodit**        | jodit editor 활성화    | `Boolean` | false   |
|                           | **placeholder**  | placeholder 값         | `String`  |         |
|                           | **toolOpts**     | toolBox 스타일 적용    | `Object`  |         |
|                           | **contentsOpts** | contentBox 스타일 적용 | `Object`  |         |
|                           | **addFonts**     | 추가할 폰트명          | `Array`   |         |

---

### Etcs

-   두 에디터 타입 모두 인라인 스타일 적용 가능
-   크기(가로, 세로)는 인라인 스타일 전달 , 색상(글자색, 배경색)은 toolOpts 으로 객체 {color : 글자색, background : 배경색} 전달
-   이 외 상세 스타일링 설정은 클래스 별 설정 된 css 강제 수정
-   기본 높이 값 300px , 기본 최소 높이 300px, 기본 최소 넓이 500px

---

### Events

-   Events 없음
