# Templates - IncGenderage

-   라이프사이클 템플릿

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
| 2023-04-06 | 1.0.0 | IncGenderage 패키지 마이그레이션 |

---

#### File

| 파일명              | 타입     | 설명                                     |
| ------------------- | -------- | ---------------------------------------- |
| index               | index    | 공유 컴포넌트 메인                       |
| LifecycleWordclouds | 컴포넌트 | 라이프사이클 컴포넌트 (4존 워드클라우드) |
| Gender              | 컴포넌트 | 성별/연령별 점유율 - 성별 컴포넌트       |
| Age                 | 컴포넌트 | 성별/연령별 점유율 - 연령 컴포넌트       |

---

#### Useage

```vue
<template>
    <!-- 2뎁스 -->
    <tmpl-inc-genderage id="아이디" :common-search-opts="공통 검색 조건" class="is-2dp"></tmpl-inc-genderage>

    <!-- SLOT형 - 3뎁스 -->
    <tmpl-inc-genderage id="아이디" :common-search-opts="공통 검색 조건">
        <template slot="bottom">
            <div class="ui_row is-2dp">
                <div class="wrap is-cols-pad">
                    <div class="ui_box is-3dp" style="height: 100%">
                        <div class="header">
                            <div class="wrap">
                                <h5>
                                    <span>인기 검색어 순위변화</span>
                                </h5>
                            </div>
                        </div>
                        <div class="content"></div>
                    </div>
                </div>
            </div>
        </template>
    </tmpl-inc-genderage>

    <!-- 라이프사이클 단일 템플릿 -->
    <tmpl-inc-genderage id="아이디" :common-search-opts="공통 검색 조건" :only-lifecycle="true"></tmpl-inc-genderage>
</template>
```

---

#### Props

|        필수        | Prop                 | 설명                                                          | 타입/값   | Default |
| :----------------: | :------------------- | :------------------------------------------------------------ | --------- | ------- |
| :heavy_check_mark: | **id**               | 아이디                                                        | `String`  |         |
| :heavy_check_mark: | **commonSearchOpts** | 공통 검색 조건                                                | `Object`  |         |
|                    | **class**            | 클래스명<br>2뎁스 템플릿 사용할 경우 클래스명에 'is-2dp' 전달 | `String`  |         |
|                    | **onlyLifecycle**    | 라이프사이클 단일 템플릿 사용 여부                            | `Boolean` | false   |
|                    | **isNoData**         | 데이터 없음 강제 설정                                         | `Boolean` | false   |

---

#### Events

-   Events 없음
