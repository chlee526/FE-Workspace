# UI - Chart - Radar

-   라이다 차트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                    |
| ---------- | ----- | ---------------------- |
| 2023-04-06 | 1.0.0 | Radar 차트 마이그레이션  |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본 -->
<script>
chartData: {
    data: [
        {
            category: "카테고리명",
            categoryCode: "카테고리 코드",
            value: 카테고리 값
        }
    ]
}
</script>
<comp-chart-radar id="아이디명" :chart-data="chartData(차트데이터)" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-radar>

<!-- 사용자 색상 - 옵션 -->
<script>
chartOpts: {
    colors: [ "#fbebeb", "#EA7070", "#AAAAAA"... ]
},
chartData: {
    data: [
        {
            category: "카테고리명",
            categoryCode: "카테고리 코드",
            value: 카테고리 값
        }
    ]
}
</script>
<comp-chart-radar id="아이디명" :opts="차트옵션" :chart-data="chartData(차트데이터)" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-radar>

<!-- 멀티 그래프, 전체합계 표시 -->
<script>
chartData: {
    graphs: [
        { name: "이름", graphCode: "코드", value_field: "Value 필드명" },
    ],
    data: [
        {
            category: "카테고리명",
            categoryCode: "카테고리 코드",
            value: 카테고리 값
        }
    ]
}
</script>
<comp-chart-radar id="아이디명" :opts="차트옵션" :chart-data="chartData(차트데이터)" :total-label="true" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-radar>

<!-- 멀티 그래프, 사용자 색상 -->
<script>
chartData: {
    graphs: [
        { name: "이름", graphCode: "코드", value_field: "Value 필드명", fill: "그래프 색상" },
    ],
    data: [
        {
            category: "카테고리명",
            categoryCode: "카테고리 코드",
            value: 카테고리 값
        }
    ]
}
</script>
<comp-chart-radar id="아이디명" :opts="차트옵션" :chart-data="chartData(차트데이터)" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-radar>
```

---

#### Props

|        필수        | Prop           | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 타입/값  | Default |
| :----------------: | :------------  | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| :heavy_check_mark: | **id**         | 아이디                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `String`  |       |
| :heavy_check_mark: | **chartData**  | 차트 데이터<pre><br>{ <br> graphs: [{ <br> &nbsp;name: '그래프명',<br> &nbsp;graphCode: '그래프 코드',<br> &nbsp;value_field: '데이터에서 연결되는 value field 명'<br> &nbsp;fill: '그래프 색상'<br>}], <br> data: [{ <br> &nbsp;category: '카테고리명', <br> &nbsp;categoryCode: '카테고리 코드', <br> &nbsp;value: 카테고리 값<br>&nbsp; }] <br>  total_cnt: 전체합계(type: Number)  // total_cnt값이 있으면 전체 합계에 total_cnt 출력, 없으면 value 합산하여 출력 <br> } </pre> | `Object`  | null |
|                    | **opts**       | 차트 옵션.&nbsp; Amchart의 옵션을 사용하여 설정 할 수 있음.<br> <pre>{<br> colors: [ '#fbebeb', '#EA7070', '#AAAAAA'...] // 사용자 색상 <br> } </pre>                                                                                                                                                                                                                                                                                                                       | `Object`  | null |
|                    | **useAxis**    | 차트 축 사용여부                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `Boolean` | true |
|                    | **totalLabel** | 전체합계 표시 여부                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `Boolean` | false |

---

#### Events

|   Event   | 설명                       | Callback                                                                                                             | Default |
| :-------: | :------------------------- | :------------------------------------------------------------------------------------------------------------------- | ------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br>{ type: 'clickGraphItem', chart: {...}, graph: {...}, item: {...}, target: {...}, index: 1, event: {...} } |         |
