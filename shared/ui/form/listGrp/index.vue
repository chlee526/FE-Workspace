<template>
    <div class="ui_list" :class="[{ 'is-remove': getRemove }, { 'is-virtual': listData?.length }]">
        <div class="wrap">
            <slot></slot>

            <template v-if="listData">
                <template v-if="!component">
                    <!-- 정렬 사용 -->
                    <virtual-list v-if="sortable" ref="virtual-list" class="virtual-list" :data-sources="listData" :data-key="'name'" :estimate-size="estimateSize && estimateSize" :keeps="keeps && keeps" :data-component="{}" wrap-class="list-wrap" @listUpdate="evtUpdate" v-sortable="{ data: listData, wrapClass: 'list-wrap', itemClass: 'list-item', targetClass: sortTargetClass }" @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.list-item', selectable, id, dataIndexKey }">
                        <template v-slot:item="{ index, item }">
                            <div class="list-item" :data-index="index" :data-select-key="dataIndexKey ? item[dataIndexKey] : index">
                                <div class="item">
                                    {{ item.name }}
                                    <button v-if="getRemove" class="btn_list_del" title="삭제" @click="evt_remove(item)">삭제</button>
                                </div>
                            </div>
                        </template>
                    </virtual-list>
                    <!-- 정렬 미사용 -->
                    <virtual-list v-else ref="virtual-list" class="virtual-list" :data-sources="listData" :data-key="'name'" :estimate-size="estimateSize && estimateSize" :keeps="keeps && keeps" :data-component="{}" wrap-class="list-wrap" @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.list-item', selectable, id, dataIndexKey }">
                        <template v-slot:item="{ index, item }">
                            <div class="list-item" :data-index="index" :data-select-key="dataIndexKey ? item[dataIndexKey] : index">
                                <div class="item">
                                    {{ item.name }}
                                    <button v-if="getRemove" class="btn_list_del" title="삭제" @click="evt_remove(item)">삭제</button>
                                </div>
                            </div>
                        </template>
                    </virtual-list>
                </template>

                <!-- Component(Template) 전달 형태 -->
                <template v-else>
                    <!-- 정렬 사용 -->
                    <virtual-list v-if="sortable" ref="virtual-list" class="virtual-list" :data-sources="listData" :data-key="'name'" :data-component="{}" :estimate-size="estimateSize && estimateSize" :keeps="keeps && keeps" wrap-class="list-wrap" @listUpdate="evtUpdate" v-sortable="{ data: listData, wrapClass: 'list-wrap', itemClass: 'comp-item', targetClass: sortTargetClass }" @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.comp-item', selectable, id, dataIndexKey }">
                        <template v-slot:item="{ index, item }">
                            <div class="comp-item" :data-index="index" :data-select-key="dataIndexKey ? item[dataIndexKey] : index">
                                <component v-if="item" :is="component" :value="item" :itemIndex="index" :disabled="getDisabled" @add="evt_add" @remove="evt_remove" @click="evt_click" @confirm="evt_confirm"></component>
                            </div>
                        </template>
                    </virtual-list>
                    <!-- 정렬 미사용 -->
                    <virtual-list v-else ref="virtual-list" class="virtual-list" :data-sources="listData" :data-key="'name'" :data-component="{}" :estimate-size="estimateSize && estimateSize" :keeps="keeps && keeps" wrap-class="list-wrap" @selectedUpdate="evtSelectedUpdate" v-selectable="{ data: listData, target: '.comp-item', selectable, id, dataIndexKey }">
                        <template v-slot:item="{ index, item }">
                            <div class="comp-item" :data-index="index" :data-select-key="dataIndexKey ? item[dataIndexKey] : index">
                                <component v-if="item" :is="component" :value="item" :data="item" :itemIndex="index" :disabled="getDisabled" @add="evt_add" @remove="evt_remove" @click="evt_click" @confirm="evt_confirm"></component>
                            </div>
                        </template>
                    </virtual-list>
                </template>
                <!-- 추가 버튼 -->
                <button v-if="getAdd" class="ui_btn btn_add ui_ac" title="추가" :disabled="getDisabled" @click="evt_add">추가</button>
            </template>
        </div>
    </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';

export default {
    name: 'comp-list',
    data() {
        return {
            isDragging: false,
            listData: structuredClone(this.datas),
            dragStartElm: null,
            dragOverElm: null,
            dragEnterElm: null,
            mouseYPos: 0,
            direction: '',
            dragItemIndex: null,
            dragGroup: '',
        };
    },
    props: {
        datas: { default: null },
        component: { type: Object }, // Component형태
        sortable: { type: Boolean }, // 정렬 사용 여부
        sortTargetClass: { type: String }, // 정렬 타겟 클래스
        selectable: { type: Boolean }, // 선택 사용 여부
        dataIndexKey: { type: String, default: null }, // data-index 설정(selectable의 키값으로 사용)
        id: { type: String }, //selectable을 사용하기 위해 필수
        estimateSize: { type: Number }, // 버추얼 스크롤 계산을 위한 아이템 높이값
        keeps: { type: Number }, // 버추얼 스크롤 사용시 기본 렌더링 아이템 개수
    },
    components: {
        'virtual-list': VirtualList,
    },
    computed: {
        // 추가 기능 체크
        getAdd() {
            return this.$listeners.add;
        },
        // 삭제 기능 체크
        getRemove() {
            return this.$listeners.remove;
        },
        // 미사용 체크
        getDisabled() {
            return this.$attrs.disabled;
        },
    },

    watch: {
        mouseYPos(val, oldVal) {
            if (val >= oldVal) this.direction = 'down';
            else this.direction = 'up';
        },

        datas: {
            deep: true,
            handler(val) {
                this.listData = structuredClone(val);
                this.$refs['virtual-list'].scrollToOffset(0);
            },
        },
    },
    methods: {
        /**
         * selectable 선택 초기화
         * 상위 컴포넌트에서 호출할 수 있음
         */
        resetSelectedValue() {
            this.$refs['virtual-list'].$el.ResetSelectedValue();
        },
        evtSelectedUpdate(val) {
            this.$emit('selectedUpdate', val);
        },

        // 정렬 업데이트
        evtUpdate(val) {
            // 현재 스크롤 위치를 먼저 저장
            const currentOffset = this.$refs['virtual-list']?.getOffset();

            // nextTick을 사용하여 데이터 업데이트와 스크롤 위치 설정을 순차적으로 처리
            this.$nextTick(() => {
                this.$emit('update', val.detail?.data);

                // 데이터 업데이트 후 다음 틱에서 스크롤 위치 설정
                this.$nextTick(() => {
                    this.$refs['virtual-list']?.scrollToOffset(currentOffset);
                });
            });
        },

        // 아이템 삭제
        evt_itemRemove(tg) {
            const result = this.listData.removeItem(tg);
            this.listData = result;
        },
        // 클릭 이벤트
        evt_click(val) {
            this.$emit('click', val);
        },
        // 추가 이벤트
        evt_add(val) {
            this.$emit('add', val);
            this.$refs['virtual-list']?.scrollToBottom();
        },
        // 삭제 이벤트
        evt_remove(val) {
            this.evt_itemRemove(val);
            this.$emit('remove', val);
        },

        // 아이템 이름 변경 이벤트
        evt_confirm(val) {
            this.$emit('confirm', val);
        },
    },
};
</script>
