# UI - Form - Datepicker

-   날짜/시간 선택 UI
-   image.png

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                           |
| ---------- | ----- | ------------------------------ |
| 2023-04-04 | 1.0.0 | Datepicker 패키지 마이그레이션 |

---

### File

| 파일명             | 타입     | 설명                          |
| ------------------ | -------- | ----------------------------- |
| index              | index    | 공유 컴포넌트 메인            |
| DatepickerCalendar | 컴포넌트 | 달력 - 일/주 선택             |
| DatepickerSelector | 컴포넌트 | 달력 - 분기/반기/월/년도 선택 |

---

### Useage

```vue
<template>
    // 단일 날짜 선택
    <comp-datepicker id="dp" class="is-small" :s_date.sync="sdate" :min_date.sync="min_date" :max_date="max_date"></comp-datepicker>

    // 범위 날짜 선택
    <comp-datepicker id="dp" c_type="day" :c_type_opts="['day', 'week', 'month']" class="is-small" :s_date.sync="sdate" :e_date.sync="edate" range="3M" :minute-edit="false" :second-edit="false" :date_grp="[0, 7, 30, '1M', '3M', '1Y']"></comp-datepicker>
</template>
```

---

#### Props

|        필수        | Prop            |  Sync  | 설명                                                                                                            | 타입/값                                                  | Default                                             |
| :----------------: | :-------------- | :----: | :-------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------- |
| :heavy_check_mark: | **id**          |        | 아이디                                                                                                          | `String`                                                 |                                                     |
|                    | **class**       |        | 클래스                                                                                                          | `String`                                                 |                                                     |
| :heavy_check_mark: | **s_date**      | :link: | 시작날짜/시간                                                                                                   | `Object`<br>{date: '2022-01-01', time: '00:00:00'}       | {date: 현재날짜}                                    |
| :heavy_check_mark: | **e_date**      | :link: | 종료날짜/시간                                                                                                   | `String`                                                 | {date: 현재날짜}                                    |
|                    | **min_date**    | :link: | 이동 가능 최소 날짜                                                                                             | `String`                                                 | null                                                |
|                    | **max_date**    | :link: | 이동 가능 최대 날짜                                                                                             | `String`                                                 | "현재날짜"                                          |
|                    | **c_type**      | :link: | 달력 타입(일/주/월/분기/반기/년)                                                                                | `String`                                                 | "day"                                               |
|                    | **c_type_opts** |        | 달력 타입 옵션                                                                                                  | `Array`<br>["day", "week"...]                            | ["day", "week", "month", "quarter", "half", "year"] |
|                    | **range**       |        | 범위 달력으로 사용시, 최대 이동 기간<pre>숫자: 일<br>W: 주<br>M: 개월<br>Y: 년</pre><br/> null = 범위 지정 안함 | `String`                                                 | "1M"                                                |
|                    | **minuteEdit**  |        | Time사용시 시간(분) 사용 여부                                                                                   | `Boolean`                                                | false                                               |
|                    | **secondEdit**  |        | Time사용시 시간(초) 사용 여부                                                                                   | `Boolean`                                                | false                                               |
|                    | **date_grp**    |        | 퀵 날짜 그룹<pre>BM: 개월<br>M: 월<br>BY: 년<br>Y: 년도</pre>                                                   | `Array`<br>["1", "7", "1BM", "1M", "1BY", "1Y"]          | nul`                                                |
|                    | **completeBtn** |        | 적용 버튼 사용 여부                                                                                             | `String`                                                 | "확인"                                              |
|                    | **disabled**    |        | Disabled                                                                                                        | `Atrribute`                                              |                                                     |
|                    | **p_date**      |        | 이전기간 사용시, 현재 기간 날짜                                                                                 | `Object`<br>{s_date: '2022-01-01', e_date: '2022-01-01'} |                                                     |
|                    | **pDateChk**    | :link: | 이전기간 사용시, '진전동기간' 사용여부                                                                          | `Boolean`                                                |                                                     |

---

### Events

|      Event       | 설명                             | Callback |
| :--------------: | :------------------------------- | :------- |
| **confirmClick** | 활성화된 버튼 클릭시 이벤트 발생 |          |
