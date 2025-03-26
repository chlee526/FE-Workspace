# UI - Form - Textarea

-   Textarea UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                  |
| ---------- | ----- | ------------------------------------- |
| 2023-12-29 | 1.0.0 | forbiddenKeys - 입력금지 키 기능 추가 |
| 2023-04-06 | 1.0.0 | Textarea 패키지 마이그레이션          |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<template>
    <!-- Input 기본형 -->
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" :rows="줄수" :cols="글자수" placeholder=""></comp-textarea>

    <!-- Width 고정 -->
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" :rows="줄수" :cols="글자수" style="width속성설정"></comp-textarea>

    <!-- 미사용(Disabled) -->
    <comp-textarea id="아이디명" class="클래스명" v-model="Vue Variables" :rows="줄수" :cols="글자수" disabled></comp-textarea>
</template>
```

---

#### Props

|        필수        | Prop               | 설명                                                      | 타입/값     | Default |
| :----------------: | :----------------- | :-------------------------------------------------------- | ----------- | ------- |
| :heavy_check_mark: | **id**             | 아이디                                                    | `String`    |         |
|                    | **rows**           | Textarea rows 설정값                                      | `Number`    |         |
|                    | **cols**           | Textarea cols 설정값                                      | `Number`    |         |
|                    | **forbiddenChars** | 입력 금지 문자 또는 단어<pre>[ '\(', '\"', 'word' ]</pre> | `Array`     |         |
|                    | **forbiddenKeys**  | 입력 금지 키(키코드)<pre>[ 13, 45 ]</pre>                 | `Array`     |         |
|                    | **v-model**        | 컴포넌트 할당 변수                                        | `String`    |         |
|                    | **placeholder**    | placeholder 값 설정                                       | `String`    | ''      |
|                    | **style**          | CSS 설정                                                  | `CSS`       |         |
|                    | **disabled**       | 미사용 여부                                               | `Attribute` |         |

---

#### Events

|    Event    | 설명           | Callback                                        | Default |
| :---------: | :------------- | :---------------------------------------------- | ------- |
| **keydown** | keydown 이벤트 | `Object`'키보드 이벤트'<br>`String`'입력데이터' |         |
|  **keyup**  | keyup 이벤트   | `Object`'키보드 이벤트'<br>`String`'입력데이터' |         |
|  **focus**  | focus 이벤트   |                                                 |         |
|  **blur**   | blur 이벤트    |                                                 |         |
