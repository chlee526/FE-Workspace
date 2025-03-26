# UI - Chart - Pie

-   Pie Chart UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                    |
| ---------- | ----- | ----------------------- |
| 2023-04-06 | 1.0.0 | Pie 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<template>
    <comp-chart-v3-pie id="아이디명" :opts="차트옵션" :chart-data="chartData(차트데이터)" legend="레전드 포지션" :legend-volume="범레값 표기여부" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-v3-pie>
</template>

<script>
// 기본
chartData: {
  data: [
    {
      category: '카테고리명',
      categoryCode: '카테고리 코드',
      value: 카테고리 값
    }
  ]
}

// 사용자 색상 - 데이터
chartData: {
  data: [
    {
      category: '카테고리명',
      categoryCode: '카테고리 코드',
      fill: '카테고리 색상',
      value: 카테고리 값
    }
  ]
}

// 사용자 색상 - 옵션
chartOpts: {
  colors: [ "#fbebeb", "#EA7070", "#AAAAAA" ]
},
chartData: {
  data: [
    {
      category: '카테고리명',
      categoryCode: '카테고리 코드',
      fill: '카테고리 색상',
      value: 카테고리 값
    }
  ]
}

// 중앙 라벨 설정
chartData: {
  label: {
    title: '라벨명',
    value: 라벨값
  },
  data: [
    {
      category: '카테고리명',
      categoryCode: '카테고리 코드',
      fill: '카테고리 색상',
      value: 카테고리 값
    }
  ]
}
</script>
```

---

#### Props

|           필수            | Prop             | 설명                                                           | 타입/값   | Default |
| :-----------------------: | :--------------- | :------------------------------------------------------------- | --------- | ------- |
| :triangular_flag_on_post: | **id**           | 아이디                                                         | `String`  |         |
| :triangular_flag_on_post: | **chartData**    | 차트 데이터<br>`Useage 참고`                                   | `Object`  |         |
|                           | **opts**         | 차트옵션<br>Amchar의 옵션을 사용하여 설정 할 수 있음           | `Object`  |         |
|                           | **legend**       | 차트 레전드(범례) 포지션<br>`''/'top'/'bottom'/'left'/'right'` | `String`  |         |
|                           | **legendVolume** | 클래스차트 레전드(범례) 값 표기<br>범례명 정보량(점유율%)      | `Boolean` | false   |

---

#### Events

|   Event   | 설명                       | Callback                                                                        | Default |
| :-------: | :------------------------- | :------------------------------------------------------------------------------ | ------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br>{ type: 'clickSlice', dataItem: {...}, chart: {...}, event: {...} } |         |
