# Templates - Modal - Relinfo

-   관련정보 Modal 기능
-   UI - Function - Modal에서 Modal 관리
-   분석대상을 설정하거나, 안할수 있음.
-   subTitle을 통한 조건 전달
-   range(검색기간범위)를 설정하면 팝업 자체 달력기능 사용 가능
-   cateFilters 설정을 통해 상단에 Selectbox로 된 Filter기능 사용 가능

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                        |
| ---------- | ----- | --------------------------- |
| 2023-04-06 | 1.0.0 | Relinfo 패키지 마이그레이션 |

---

#### File

| 파일명          | 타입     | 설명               |
| --------------- | -------- | ------------------ |
| index           | index    | 공유 컴포넌트 메인 |
| RelinfoDataList | 컴포넌트 | 데이터 목록        |
| RelinfoRkeyword | 컴포넌트 | 연관어             |
| RelinfoVolume   | 컴포넌트 | 정보량 추이        |

---

#### Useage

```vue
<template>
  <!-- 관련정보 Modal 열기 -->
  <button @click="$store.dispatch("MODAL_OPEN", [ "RELINFO", {파라미터} ])">버튼</button>

  <!-- 관련정보 Modal 닫기 -->
  <button @click="$store.dispatch("MODAL_CLOSE", "RELINFO")">버튼</button>
</template>

<script>
  <!-- 파라미터 예시 -->
  {
      //상단 제목
      title: [
          { code: "코드", name: "분석대상", type: "종류" },
      ],

      // 상단 표기 날짜
      ps_date: {
          date: "비교 시작 날짜",
      },
      pe_date: {
          date: "비교 종료 날짜",
      },
      s_date: {
          date: "현재 시작 날짜",
      },
      e_date: {
          date: "종료 시작 날짜",
      },

      // 상단 서브 제목
      subTitle: [
          { code: "코드", keyword: "키워드", type: "종류" },
      ],

      // 최대 검색 기간(기본사용안함)
      dateMaxRange: "기간",

      // 필터링 옵션 항목(변함, 기본없음)
      cateFilters: [
          {
              name: "필터명",
              type: "조건타입(검색필터명)",
              value: "옵션 코드",
              opts: [
                  { code: "코드", name: "이름" },
              ],
          },
      ],
  }
</script>
```

---

#### Props

-   컴포넌트 호출시 사용 X

    | 필수 | Prop             | 설명        | 타입/값  | Default |
    | :--: | :--------------- | :---------- | -------- | ------- |
    |      | **popName**      | 아이디      | `String` |         |
    |      | **searchParams** | 검색조건    | `Object` |         |
    |      | **hgt**          | 모달창 높이 | `Number` |         |
    |      | **useAttrs**     | 연관어 속성 | `Object` | false   |

##### EventBus Parameter(searchParams)

|        필수        | Prop             | 설명                                                                                                                                                                                                                                                                 | 타입/값  | Default |
| :----------------: | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
|                    | **title**        | 분석대상 - 브랜드/카테고리...등<br>Object형태로 멀티 구성<br>title이 없는 경우 '관련정보'로 표기<br><pre>[ { code:'코드', name:'워딩', type:'조건타입(검색필터명)' }, ... ]</pre>                                                                                    | `Array`  |         |
| :heavy_check_mark: | **date**         | 관련정보 기본 조건 - 검색기간<br><pre>c_sdate: { date: '2020-01-01' } - 비교기간 시작 날짜<br>c_edate: { date: '2020-01-01' } - 비교기간 종료 날짜<br>sdate: { date: '2020-01-01' } - 현재기간 시작 날짜<br>edate: { date: '2020-01-01' } - 현재기간 시작 날짜</pre> | `Object` |         |
|                    | **subTitle**     | 관련정보 기본 조건 - 채널/감성...등<br>Object형태로 멀티 구성<br><pre>[ { code:'코드', name:'워딩', type:'조건타입(검색필터명)' }, ... ]</pre>                                                                                                                       | `Array`  |         |
|                    | **dateMaxRange** | 검색조건 Limit 설정, 값 설정 시 달력이 자동으로 사용 됨<br>`'7'`: 7일<br>`'1M'`: 1달<br>`'1Y'`: 1년                                                                                                                                                                  | `Array`  |         |
|                    | **cateFilters**  | 검색조건 필터 추가(셀렉트박스로 구성)<br><pre>[ { name:'워딩', type:'조건타입(검색필터명)', value:'옵션 코드', opts: 옵션 목록[ { code, name }, ... ] }, ... ]</pre>                                                                                                 | `Array`  |         |
|                    | **useAttrs**     | 연관키워드에서 속성 사용시, 속성 목록 전달                                                                                                                                                                                                                           | `Array`  | null    |

---

#### Events

-   Events 없음
