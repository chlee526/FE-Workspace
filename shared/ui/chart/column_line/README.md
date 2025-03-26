# UI - Chart - Column/Line

-   컬럼 라인 차트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                          |
| ---------- | ----- | ----------------------------- |
| 2023-04-06 | 1.0.0 | Column/Line 차트 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```
<template>
    <script>
        // 단일 날짜형 데이터
        chartData: {
            graphs: [
                { name: "긍정", graphCode: "01", value_field: "value_01", fill: "#5BA1E0" },
                { name: "부정", graphCode: "02", value_field: "value_02", fill: "#EA7070" },
                { name: "중립", graphCode: "03", value_field: "value_03", fill: "#AAAAAA", exptTotal: true },
            ],
            data: [
                {
                    category: "카테고리명",
                    categoryCode: "카테고리 코드",
                    value_01: 카테고리 값,
                    value_02: 카테고리 값,
                    value_03: 카테고리 값
                }
            ]
        }

        // 멀티 날짜형 데이터
        chartData: {
            graphs: [
                { name: '긍정', graphCode: '01', value_field: 'value_01', fill: '#5BA1E0' },
                { name: '부정', graphCode: '02', value_field: 'value_02', fill: '#EA7070' },
                { name: '중립', graphCode: '03', value_field: 'value_03', fill: '#AAAAAA' },
            ],
            data: [
                {
                    category: '비교기간 시작일\n2022-10-29\n2022-12-09\n2022-12-14',
                    value_01: 카테고리 값,
                    value_02: 카테고리 값,
                    value_03: 카테고리 값,
                    compare: 비교기간일 경우 true,
                },
                {
                    category: '+1일\n2022-10-30\n2022-12-10\n2022-12-15',
                    value_01: 카테고리 값,
                    value_02: 카테고리 값,
                    value_03: 카테고리 값,
                }
            ]
        }
    </script>
    <comp-chart-v3-column-line
        id="아이디"
        type="차트타입"
        :chart-data="chartData(차트데이터)"
        @click="클릭 이벤트 연결 함수"
        style="CSS 스타일">
    </comp-chart-v3-column-line>
</template>
```

---

#### Props

|        필수        | Prop                  | Sync | 설명                                                                                                                                                                                                  | 타입/값                                   | Default |
| :----------------: | :-------------------- | :--: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------- |
| :heavy_check_mark: | **id**                |      | 아이디                                                                                                                                                                                                | `String`                                  |         |
|                    | **class**             |      | 클래스                                                                                                                                                                                                | `String`                                  |         |
|                    | **opts**              |      | 옵션                                                                                                                                                                                                  | `Object`                                  |         |
| :heavy_check_mark: | **chartData**         |      | 데이터                                                                                                                                                                                                | `Object`<pre>{graphs: {}, data: []}</pre> |         |
|                    | **dateType**          |      | 날짜별데이터인 경우, 어떤 형식으로 보일지 결정<pre>day: 일<br>week: 주<br>month: 월</pre>                                                                                                             | `String`                                  | null    |
|                    | **type**              |      | 차트모양<pre>column-cluster: 컬럼<br>column-stack: 컬럼(스택)<br>column-stack-100: 컬럼(스택/100%)<br>bar-cluster: 바<br>bar-stack: 바(스택)<br>bar-stack-100: 바(스택/100%)<br>line: 라인</pre>      | `String`                                  | null    |
|                    | **typeOpts**          |      | 차트모양 옵션<pre>column-cluster: 컬럼<br>column-stack: 컬럼(스택)<br>column-stack-100: 컬럼(스택/100%)<br>bar-cluster: 바<br>bar-stack: 바(스택)<br>bar-stack-100: 바(스택/100%)<br>line: 라인</pre> | `Array`                                   | null    |
|                    | **maxCategoryLen**    |      | 차트 스크롤이 생기는 최소 카테고리 갯수                                                                                                                                                               | `Number`                                  | 30      |
|                    | **legend**            |      | 차트 레전드(범례) 사용여부 및 포지션<pre>top: 위<br>bottom: 아래<br>left: 좌<br>right: 우</pre>                                                                                                       | `String`                                  |         |
|                    | **totalLabel**        |      | 전체합계 표시여부<br>GraphData의 'exptTotal'이 false인 그래프만 전체합계에 포함                                                                                                                       | `Boolean`                                 | true    |
|                    | **balloonPercentage** |      | 말풍선 점유율(퍼센트) 표시 여부                                                                                                                                                                       | `Boolean`                                 | true    |
|                    | **multipleDate**      |      | 다중날짜차트 사용시([] or [컬러,컬러])                                                                                                                                                                | `Array`<pre>['#ff0000'...]</pre>          | null    |
|                    | **compareFixed**      |      | 비교날짜 활성되어 시작, 단 날짜 데이터 일때만 사용                                                                                                                                                    | `Boolean`                                 | false   |
|                    | **style**             |      | 스타일시트                                                                                                                                                                                            | `Attribute`                               |         |

---

#### Events

| 이벤트 | 설명                                | Callback Arguments |
| ------ | ----------------------------------- | ------------------ |
| click  | 차트 그래프 클릭시 클릭 데이터 전달 | `Object`<br>{}     |
