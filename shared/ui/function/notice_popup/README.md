# UI - Function - Notice Popup

-   Notice Popup UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                   |
| ---------- | ----- | ---------------------- |
| 2023-07-05 | 1.0.0 | Notice Popup 신규 개발 |

---

#### File

| 파일명          | 타입     | 설명               |
| --------------- | -------- | ------------------ |
| index           | index    | 공유 컴포넌트 메인 |
| NoticePopupItem | 컴포넌트 | 공지 팝업 컴포넌트 |

---

#### Useage

```vue
<!-- @shared > layout > function 에서 프로젝트 env 환경설정(VUE_APP_NOTICE_POPUP)에 따라 
    this.$store.dispatch('NOTICE_POPUP') 실행. getPopupList api 통신후 팝업이 있을 경우 this.$store.dispatch('NOTICE_POPUP_OPEN') 실행.
-->
<script>
// 기본 공지팝업 리스트 불러오기
this.$store.dispatch('NOTICE_POPUP');

// 공지 팝업 열기
this.$store.dispatch('NOTICE_POPUP_OPEN');

// 공지 팝업 닫기
this.$store.dispatch('NOTICE_POPUP_CLOSE');
</script>
```

---

#### Props

-   Props 없음

---

#### Events

|               Event               | 설명             | Callback |
| :-------------------------------: | :--------------- | :------- |
| **EventBus - NOTICE_POPUP_OPEN**  | 공지 팝업 보이기 |          |
| **EventBus - NOTICE_POPUP_CLOSE** | 공지 팝업 제거   |          |
