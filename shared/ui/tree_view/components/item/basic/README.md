# UI - TreeView - Item/Basic

-   TreeView 컴포넌트 노드 아이템 기본 형태
-   트리뷰 노드 내 등록/수정/삭제 사용할 수 없음
-   단순 노드 아이템의 이름, 아이콘, toggle 버튼만 나옴

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

| 파일명 | 타입  | 설명                     |
| ------ | ----- | ------------------------ |
| index  | index | 기본 노드아이템 컴포넌트 |

---

#### Props

|        필수        | Prop              | 설명                              | 타입/값   | Default |
| :----------------: | :---------------- | :-------------------------------- | --------- | ------- |
| :heavy_check_mark: | **value**         | 노드 아이템 정보                  | `Object`  |         |
| :heavy_check_mark: | **maxNode**       | 트리뷰 노드 표현 최대 갯수        | `Number`  | 2       |
|                    | **openFolder**    | 트리뷰 내 열린 폴더의 code값 공유 | `String`  |         |
|                    | **getShowExpand** | 노드 아이템 내부 expand 영역 처리 | `Boolean` | true    |

---

### Events

|     Event     | 설명                  | Callback     |
| :-----------: | :-------------------- | :----------- |
| **nodeClick** | 노드 정보 클릭        | `Object`<br> |
|  **dbClick**  | 노드 정보 더블클릭    | `Object`<br> |
| **openTree**  | 노드 Toggle 처리 결과 | `Object`<br> |
