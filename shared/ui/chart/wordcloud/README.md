# UI - Chart - Word Cloud

-   WordCloud Chart UI
-   차트데이터를 통해 그래프 설정이 가능

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                           |
| ---------- | ----- | -------------------------------------------------------------- |
| 2024-12-05 | 1.0.0 | opts > space 추가 - 워드 사이의 공간을 px단위로 설정할 수 잇음 |
| 2023-04-06 | 1.0.0 | WordCloud 패키지 마이그레이션                                  |
| 2023-04-07 | 1.1.0 | WordcloudChart useRank 추가                                    |

---

#### File

| 파일명         | 타입     | 설명                    |
| -------------- | -------- | ----------------------- |
| index          | index    | 공유 컴포넌트 메인      |
| WordcloudBrd   | 컴포넌트 | wordcloud - 게시판 형식 |
| WordcloudChart | 컴포넌트 | wordcloud - 차트 형식   |

---

#### Useage

```vue
<template>
    // 기본
    <comp-chart-wordcloud
      id='아이디명'
      :chart-data='chartData(차트데이터)'
      :opts={maxFont: 80}
      viewType='클라우드/게시판보기'
      toggleType='선택아이템사용(단일/멀티)'
      legend='범례'
      rotation='회전'
      sort='정렬방법'
      v-model='선택아이템'
      style='CSS 스타일'
      @click='키워드클릭이벤트'
    ></comp-chart-wordcloud>

    // 색상 - 범례(점유율)
    <comp-chart-wordcloud
      id='아이디명'
      :chart-data='chartData(차트데이터)'
      legend='share'
      style='CSS 스타일'
    ></comp-chart-wordcloud>

    // 색상 - 범례(순위)
    <comp-chart-wordcloud
      id='아이디명'
      :chart-data='chartData(차트데이터)'
      legend='rank'
      style='CSS 스타일'
    ></comp-chart-wordcloud>

    // 색상 - 범례(순위-사용자설정)
    <comp-chart-wordcloud
      id='아이디명'
      :chart-data='chartData(차트데이터)'
      :legend='[{rank:'3', color:'#EC5151'}, {rank:'6', color:'#ABC834'}, {rank:'10', color:'#1F9BC9'}, {rank:'', color:'#AAAAAA'}]'
      style='CSS 스타일'
    ></comp-chart-wordcloud>
</template>

<script>
  // 기본
  chartData: {
    data: [
      {
        code: '코드',
        cnt_d: 1565308,
        name: '생각'
      }
    ]
  }

  // 사용자 색상 - 데이터
  chartData: {
    data: [
      {
        code: '코드',
        cnt_d: 1565308,
        name: '생각',
        color: '색상'
      }
    ]
  }
</script>
```

---

#### Props

|           필수            | Prop               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 타입/값        | Default |
| :-----------------------: | :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------- |
| :triangular_flag_on_post: | **id**             | 아이디                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `String`       |         |
| :triangular_flag_on_post: | **chartData**      | 차트 데이터<pre>{ <br> data: [ { <br> &nbsp;code: '키워드 코드'<br> &nbsp;keyword/name: '키워드명'<br> &nbsp;value/cnt_d: '정보량'<br> &nbsp;cnt_p: '비교기간 정보량',(기본: 속성없음)<br> &nbsp;new: '신규진입',(기본: 속성없음, 신규: 'new')<br> &nbsp;fill/color: '키워드 색상', **색상 미정의 시 '#666666' 색상으로 설정 (기본: 속성없음)<br> &nbsp;factor_per: '증감률',(기본: 속성없음)<br> &nbsp;attrName: '속성이름', ** 속성 사용시에만 이름 할당, (기본: 속성없음)<br> } ] <br>}</pre> | `Object`       |         |
|                           | **opts**           | 차트옵션<br> <pre>{<br> minFont: 11, // 폰트 최소 사이즈(기본: 11)<br> maxFont: 50, // 폰트 최대 사이즈(기본: 50), 차트보다 커질경우 -10px씩 줄여가며 ReBuild<br>}</pre>                                                                                                                                                                                                                                                                                                                         | `Object`       | null    |
|                           | **viewType**       | 워드클라우드/게시판 교체 보기 기능<br>'null'일 경우, 해당 기능 사용하지 않음<br>`'1'`: 클라우드 보기<br>`'2'`: 게시판 보기                                                                                                                                                                                                                                                                                                                                                                       | `String`       | 1       |
|                           | **useViewType**    | 워드클라우드/게시판 교체 보기 숨기기(Hidden)<br>'false' 인경우 해당 기능을 안보이게 처리<br>'false' 여도 viewType은 사용 가능                                                                                                                                                                                                                                                                                                                                                                    | `Boolean`      | true    |
|                           | **toggleType**     | 선택기능 사용 시, 단일/멀티 선택인지 설정<br>v-model(Array)을 통해 선택 키워드 연결<br>`'one'`: 단일선택<br>`'multi'`: 멀티선택                                                                                                                                                                                                                                                                                                                                                                  | `String`       | null    |
|                           | **legend**         | 범례기능 사용 시, 점유율/순위/사용자설정<br>`'share'`: 점유율(0\~100%, 10단계)<br>`'rank'`: 순위(1\~3, 4\~6, 7\~10, 11\~)<br><pre>// 사용자 순위 설정<br>[ {<br> rank: '순위', // 해당 순위까지, ex) ~3위<br> color: '컬러', // 해당 순위까지의 색상<br>} ]</pre>                                                                                                                                                                                                                                | `String/Array` | null    |
|                           | **legendShow**     | 범례 노드 숨김                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `Boolean`      | false   |
|                           | **rotation**       | 텍스트 회전 여부                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `Boolean`      | true    |
|                           | **fixActiveColor** | 활성화 시 색상 강제 설정<br>색상값(hex)                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `String`       | null    |
|                           | **sort**           | 정보량/점유율 기준 선택<br>`T` : '정보량'<br>`H` : '점유율'                                                                                                                                                                                                                                                                                                                                                                                                                                      | `String`       | T       |
|                           | **useAttrFixed**   | 속성 사용여부(말풍선/테이블 컬럼)                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `Boolean`      | false   |
|                           | **useFlucFixed**   | 증감률 사용여부(말풍선/테이블 컬럼)                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `Boolean`      | false   |
|                           | **useRank**        | (순위/전체갯수) 사용 여부                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `Boolean`      | false   |
|                           | **labelName**      | 게시판형 wordcloud label 이름                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `String`       | 연관어  |
|                           | **style**          | CSS 설정                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `CSS`          |         |
|                           | **v-model**        | 선택키워드 정보                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `Array`        |         |

---

#### Events

|   Event   | 설명                       | Callback                                                                                                                                | Default |
| :-------: | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| **click** | 차트 클릭 이벤트 연결 함수 | `Object`<br>{ attr_type_code: '', code: '', color: '', name: '', new: '', rank: 1, type: 'rkeyword', weight: 1, weight_p: 1, word: '' } |         |
