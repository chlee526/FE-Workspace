# UI - excel_btn

-   엑셀 다운로드 버튼 컴포넌트
-   컴포넌트 내부에서 getExcel api 통신 후 결과값이 link 이면 즉시 다운, 결과값이 key 이면 EXCEL_LIST 이벤트 호출

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
| 2023-05-24 | 1.0.0 | 엑셀 다운로드 버튼 컴포넌트 개발 |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<!-- 기본 -->
<script>
excelParams: {
    ...{ 엑셀 데이터 요청시, 해당 데이터의 기존 api 값 },
    excel: {
            id: '엑셀 아이디', // sec_01,02... (필수)
            path: '엑셀 여부 및 다운로드 경로', // ex) 메뉴1 > 섹션 1 > 컨텐츠 2
        },

}
</script>

<comp-excel-btn class="클래스명" :excel-params="엑셀 다운로드 파라미터"></comp-excel-btn>
```

---

#### Props

|        필수        | Prop            | 설명                    | 타입/값  | Default |
| :----------------: | :-------------- | :---------------------- | -------- | ------- |
| :heavy_check_mark: | **excelParams** | 엑셀 다운로드 파라미터  | `Object` |         |
|                    | **class**       | 클래스 <br>`'is-small'` | `String` |         |

---

#### Events

|                           Event                            | 설명                                                                  | Callback |
| :--------------------------------------------------------: | :-------------------------------------------------------------------- | :------- |
| **this.$store.dispatch('EXCEL_LIST', { api response 값})** | 컴포넌트 내부에서 api 통신후 key값이 들어오면 엑셀 리스트 이벤트 호출 |          |
