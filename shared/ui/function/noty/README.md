# UI - function - noty

-   NOTY

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [종류](#종류)
5. [버튼](#버튼)

---

### History

| 일자       | 버전  | 내용                                 |
| ---------- | ----- | ------------------------------------ |
| 2023-06-02 | 1.0.0 | NOTY_CLOSE_ALL - 전체 종료 기능 추가 |
| 2023-04-06 | 1.0.0 | Dialog 마이그레이션                  |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
$store.dispatch("종류", "내용")
$store.dispatch("종류",["내용", [{name: "버튼이름", click: 클릭 콜백 함수 }, {name: "버튼이름", click: 클릭 콜백 함수 }]])

<!-- 일반 -->
<button @click="$store.dispatch("종류", "내용")">버튼</button>

<!-- 자동종료 없음 -->
<button @click="$store.dispatch("종류", ["내용", "아이디"])">버튼</button>

<!-- 버튼 포함 -->
<button @click="$store.dispatch("종류", ["내용", [{name: "버튼이름", click: 클릭 콜백 함수 }]])">버튼</button>

<!-- 멀티 버튼 포함 -->
<button @click="$store.dispatch("종류", ["내용", [{name: "버튼이름", click: 콜백클릭 콜백 함수함수 }, {name: "버튼이름", click: 클릭 콜백 함수 }]])">버튼</button>

<!-- 강제종료 -->
<button @click="$store.dispatch("NOTY_CLOSE", "아이디")">버튼</button>

<template>
    <div id="notification" :class="'is-pos-' + pos">
        {{ pos.indexOf('T') > 0 }}
        <transition-group :name="pos.indexOf('T') > 0 ? 'fade_posy_notification_top' : 'fade_posy_notification_bottom'" tag="div" class="wrap" v-on:before-leave="beforeLeave">
            <section class="item" :class="'is-' + $item.type" v-for="($item, $idx) in stack" :key="$item.id" :data-id="$item.id">
                <div>
                    <span v-html="$item.txt"></span>
                    <template v-if="$item.btns">
                        <button v-for="($item2, $idx) in $item.btns" @key="'btn_' + $idx" @click="evt_btnClick($item2, $item.id)">{{ $item2.name }}</button>
                    </template>
                </div>
            </section>
        </transition-group>
    </div>
</template>
```

#### 종류

| 종류              | 설명                                     | 타입/값  | Default |
| ----------------- | ---------------------------------------- | -------- | ------- |
| NOTY_INFO         | 기본                                     | `String` |         |
| NOTY_ERR          | 에러                                     | `String` |         |
| NOTY_COM          | 완료/확인                                | `String` |
| NOTY_INFO_LONG    | 정보(자동종료 없음)                      | `String` |
| NOTY_ERR_LONG     | 에러/실패(자동종료 없음)                 | `String` |
| NOTY_COM_LONG     | 완료/확인(자동종료 없음)                 | `String` |
| NOTY_INFO_CONFIRM | 정보(버튼포함)                           | `String` |
| NOTY_ERR_CONFIRM  | 에러/실패(버튼포함)                      | `String` |
| NOTY_COM_CONFIRM  | 완료/확인(버튼포함)                      | `String` |
| NOTY_CLOSE        | 강제 종료, ID를 할당 후 ID를 통해서 제거 | `String` |
| NOTY_CLOSE_ALL    | 전체 종료                                | `String` |

---

### 내용

| 종류 | 설명      | 타입/값  | Default |
| ---- | --------- | -------- | ------- |
| 내용 | Noty 내용 | `String` |

---

### 버튼

| 종류  | 설명           | 타입/값                       | Default |
| ----- | -------------- | ----------------------------- | ------- |
| name  | 버튼 이름      | `Object`                      |
| click | 클릭 콜백 함수 | `Function`<br>`(name, close)` |

---

#### Props

| 필수 | Prop    | 설명           | 타입/값               | Default |
| :--: | :------ | :------------- | :-------------------- | :------ |
|      | **pos** | noty 위치 설정 | `String`<br>`L/R T/B` | 'RT'    |

---
