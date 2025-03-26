# UI - Chart - gender

-   성별 차트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                     |
| ---------- | ----- | ------------------------ |
| 2023-04-06 | 1.0.0 | Gender 차트 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

``` vue
<template>

   <comp-chart-gender id="chart_gender_01" :chart-data="chartData"></comp-chart-gender>

   <!-- 수량 없이, 퍼센트로만 데이터를 받는 경우 -->
   <comp-chart-gender id="chart_gender_02" :chart-data="chartData2" @click="evt_chart_click"> </comp-chart-gender>
</template>

<script>
    // 비율별로 크기변경 X
     chartData: {
        data: [
            {
                name: "이름",
                code: "코드",
                datas: [{ value: "값"}]
                color: "색상"   // (color 값 없을경우 차트 기본 색상 적용됨)
            }
        ]
    }

     // 비율별로 크기변경 
    chartData: {
        data: [
            {
                name: "이름",
                code: "코드",
                datas: [  
                    { name: "이름", code: "코드", value: "값"},
                    { name: "이름2", code: "코드2", value: "값2"}
                ]
                 color: "색상"  // (color 값 없을경우 차트 기본 색상 적용됨)
            }
        ]
    }
    </script>
```

---

#### Props

|        필수        | Prop               | Sync | 설명                                                                                          | 타입/값   | Default |
| :----------------: | :----------------- | :--: | :------------------------------------------------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **id**             |      | 아이디                                                                                        | `String`  |         |
| :heavy_check_mark: | **chartData**      |      | 차트 데이터<pre>data: [{name: "이름", code:"코드", datas:[{value: "값"}], color:"색상"}] </pre> | `Object`  |         |
|                    | **onlyPercentage** |      | 수량 없이, 퍼센트로만 데이터를 받는 경우 사용                                                                                    | `Boolean` | false   |
|                    | **style**          |      | CSS 설정                                                                                       | `CSS`     |         |

---

#### Events

| 이벤트 | 설명                                | Callback Arguments                                   | Default |
| ------ | ----------------------------------- | --------------------------------------------------- | ------- |
| click  | 차트 그래프 클릭시 클릭 데이터 전달 | `Object`<br>{ name: '', per: '', value: 0, color: '' } |        |
