# UTILS - Directive

-   커스텀 디렉티브

### 목차

1. [History](#history)
2. [File](#file)
3. [Directive](#directive)
    1. [click-outside](#click-outside)
    2. [behavior-resize-scroll](#behavior-resize-scroll)
    3. [Sortable](#Sortable)
    4. [Selectable](#Selectable)
    5. [control-aside-width](#control-aside-width)

---

### History

| 일자       | 버전  | 내용                                                |
| ---------- | ----- | --------------------------------------------------- |
| 2023-12-29 | 1.0.0 | control-aside-width 디렉티브 정의                   |
| 2023-12-20 | 1.0.0 | 리스트 선택 디렉티브 정의                           |
| 2023-12-06 | 1.0.0 | 리스트 정렬(drag-drop) 디렉티브 정의                |
| 2023-07-25 | 1.0.0 | click-outside, behavior-resize-scroll 디렉티브 정의 |

---

### File

| 파일명                    | 설명                                                |
| ------------------------- | --------------------------------------------------- |
| selectable > index.js     | 리스트 선택 디렉티브                                |
| sortable > index.js       | 리스트 정렬(drag-drop) 디렉티브                     |
| sortable > style.scss     | 리스트 정렬(drag-drop) 디렉티브에서 참조하는 스타일 |
| click-outside.js          | outside CLICK                                       |
| behavior-resize-scroll.js | Scroll or Resize                                    |
| control-aside-width.js    | main과 aside, resizer로 구성된 페이지 레이아웃 조정 |

---

### Directive

#### Click-Outside

-   컴포넌트 외부 클릭 디렉티브
-   툴팁컨텐츠의 종료 용도
-   이벤트확산을 방지하기 위해 "stop" 사용가능

```html
// 'v-click-outside.stop' : Stack을 이용하게 되며, 외부 클릭시 순차적으로 종료됨. // 'v-click-outside' : 조건없이 이벤트 발생. <component v-click-outside.stop="핸들러"></component>
```

---

#### Behavior-Resize-Scroll

-   부모 엘리먼트의 스크롤 감지 및 윈도우 리사이즈 감지
-   툴팁컨텐츠의 종료 용도

```html
<component v-behavior-resize-scroll="핸들러"></component>
```

---

#### Sortable

-   리스트 정렬 디렉티브(drag-drop)
-   binding value 필수 전달 항목

    -   {String} data :정렬 대상 데이터 목록
    -   {Array} wrapClass : 아이템들의 wrapper 클래스
    -   {Boolean} itemClass : 드래그 아이템 class
    -   {String} targetClass : 드래그 아이템 타겟 class

-   사용법

    -   directive 적용 대상에 'listUpdate' 이벤트 적용 필수
    -   component : return Object {data: 리스트, dragIdx: 드래그 아이템의 인덱스, tgIdx: 이동할 위치의 아이템 인덱스}
    -   element : return CustomEvent(detail)

-   주의 사항

    -   아이템들의 간격 조정을 위한 스타일링시, 드래그 이벤트가 걸려있는 요소에 스타일 적용(\* drop 가이드 라인이 드래그 아이템을 기준으로 아이템들 간격 사이에 위치 \* 간격은 padding 으로 조정)
    -   버추얼 스크롤 사용시 버추얼 라이브러리 속성 중 'estimate-size' 속성에 아이템 평균 높이 값 넣어주어야 함(\* 아이템 sort 후에 버추얼 라이브러리 내에서 스크롤 바 길이 계산이 틀어지는 이슈)

*   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*   드래그 아이템 엘리먼트의 data-\* 속성
*
*   [ data-drag-index ] \*필수
*   data-drag-index="리스트 데이터에서의 인덱스"
*
*   [ data-drag-group ]
*   data-drag-group="그룹명"
*   드래그 아이템 그룹화 할 경우 사용.
*   동일한 그룹명인 아이템들끼리만 이동 가능. 그러나 grp-head 아이템과 child 아이템은 서로 이동 안되며 같은 레벨?의 아이템끼리만 이동 가능
*
*   [ data-grp-head ]
*   data-grp-head="true"
*   같은 그룹명으로 그룹화 되어 있으며, 해당 그룹을 감싸는 상위 부모 아이템에 해당 속성 부여 (\* 트리뷰에서 사용하기 위한 속성)
*   해당 속성이 'true' 인 아이템을 드래그 할 경우 같은 그룹의 하위 아이템들도 같이 이동됨.
*   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

```html
<component v-sortable="{ data: [리스트 데이터], wrapClass: '아이템들의 wrapper 클래스', itemClass: '드래그 아이템 class', targetClass: '드래그 아이템 타겟 class' }" @listUpdate="핸들러;"></component>

<!-- 예시 코드 (기본) -->
<div class="list-wrap" @listUpdate="evtUpdate" v-sortable="{ data: listData, wrapClass: 'list-wrap', itemClass: 'is-draggable' }">
    <div v-for="(item, index) in listData" :key="`${item}_${index}`" class="is-draggable" :data-index="index" :data-drag-group="item.groupName" :data-grp-head="item.grpHead && 'true'">
        <div class="item">
            {{ item.name }}
            <button v-if="getRemove" class="btn_list_del" title="삭제" @click="evt_remove(item)">삭제</button>
        </div>
    </div>
</div>

<!-- 예시 코드 (버추얼) -->
<virtual-list :data-sources="listData" :data-key="'name'" :data-component="{}" wrap-class="list-wrap" :estimate-size="30" @listUpdate="evtUpdate" v-sortable="{ data: listData, wrapClass: 'list-wrap', itemClass: 'is-draggable', targetClass: 'title-wrap' }">
    <template v-slot:item="{ index, item }">
        <div class="is-draggable" :data-index="index" :data-drag-group="item.groupName" :data-grp-head="item.grpHead && 'true'">
            <component v-if="item" :is="component" :value="item" :itemIndex="index" :disabled="getDisabled" @add="evt_add" @remove="evt_remove" @click="evt_click" @confirm="evt_confirm"></component>
        </div>
    </template>
</virtual-list>
```

---

#### Selectable

-   리스트 정렬 디렉티브(drag-drop)
-   selectable.js 커스텀

    -   https://github.com/Mobius1/Selectable/tree/master

-   binding value 필수 전달 항목

    -   {Array} data : select 대상 데이터 목록
    -   {String} target : select 대상이 될 아이템의 class 또는 tagName
    -   {Boolean} selectable : selectable 사용여부
    -   {String} id : directive 호출 고유 아이디
    -   {Object} classes : 커스텀 클래스
    -   {String} dataIndexKey : data에서 select된 값을 찾아올 키 이름(default: null -> index로 필터링)

-   주의 사항
    -   sortable과 함께 사용할 수 없음
-   초기화 방법
    -   디렉티브 적용 대상에 ref 적용
    -   refs 대상의 $el에 접근해 ResetSelectedValue 호출
    -   예시 : this.$refs['virtual-list'].$el.ResetSelectedValue();

*   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*   selectable 아이템 엘리먼트의 data-\* 속성
*
*   [ data-select-key ] \*필수
*   data-select-key="고유값"
*   ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

```html
<component v-selectable="{ data: [리스트 데이터], target: [select 대상이 될 아이템의 class 또는 tagName], selectable: [selectable 사용여부], id: [directive 호출 고유 아이디], classes: {커스텀 클래스}, dataIndexKey: 'key name'}" @selectedUpdate="핸들러;"></component>

<!-- 예시 코드 (기본) -->
<div @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.list-item', selectable, id }">
    <div v-for="(item, index) in listData" :key="`${item}_${index}`" class="list-item" :data-select-key="index">
        <div class="item">
            {{ item.name }}
            <button v-if="getRemove" class="btn_list_del" title="삭제" @click="evt_remove(item)">삭제</button>
        </div>
    </div>
</div>

<!-- 예시 코드 (커스텀 클래스 적용) -->
<div @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.list-item', selectable, id, classes : {lasso : 'custom-lasso', selected: 'custom-selected'} }">
    <div v-for="(item, index) in listData" :key="`${item}_${index}`" class="list-item" :data-select-key="index">
        <div class="item">
            {{ item.name }}
            <button v-if="getRemove" class="btn_list_del" title="삭제" @click="evt_remove(item)">삭제</button>
        </div>
    </div>
</div>
```

#### control-aside-width

-   main과 aside, resizer로 구성된 페이지 레이아웃 조정
-   aside의 width를 px 단위로 조정한다.
-   최대값은 content 영역의 50%에 해당하는 px값
-   최소값은 inline-style로 지정된 min-width값 (미지정시 content 영역의 25%에 해당하는 px값)
-   초기 width값은 content 영역의 25%에 해당하는 px값
-   필요시 min/max는 inline-style로 조정가능

-   binding value 전달 항목
    -   {String} menu (필수) 각 메뉴별 aside 넓이 개인화 저장을 위해 메뉴명을 전달받아야함
    -   {Boolean} isClosed aside 강제 open/close용도(연결된 변수명 원하는 대로 지정 가능)

```html
<template>
    <div>
        <main></main>
        <aside v-control-aside-width="{ menu: 메뉴명, isClosed: 변수명 }" style="min-width: 390px; max-width: 800px"></aside>
    </div>
</template>
```
