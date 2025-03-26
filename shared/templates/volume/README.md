# Templates - Volume

-   정보량 템플릿

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                       |
| ---------- | ----- | -------------------------- |
| 2025-01-08 | 1.0.0 | isNoData Prop 추가         |
| 2023-04-06 | 1.0.0 | Volume 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<template>
    <!-- 기본 -->
    <tmpl-volume class="is-2dp" :common-search-opts="topSearchDatas"></tmpl-volume>

    <!-- SLOT형 -->
    <!-- 박스형태 그대로 사용할 경우, Header부분을 Slot으로 제공 -->
    <tmpl-volume id="아이디" class="ui_box 기본 클래스명" :common-search-opts="공통검색조건">
        <template v-slot:header>
            <div class="header">
                <div class="wrap">
                    <h4>
                        <span>전체정보량</span>
                        <div class="sub_title">
                            <span title="헤더 SLOT" class="keyword">헤더 SLOT</span>
                        </div>
                    </h4>
                </div>
            </div>
        </template>
    </tmpl-volume>
</template>
```

---

#### Props

|        필수        | Prop                 | 설명                                                                                  | 타입/값   | Default |
| :----------------: | :------------------- | :------------------------------------------------------------------------------------ | --------- | ------- |
| :heavy_check_mark: | **id**               | 아이디                                                                                | `String`  |         |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건                                                                        | `Object`  |         |
|                    | **template**         | 템플릿 번호                                                                           | `String`  | 1       |
|                    | **label**            | 라벨 텍스트                                                                           | `String`  | 정보량  |
|                    | **useAttrs**         | 관련정보 팝업 연결 시 연관어 속성 사용할 때 전달                                      | `Array`   | null    |
|                    | **analsTitle**       | 분석대상 있는 경우 사용 <br> <pre>{ code: '코드', name: '이름', color: '색상' }</pre> | `Object`  |         |
|                    | **headerDisabled**   | 헤더영역 미사용                                                                       | `Boolean` | false   |
|                    | **isNoData**         | 데이터 없음 강제 설정                                                                 | `Boolean` | false   |

---

#### Events

-   Events 없음
