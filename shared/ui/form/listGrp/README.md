# UI - Form - List Group

-   특정유형의 목록을 관리 하기 위한 Group관리 컴포넌트
-   Slot형태로 전달하거나, Data형태로 전달가능
-   Data형태로 전달시 Component설정이 가능하며, 전달되지 않을 시 기본 형태로 제공

---

![image](/uploads/2096dc07915bce4ffabb24951c44fb01/image.png)
![image](/uploads/f4b15688773f3ca0ebb9aa06f7ab8d69/image.png)

---

## 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                               |
| ---------- | ----- | -------------------------------------------------- |
| 2023-12-20 | 1.0.0 | 버추얼 스크롤 기능 추가 + v-sortable 디렉티브 적용 |
| 2023-07-24 | 1.0.0 | 정렬 라이브러리 JqueryUI -> vuedraggable 변경      |
| 2023-07-20 | 1.0.0 | 최초 기능 추가                                     |

---

#### File

| 파일명        | 타입  | 설명                   |
| ------------- | ----- | ---------------------- |
| index         | index | 공유 컴포넌트 메인     |
| sample_item   |       | 템플릿 컴포넌트 샘플 1 |
| sample_item_2 |       | 템플릿 컴포넌트 샘플 2 |

---

### Useage

```html
<!-- Slot 형태 -->
<comp-list>
    <template v-slot:default>
        <button class="ui_btn"><span class="txt">버튼 1</span></button>
        <button class="ui_btn"><span class="txt">버튼 2</span></button>
        <button class="ui_btn"><span class="txt">버튼 3</span></button>
        // ... 다른형태도 가능
    </template>
</comp-list>

<!-- Data 형태 -->
<comp-list v-model="데이터" :component="템플릿 컴포넌트" @add="추가콜백함수" @remove="삭제콜백함수" @click="클릭콜백함수" :sortable="정렬사용여부"></comp-list>
<script>
    데이터 = [
        { name: '이름(필수)', ... },
        ...
    ];
</script>
```

---

### Props

| 필수 | Prop                | 설명                                                      | 타입/값                                         | Default |
| :--: | :------------------ | :-------------------------------------------------------- | :---------------------------------------------- | :------ |
|      | **class**           | 클래스                                                    | `String`<br>`'is-small'/'is-large'/'is-xlarge'` |         |
|      | **v-model**         | 데이터 사용시<br><pre>[ { name: "이름",... }, ... ]</pre> | `Vue Variables`                                 |         |
|      | **component**       | 전달 컴포넌트(템플릿)                                     | `Vue Component`                                 |         |
|      | **sortable**        | 정렬 사용시                                               | `Boolean`                                       | false   |
|      | **sortTargetClass** | 정렬 타겟 클래스                                          | `String`                                        | false   |
|      | **selectable**      | selectable을 사용시                                       | `Boolean`                                       | false   |
|      | **dataIndexKey**    | selectable 사용시 index 외 data-index로 설정할 key name   | `String`                                        | null    |
|      | **id**              | selectable을 사용하기 위해 필수                           | `String`                                        |         |
|      | **estimateSize**    | 버추얼 스크롤 계산을 위한 아이템 높이값                   | `Number`                                        |         |
|      | **keeps**           | 버추얼 스크롤 사용시 기본 렌더링 아이템 개수              | `Number`                                        |         |

---

### Events

|       Event        | 설명                                                       | Callback                                  |
| :----------------: | :--------------------------------------------------------- | :---------------------------------------- |
|     **click**      | 아이템 클릭시                                              |                                           |
|      **add**       | "추가" 기능 사용시, 해당 이벤트 사용, 버튼은 자동 적용<br> |                                           |
|     **remove**     | "삭제" 기능 사용시, 해당 이벤트 사용, 버튼은 자동 적용<br> |                                           |
|     **update**     | 데이터 업데이트(sort, 아이템 이름 변경)                    |   `Array`<br> '업데이트 된 리스트 데이터' |
| **selectedUpdate** | 선택된 데이터 리스트 업데이트                              |   `Array`<br> '선택된 데이터 리스트'      |
