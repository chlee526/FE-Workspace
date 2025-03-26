# UI - Form - Timepicker

-   시간 선택 UI
-   image.png

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                           |
| ---------- | ----- | ------------------------------ |
| 2023-04-04 | 1.0.0 | Timepicker 패키지 마이그레이션 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```
<template>
    <comp-timepicker
        id="tp"
        class="is-small"
        v-model="time"
        :minutes-set="true"
        :seconds-set="true"
    ></comp-timepicker>
</template>
```

---

#### Props

| 필수 | Prop           | Sync | 설명                                              | 타입/값     | Default |
| :--: | :------------- | :--: | :------------------------------------------------ | ----------- | ------- |
|  ●   | **V-model**    |      | 시간                                              | `String`    |         |
|  ●   | **id**         |      | 아이디                                            | `String`    |         |
|      | **class**      |      | 클래스                                            | `String`    |         |
|      | **minuteEdit** |      | Time사용시 시간(분) 사용 여부                     | `Boolean`   | false   |
|      | **secondEdit** |      | Time사용시 시간(초) 사용 여부                     | `Boolean`   | false   |
|      | **boxMode**    |      | 사용자 인터렉션이 아닌 Box로 오픈된 상태 사용여부 | `Boolean`   | false   |
|      | **disabled**   |      | Disabled                                          | `Atrribute` |         |

---

#### Events

-   지원 이벤트 없음
