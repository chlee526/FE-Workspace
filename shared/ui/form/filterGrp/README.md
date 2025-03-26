# UI - Form - FIlter Group

-   그룹형 필터 모음
-   다수의 필터를 한데 모아 툴팁 UI로 제공

---

![image](/uploads/60252d9ec883874ccbddbf11990b16ad/image.png)
![image](/uploads/e05ff07c16afed114b443f461c84ca94/image.png)

---

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                                   |
| ---------- | ----- | ---------------------------------------------------------------------- |
| 2023-12-20 | 1.0.0 | Props > enabled, popoverLabel 추가<br>Props > isBoard, noIconShow 제거 |
| 2023-12-18 | 1.0.0 | Props > confirmLabel(컨펌 버튼 라벨 변경) 추가                         |
| 2023-11-29 | 1.0.0 | Props > useBtns 추가                                                   |
| 2023-11-13 | 1.0.0 | open/close 이벤트 추가                                                 |
| 2023-11-08 | 1.0.0 | custom Slot 확장                                                       |
| 2023-07-20 | 1.0.0 | cancel 이벤트 추가                                                     |
| 2023-07-04 | 1.0.0 | 최초 기능 추가                                                         |

---

#### File

| 파일명 | 타입  | 설명               |
| ------ | ----- | ------------------ |
| index  | index | 공유 컴포넌트 메인 |

---

### Useage

```vue
// 기본
<comp-filter-grp>
    <template v-slot:title>제목</template>
    // 필터(툴팁 컨텐츠)
    <template v-slot:items>
        // 아래 형식으로 다수 제공 가능
        <dl>
            <dt>
                <strong>필터링</strong>
            </dt>
            <dd>필터링 컴포넌트</dd>
        </dl>
    </template>
</comp-filter-grp>

// 커스텀
<comp-filter-grp>
    <template v-slot:custom>제목</template>
    // 필터(툴팁 컨텐츠)
    <template v-slot:items>
        // 아래 형식으로 다수 제공 가능
        <dl>
            <dt>
                <strong>필터링</strong>
            </dt>
            <dd>필터링 컴포넌트</dd>
        </dl>
    </template>
</comp-filter-grp>
```

---

### Props

| 필수 | Prop                  | 설명                                              | 타입/값   | Default |
| :--: | :-------------------- | :------------------------------------------------ | --------- | ------- |
|      | **enabled**           | 기능 작동 여부(false인경우 기능이 멈춤)           | `Boolean` | true    |
|      | **disabled**          | 미사용 처리                                       | `Boolean` |         |
|      | **disableConfirmBtn** | 적용 버튼 비활성화 여부(강제 비활성화 시 사용)    | `Boolean` | false   |
|      | **confirlLabel**      | 적용 버튼 라벨명                                  | `String`  | '적용'  |
|      | **pos**               | popover 오버랩 위치 설정                          | `String`  | BC      |
|      | **popoverLabel**      | popover 라벨명(할당 시 popover에 title 강제 할당) | `String`  | ''      |
|      | **getNoIconWrapPos**  | popover의 포지션 강제 할당                        | `Object`  |         |
|      | **useBtns**           | popover의 버튼 영역 사용 여부                     | `Boolean` | true    |

---

### Events

|    Event    | 설명                                                 | Callback |
| :---------: | :--------------------------------------------------- | :------- |
| **confirm** | "적용" 버튼 사용시, 해당 이벤트 사용<br>             |          |
| **cancel**  | 취소시, 해당 이벤트 사용<br>                         |          |
| **remove**  | 삭제이벤트 할당 시 버튼 보임, 삭제시 이벤트 호출<br> |          |
|  **open**   | Modal Open                                           |          |
|  **close**  | Modal Close                                          |          |
