# UI - Chart - Age

-   나이별 차트

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전   | 내용                |
| ---------- | ------| ------------------- |
| 2023-04-06 | 1.0.0 | Age 차트 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명              |
| ----- | ----- | ----------------- |
| index | index | 공유 컴포넌트 메인 |

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
            value: 카테고리 값,
            color(fill): 색상,
        }
    ]
}
</script>

<comp-chart-age id="아이디" class="클래스" :chart-data="chartData(차트데이터)" @click="클릭 이벤트 연결 함수" style="CSS 스타일"></comp-chart-age>

<!-- 수량 없이, 퍼센트로만 데이터를 받는 경우 -->
<comp-chart-age id="아이디" class="클래스" :chart-data="chartData(차트데이터)" @click="클릭 이벤트 연결 함수" style="CSS 스타일" :only-percentage="true"></comp-chart-age>
```

---

#### Props

|        필수        | Prop               | Sync | 설명                                        | 타입/값   | Default |
| :----------------: | :----------------- | ---- | :------------------------------------------| --------- | ------- |
| :heavy_check_mark: | **id**             |      | 아이디                                      | `String`  |        |
| :heavy_check_mark: | **chartData**      |      | 차트 데이터 <pre>{data: []}</pre>           | `Object`  |         |
|                    | **onlyPercentage** |      | 수량 없이, 퍼센트로만 데이터를 받는 경우 사용  | `Boolean` | false  |
|                    | **style**          |      | CSS 설정                                    | `CSS`     |         |

---  

#### Events

| 이벤트  | 설명                             | Callback Arguments                                                        | Default |
|:------:|:---------------------------------| :-------------------------------------------------------------------------| --------|
| click  | 차트 그래프 클릭시 클릭 데이터 전달 | `Object`<br>{ category: '', categoryType: '', hgt: '', per: '', value: 0} |            
