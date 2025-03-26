# UI - Chart - Treemap

-   트리맵 차트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                      |
| ---------- | ----- | ------------------------- |
| 2023-04-06 | 1.0.0 | Treemap 차트 마이그레이션 |

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
            code: "코드명",
            name: "이름",
            value: 정보량,
            fluc: 증감률,
            new: 신규진입,
            fill: "컬러",
            data: { 추가데이터(JSON) }
        },
    ]
}

// 그라디언트 컬러 설정
opts: {
    colors: ['#AE7A13', '#e1d1ae']  // ['시작컬러 Hex', 종료컬러 'Hex']
}
</script>

<!-- 기본 -->
<comp-chart-treemap id="아이디" toggle-type="선택갯수" :chart-data="차트데이터" v-model="선택값" style="CSS 스타일"></comp-chart-treemap>

<!-- 커스텀색상(그라디언트) -->
<comp-chart-treemap id="아이디" :chart-data="차트데이터" :opts="opts" v-model="선택값" style="CSS 스타일"></comp-chart-treemap>

<!-- 단일 선택-->
<comp-chart-treemap id="아이디" :chart-data="차트데이터" toggle-type="one" v-model="선택값" style="CSS 스타일"></comp-chart-treemap>

<!-- 다중 선택-->
<comp-chart-treemap id="아이디" :chart-data="차트데이터" toggle-type="multi" v-model="선택값" style="CSS 스타일"></comp-chart-treemap>

<!-- 기본선택, 선택 불가능-->
<script>
chartData: {
    data: [
        {
            code: '코드명',
            name: '이름',
            value: 정보량,
            fluc: 증감률,
            new: 신규진입,
            fill: '컬러',
            data: {
                active: true, // 기본선택
            },
        },
    ];
}
</script>
<comp-chart-treemap id="아이디" :chart-data="차트데이터" style="CSS 스타일"></comp-chart-treemap>
```

---

#### Props

|        필수        | Prop           | 설명                                                                                                                                                                                                                                                                                                                                                                                                               | 타입/값  | Default |
| :----------------: | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| :heavy_check_mark: | **id**         | 아이디                                                                                                                                                                                                                                                                                                                                                                                                             | `String` |        |
| :heavy_check_mark: | **chartData**  | 차트 데이터<pre><br>{ <br> data: [{ <br> &nbsp;&nbsp;code: '코드',<br> &nbsp;&nbsp;name: '이름',<br> &nbsp;&nbsp;value: 정보량, <br> &nbsp;&nbsp;fluc: 증감률, <br> &nbsp;&nbsp;new: 신규진입,<br> &nbsp;&nbsp;fill: '색상', <br> &nbsp;&nbsp;data: {<br>&nbsp;&nbsp;&nbsp;&nbsp; active: true, // 기본 선택<br>&nbsp;&nbsp;&nbsp;&nbsp; 추가데이터(JSON) <br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}] <br> } </pre> | `Object` | null   |
|                    | **toggleType** | 선택 기능 사용시, 단일/멀티 사용 설정<br>`'one'` : 단일 선택, `'multi'`: 멀티 선택                                                                                                                                                                                                                                                                                                                                     | `String` | null   |
|                    | **opts**       | 차트 옵션.&nbsp; 그라디언트 컬러 설정.<br> <pre>{ colors: ['#AE7A13', '#e1d1ae'] } // ['시작컬러 Hex', 종료컬러 'Hex']</pre>                                                                                                                                                                                                                                                                                           | `Object` | null  |
|                    | **v-model**    | 선택 키워드 정보                                                                                                                                                                                                                                                                                                                                                                                                     | `String` |       |
|                    | **percentage** | 퍼센트 사용여부                                                                                                                                                                                                                                                                                                                                                                                                      | `Boolean`| true  |
|                    | **style**      | CSS 설정                                                                                                                                                                                                                                                                                                                                                                                                            | `CSS`    |       |

---

#### Events

|   Event   | 설명                     | Callback                                                                                      | Default |
| :-------: | :------------------------| :-------------------------------------------------------------------------------------------- | ------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br>{ bounds: {...}, code: '', data: {...}, fill: '', label: '', name: '', value: 0 } |         |
