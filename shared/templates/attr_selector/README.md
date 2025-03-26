# Templates - AttrSelector

-   분석대상 선택 및 전체 정보량 컴포넌트
-   좌/우 선택형인 Template 1번, 상/하 선택형인 Template 2번
-   1~10개까지 선택 아이템 갯수 설정 가능
-   Template 2번에서만, Fetch 데이터에 p_data(이전기간데이터), factor_per(증감률)가 존재하면 증감이 표기됨

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                             |
| ---------- | ----- | -------------------------------- |
| 2023-04-06 | 1.0.0 | AttrSelector 패키지 마이그레이션 |

---

#### File

| 파일명              | 타입     | 설명                     |
| ------------------- | -------- | ------------------------ |
| index               | index    | 공유 컴포넌트 메인       |
| AttrSelectorList    | 컴포넌트 | AttrSelector - 선택 목록 |
| AttrSelectorSelList | 컴포넌트 | AttrSelector - 선택 결과 |

---

#### Useage

```vue
<!-- 기본 -->
<tmpl-attr_selector id="아이디" :common-search-opts="공통검색조건" :attr-list="분석대상목록" :max-sel-len="최대선택갯수" template="1" v-model="선택아이템"></tmpl-attr_selector>
```

---

#### Props

|        필수        | Prop                 | 설명                                                                                                                        | 타입/값          | Default |
| :----------------: | :------------------- | :-------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| :heavy_check_mark: | **id**               | 아이디                                                                                                                      | `String`         |         |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건                                                                                                              | `Object`         |         |
| :heavy_check_mark: | **template**         | 템플릿 번호                                                                                                                 | `String`         |         |
| :heavy_check_mark: | **attrList**         | 분석대상 목록<br><pre>[ { code: '코드', name: '이름' }, ... ]</pre>                                                         | `Array`          | null    |
| :heavy_check_mark: | **maxSelLen**        | 최대선택갯수<br>1~10개까지 설정 가능<br>1개: Radio로 설정<br>1개 이상 : Checkbox로 설정(토글)<br>                           | `Array`          | null    |
|                    | **fetchAttrs**       | Fetch > grp_sub 항목 설정<br><pre>{ type: '범례(그래프)기준', code: '차트 출력시 그래프 정의(여러개 콤마(,)로 구분)'}</pre> | `Object`         | null    |
|                    | **v-model(value)**   | v-model 연결                                                                                                                | `Vue Variablest` | null    |

---

#### Events

-   Events 없음
