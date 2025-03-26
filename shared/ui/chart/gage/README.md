# UI - Chart - Gage

-   GAGE Chart UI

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                     |
| ---------- | ----- | ------------------------ |
| 2023-04-06 | 1.0.0 | Gage 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
<template>
    <comp-chart-gage id="아이디" :chart-data="차트데이터" style="사용자 스타일" @click="클릭 이벤트"></comp-chart-gage>
</template>
```

---

### Props

|           필수            | Prop          | 설명                                                                                   | 타입/값  | Default |
| :-----------------------: | :------------ | :------------------------------------------------------------------------------------- | -------- | ------- |
| :triangular_flag_on_post: | **id**        | 아이디                                                                                 | `String` |         |
| :triangular_flag_on_post: | **chartData** | 차트 데이터<br><pre>[ { code: "코드", name: "이름", color: "색상", value: 값 } ]</pre> | `Array`  | [ ]     |
|                           | **style**     | CSS 설정<br> `최소넚이(min-width): 150px 높이(height): 16px`                           | `CSS`    |         |

---

### Events

|   Event   | 설명                       | Callback                                                                                              |
| :-------: | :------------------------- | :---------------------------------------------------------------------------------------------------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br><pre>{ code: 'c_110', color: '#EECC3B', name: '정부기관', per: '13.8', value: 547 }</pre> |
