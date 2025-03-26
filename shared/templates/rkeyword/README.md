# Templates - Rkeyword

-   연관키워드 템플릿
-   WordCloud, Board 컴포넌트를 이용한 연관키워드 템플릿
-   최대 키워드 갯수 설정 가능
-   range(검색기간범위) 설정을 통해 달력기능 사용 가능
-   useAttrs(연관어속성) 설정을 통해 속성 설정 가능, 또한 useDeatilAttrs(연관어상세설정) 추가 설정으로 상세설정 사용 가능
-   1차/2차 정렬기능(Top/Hot)은 별도로 설정
-   2차 키워드의 경우 설정으로 미사용 가능
-   2차 키워드 미사용 가능
-   범례설정이 가능
-   관련정보 팝업 호출시, 팝업의 연관키워드 내에 속성 사용여부 및 목록 설정 가능

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                         |
| ---------- | ----- | ---------------------------- |
| 2023-05-10 | 1.0.0 | events - click 추가          |
| 2023-04-07 | 1.0.0 | props - useRank 추가         |
| 2023-04-06 | 1.0.0 | Rkeyword 패키지 마이그레이션 |

---

#### File

| 파일명              | 타입     | 설명               |
| ------------------- | -------- | ------------------ |
| index               | index    | 공유 컴포넌트 메인 |
| RkeywordAttrs       | 컴포넌트 | 속성 설정          |
| RkeywordAttrsDetail | 컴포넌트 | 속성 상세 설정     |

---

#### Useage

```vue
<!-- 기본 -->
<script>
chartData: {
    data: [
        {
            cnt_d: '현재정보량',
            cnt_p: '이전정보량',
            code: '코드',
            factor_per: '증감률',
            name: '키워드명',
            new: '신규',
            senti_1: '긍정 정보량(현재)',
            senti_2: '부정 정보량(현재)',
            senti_3: '중립 정보량(현재)',
        },
    ];
}
</script>
<tmpl-rkeyword id="아이디" :common-search-opts="공통검색조건"></tmpl-rkeyword>

<!-- SLOT형 -->
// 박스형태 그대로 사용할 경우, Header부분을 Slot으로 제공
<tmpl-rkeyword class="ui_box" id="아이디" :common-search-opts="공통검색조건">
    <div class="header" slot="header">
        <div class="wrap">
            <h3>
                <span>기본</span>
                <div class="sub_title">
                    <span title="SLOT 형태" class="keyword">SLOT 형태</span>
                </div>
            </h3>
        </div>
    </div>
</tmpl-rkeyword>

<!-- 전체 옵션 -->
<tmpl-rkeyword id="아이디" :common-search-opts="공통검색조건" :keywor-len="최대키워드갯수" :cloud-opts="클라우드설정" range="달력사용여부 및 최대기간범위" :use-attrs="속성설정" :use-deatil-attrs="상세속성설정여부" :use-sort="정렬사용여부" :view-type="클라우드 / 게시판보기" :use2nd-rk="2차 키워드 사용여부" :use-sort2nd="2차 키워드 정렬 사용여부" :use-legend="범례" :use-attrs-popup="관련정보팝업에서 연관키워드 속성 목록"></tmpl-rkeyword>
```

---

#### Props

|        필수        | Prop                 | 설명                                                                                                                                                                                                                                                    | 타입/값        | Default   |
| :----------------: | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | --------- |
| :heavy_check_mark: | **id**               | 아이디                                                                                                                                                                                                                                                  | `String`       |           |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건                                                                                                                                                                                                                                          | `Object`       |           |
|                    | **keywordLen**       | 최대 키워드 갯수                                                                                                                                                                                                                                        | `Number`       | 50        |
|                    | **cloudOpts**        | 워드 클라우드 옵션<br><pre>{<br> minFont: 11, // 폰트 최소 사이즈(기본: 11)<br> maxFont: 50, // 폰트 최대 사이즈(기본: 50) 차트보다 커질경우 -10px씩 줄여가며 ReBuild <br>}</pre>                                                                       | `Object`       | null      |
|                    | **range**            | 달력사용여부 및 최대기간범위(7, 1M, 1Y)                                                                                                                                                                                                                 | `String`       | null      |
|                    | **useAttrs**         | 속성 사용 여부<br>설정되면 속성 설정 UI 활성<br>'$store.getters.getRkAttrs'에서 설정후에 사용<br><pre>[[{<br> code: '코드',<br> name: '이름',<br> color: '색상',<br> children: [{ code, name, color }]<br>}]]</pre>                                     | `Object`       |           |
|                    | **useDeatilAttrs**   | 속성상세설정 사용 여부 (속성사용시에만 사용 가능)                                                                                                                                                                                                       | `Boolean`      | false     |
|                    | **useSort**          | 1차 키워드 정렬조건(TOP/HOT) 기능 사용여부                                                                                                                                                                                                              | `Boolean`      | true      |
|                    | **useSortValue**     | Top/Hot 시작 설정 값<br>`T` : TOP, `H`: HOT, 없음 : TOP                                                                                                                                                                                                 | `String`       |           |
|                    | **viewType**         | 1차 키워드 보기 설정<br>`null` : 보기 설정 비활성화, 클라우드 보기 고정<br>`1` : 클라우드 보기<br>`2` : 게시판 보기                                                                                                                                     | `String`       | 1         |
|                    | **use2ndRk**         | 2차 연관키워드 사용 여부                                                                                                                                                                                                                                | `Boolean`      | true      |
|                    | **useSort2nd**       | 2차 연관어 Top/Hot 사용여부                                                                                                                                                                                                                             | `Boolean`      | false     |
|                    | **useLegend**        | 범례기능 사용 시, 점유율/순위/사용자설정<br>`share` : 점유율(0\~100% 10단계)<br>`rank` : 순위(1\~3, 4\~6, 7\~10, 11\~)<br>`사용자 순위 설정`<br><pre>[{<br> rank: '순위', // 해당 순위까지(~3위)<br> color: '컬러', // 해당 순위까지의 색상<br>}]</pre> | `String/Array` |           |
|                    | **useAttrsPopup**    | 정보량 클릭시 호출 되는 '관련정보팝업'에서 클라우드가 속성 사용 여부                                                                                                                                                                                    | `Boolean`      | false     |
|                    | **useRank**          | (순위/전체갯수) 사용 여부                                                                                                                                                                                                                               | `Boolean`      | false     |
|                    | **popupCateFilters** | 정보량 클릭시 호출 되는 '관련정보팝업'에서 카테고리 필터를 사용 할 경우 필터를 보냄<br>형식은 [관련정보 팝업 cateFilters](../modal/relinfo/README.md#props) 참고                                                                                        | `Array`        | null      |
|                    | **hideAnalsList**    | 분석대상 박스 숨김 처리                                                                                                                                                                                                                                 | `Boolean`      | false     |
|                    | **hideFunctions**    | ui_function 사용 여부                                                                                                                                                                                                                                   | `Boolean`      | false     |
|                    | **exceptWord**       | 연관키워드 제외<br>형식은 [연관키워드 제외 searchParam](../modal/ex_relation_keyword/index.vue) 참고<br><pre>{ code:'코드', name: '제외 버튼', sc_id:'고유 아이디', reload_id: ['현재 컴포넌트와 함께 리로드되어야할 컴포넌트 sc_id'] }</pre>           | `Object`       | null      |
|                    | **v-model(value)**   | 선택 키워드<br><pre>[{ code, name, ... }, ... ]</pre>                                                                                                                                                                                                   | `Array`        | undefined |
|                    | **isNoData**         | 데이터 없음 강제 설정                                                                                                                                                                                                                                   | `Boolean`      | false     |

---

### Events

|        Event        | 설명                                                                                        | Callback                                             |
| :-----------------: | :------------------------------------------------------------------------------------------ | :--------------------------------------------------- |
|   **excelParams**   | 엑셀 API에 전달할 연관어 검색조건                                                           | `Object`<br>검색조건                                 |
| **excelParams_sec** | 엑셀 API에 전달할 2차 연관어 검색조건                                                       | `Object`<br>검색조건                                 |
|      **click**      | 키워드 클릭시 이벤트 발생<br>(선택시는 발생 하지 않음, 정보량 클릭과 동일한 이벤트 시 발생) | `Object`<br>키워드 정보(관련정보 팝업에 사용될 정보) |
