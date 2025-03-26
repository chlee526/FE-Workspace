# UI - Function - Modal

-   Modal UI

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                    |
| ---------- | ----- | ------------------------------------------------------- |
| 2024-11-14 | 1.1.0 | 모듈에 name 속성 추가, name으로 모듈에 대한 고유성 부여 |
| 2023-04-06 | 1.0.0 | Modal 패키지 마이그레이션                               |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

#### Useage

```vue
<script>
// 기본
this.$store.dispatch('Modal 액션', ['Modal 이름', { 파라미터 }]);

// 관련정보 Modal 열기
this.$store.dispatch('MODAL_OPEN', ['RELINFO', { 파라미터 }]);

// 관련정보 Modal 닫기
this.$store.dispatch('MODAL_CLOSE', 'RELINFO', { 파라미터 });
</script>
```

---

#### Props

| Props | 설명                                  |               타입/값                | default |
| :---: | :------------------------------------ | :----------------------------------: | :-----: |
| name  | name을 할당해 모듈에 대한 고유성 부여 | `String`<br> 'null' or 'contentMode' |  null   |

---

#### Events

|           Event            | 설명          | Callback |
| :------------------------: | :------------ | :------- |
| **EventBus - MODAL_OPEN**  | 모달창 보이기 |          |
| **EventBus - MODAL_CLOSE** | 모달창 제거   |          |
