# UI - TreeView - Item/Custom

-   TreeView 컴포넌트 노드 아이템 커스텀 컴포넌트 형태
-   트리뷰 외부에서 전달해주는 컴포넌트를 가져다 사용하는 형태
-   아이템의 기능은 컴포넌트를 전달해주는 프로젝트에서 처리

### 목차

1. [History](#history)
2. [File](#file)
3. [Useage](#useage)
4. [Props](#props)
5. [Events](#events)

---

### History

| 일자       | 버전  | 내용                                                                           |
| ---------- | ----- | ------------------------------------------------------------------------------ |
| 2024-01-15 | 2.0.0 | 컴포넌트 구조화 재정의 (slot 형태 => 인스턴스 화) 및 컴포넌트 내 디렉토리 정리 |
| 2023-11-21 | 1.0.0 | CJ 그룹 매체 영향력 페이지 사용하기 위한 트리뷰 형태 생성                      |

---

#### File

| 파일명 | 타입  | 설명                       |
| ------ | ----- | -------------------------- |
| index  | index | 커스텀 노드아이템 컴포넌트 |

---

#### Props

|        필수        | Prop              | 설명                                                                                                                                                                     | 타입/값   | Default |
| :----------------: | :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| :heavy_check_mark: | **value**         | 노드 아이템 정보                                                                                                                                                         | `Object`  |         |
|                    | **maxNode**       | 트리뷰 노드 표현 최대 갯수                                                                                                                                               | `Number`  | 2       |
|                    | **nodeInstance**  | 트리뷰 내 전달 할 component/event/prop를 정의<br/>EX : {component : 컴포넌트 객체 , event: 하위 노드에서 호출할 이벤트 함수 , 하위 노드에 전달할 상위 노드의 props 정보} | `Object`  |         |
|                    | **editType**      | 트리뷰 edit 기능 (등록/수정/삭제) 사용 여부                                                                                                                              | `Boolean` | true    |
| :heavy_check_mark: | **openFolder**    | 트리뷰 내 열린 폴더의 code값 공유                                                                                                                                        | `String`  |         |
|                    | **getShowExpand** | 노드 아이템 내부 expand 영역 처리                                                                                                                                        | `Boolean` | true    |

---

### Events

|      Event      | 설명               | Callback     |
| :-------------: | :----------------- | :----------- |
| **evt_confirm** | 노드 정보 추가     | `Object`<br> |
| **evt_modify**  | 노드 정보 수정     | `Object`<br> |
| **evt_delete**  | 노드 정보 삭제     | `Object`<br> |
|  **nodeClick**  | 노드 정보 클릭     | `Object`<br> |
|   **dbClick**   | 노드 정보 더블클릭 | `Object`<br> |
|  **openTree**   | 노드 Toggle 결과   | `Object`<br> |

---

### Methods

|      Event      | 설명      | Param |
| :-------------: | :-------- | :---- |
| **evt_confirm** | 노드 추가 |       |
| **evt_modify**  | 노드 수정 |       |
| **evt_delete**  | 노드 삭제 |       |
|  **nodeClick**  | 노드 클릭 |       |
