# UI - Form - Editor(jodit)

-   에디터 컴포넌트
-   'jodit' 라이브러리 사용

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)
6. [Etcs](#etcs)

---

### History

| 일자       | 버전  | 내용                                                           |
| ---------- | ----- | -------------------------------------------------------------- |
| 2024-12-16 | 1.0.0 | jodit 에디터 타입 추가 (기존 GS 리테일에서 사용한 에디터 참고) |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<template>
    <comp-jodit-editor id="아이디명" v-model="콘텐츠 내용(html)" :add-fonts="추가할 폰트명" :placeholder="placeholder"></comp-jodit-editor>
</template>
```

---

### Props

|           필수            | Prop                    | 설명                         | 타입/값  | Default |
| :-----------------------: | :---------------------- | :--------------------------- | -------- | ------- |
| :triangular_flag_on_post: | **id**                  | 아이디                       | `String` |         |
| :triangular_flag_on_post: | **v-model**             | 콘텐츠 내용(html)            | `String` |         |
|                           | **placeholder**         | placeholder 값               | `String` |         |
|                           | **addFonts**            | 추가할 폰트명                | `Array`  |         |
|                           | **toolbarStickyOffset** | jodit toolbar sticky 기준 값 | `Number` | 0       |

---

### Events

-   Events 없음

---

### Etcs

-   인라인 형태로 style을 적용하는 경우 에디터 컨텐츠 스타일이 아닌 에디터 전체 스타일에 적용 됩니다.
-   색상 관련 속성은 에디터 툴바의 배경색, 아이콘 색깔 적용이 됩니다. (에디터 색상 X)
-   다른 스타일들을 적용하고자 한다면 에디터 클래스 별 css 선언을 해야합니다.
