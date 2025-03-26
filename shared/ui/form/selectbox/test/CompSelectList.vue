<template>
    <div class="select-list-wrap" :class="{ 'is-multi': multiple }" v-init>
        <!-- 단일 -->
        <template v-if="!multiple">
            <comp-input-box v-if="isAutocomplete" ref="selectBoxInput" id="select_box_input" class="is-small select-box-input" v-model="inputKeyword" placeholder="검색어 입력" @keydown="$emit('keydownInput', $event)" @keyupEnter="$emit('keyupEnter')"></comp-input-box>
            <div class="list-wrap">
                <virtual-list class="select-virtual-list" :data-sources="useOpts" data-key="code" :data-component="{}">
                    <template v-slot:item="{ item, index }">
                        <button class="select-item" :class="{ 'is-active': useSelected === String(item.code), 'is-hover': index === selectItemIdx }" @click="evtClickItem(item)">
                            <span v-if="item.before" class="icon is-before" v-html="item.before"></span>
                            <span v-html="classBind(item.name)"></span>
                            <span v-if="item.after" class="icon is-after" v-html="item.after"></span>
                        </button>
                    </template>
                </virtual-list>
            </div>
        </template>
        <!-- 멀티 -->
        <template v-else>
            <div class="select-list-multi" :class="{ 'is-autocomplete': isAutocomplete && useOpts.length > 10 && !useColor }">
                <comp-input-box v-if="isAutocomplete" ref="selectBoxInput" id="select_box_input_multi" class="is-small select-box-input" v-model="inputKeyword" placeholder="검색어 입력" @keydown="evtKeydownInput" @keyupEnter="$emit('keyupEnter')"></comp-input-box>
                <div class="is-header" :class="{ 'is-more-then-10': useOpts.length > 10 && !useColor }">
                    <div class="tops">
                        <comp-button class="is-small" @click="evtClickAllSelect"><span class="txt">전체 선택</span></comp-button>
                        <span v-if="useOpts.length > 10 && !useColor"
                            >총<strong>{{ getCheckedList.length }}</strong
                            >건</span
                        >
                    </div>
                    <virtual-list v-if="useOpts.length > 10 && !useColor" class="select-virtual-list" :data-sources="getCheckedList" data-key="code" :data-component="{}">
                        <template v-slot:item="{ item }">
                            <button class="select-item" @click.stop="evtClickItem(item)" title="선택해제">
                                <span v-if="item.before" class="icon is-before" v-html="item.before"></span>
                                <span>{{ item.name }}</span>
                                <span v-if="item.after" class="icon is-after" v-html="item.after"></span>
                            </button>
                        </template>
                    </virtual-list>
                </div>
                <div class="list-wrap">
                    <virtual-list ref="selectListMulti" class="select-virtual-list" :class="{ 'is-more-then-10': useOpts.length > 10 && !useColor }" :data-sources="useOpts.length > 10 && !useColor ? getUncheckedList : useOpts" data-key="code" :data-component="{}">
                        <template v-slot:item="{ item, index }">
                            <button :value="item.code" class="select-item" :class="{ 'is-color': useColor, 'is-active': useSelected.split(',').findIndex((val) => String(val) === String(item.code)) > -1, 'is-hover': index === selectItemIdx }" @click.stop="evtClickItem(item)" :style="useColor ? '--bgColor:' + item.color : ''">
                                <span v-if="item.before" class="icon is-before" v-html="item.before"></span>
                                <span v-html="classBind(item.name)"></span>
                                <span v-if="item.after" class="icon is-after" v-html="item.after"></span>
                            </button>
                        </template>
                    </virtual-list>
                </div>
                <div class="is-footer">
                    <comp-button class="is-small is-icon-only" title="선택초기화" @click.stop="evtClickReset"><span class="icon">&#xe020;</span></comp-button>
                    <comp-button class="is-small is-color-black" :disabled="disableZeroSelect && !useSelected.length" @click.stop="evtClickConfirm"><span class="txt">적용</span></comp-button>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';

export default {
    name: 'comp-select-list',
    components: {
        'virtual-list': VirtualList,
    },
    data() {
        return {
            inputKeyword: '',
            isAutocomplete: false,
        };
    },
    props: {
        useOpts: { type: Array, required: true }, // 옵션 목록
        useSelected: { type: String, required: true }, // 선택 아이템 코드
        selectItemIdx: { type: Number, required: true },
        multiple: { type: Boolean, required: true },
        useColor: { type: Boolean, required: true },
        disableZeroSelect: { type: Boolean, required: true },
    },

    computed: {
        // 선택된 아이템 목록 반환
        getCheckedList() {
            let result = [];
            this.useOpts.filter((item) => {
                if (this.useSelected.split(',').indexOf(item.code) >= 0) {
                    result.push(structuredClone(item));
                }
            });
            return result;
        },

        // 선택되지 않은 아이템 목록 반환
        getUncheckedList() {
            return this.useOpts.filter((item) => this.useSelected.split(',').indexOf(item.code) < 0);
        },
    },

    watch: {
        inputKeyword(val) {
            this.$emit('input', val);
        },
    },

    methods: {
        /**
         * 입력창 키다운 이벤트
         * @param {Event} e - 이벤트 객체
         */
        evtKeydownInput(e) {
            const scrollList = this.$refs.selectListMulti;
            this.$emit('keydownInput', e, scrollList);
        },

        /**
         * 자동완성 하이라이트 처리 함수
         * @param {String} val - 하이라이트 대상 문자열
         * @returns {String} 하이라이트된 문자열
         */
        classBind(val) {
            if (this.inputKeyword.trim().length) {
                const escapedVal = this.inputKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(escapedVal, 'i');
                return String(val).replace(regex, '<span class="is-hl-inputkeyword">$&</span>');
            }
            return val;
        },

        /**
         * 아이템 클릭 함수
         * @param {Object} item - 클릭 아이템 객체
         */
        evtClickItem(item) {
            if (!this.multiple) {
                this.$emit('clickItem', item);
            } else {
                let dupSelected = this.useSelected.split(',');
                const itemCodeIndex = dupSelected.indexOf(item.code);

                if (itemCodeIndex === -1) {
                    dupSelected.push(item.code);
                } else {
                    dupSelected.splice(itemCodeIndex, 1);
                }

                this.$emit('update:useSelected', dupSelected.join());
            }
        },

        // 전체 선택 버튼 클릭
        evtClickAllSelect() {
            const allSelected = this.useOpts.arrObjAttrToStr('code').split(',');
            this.$emit('update:useSelected', allSelected.join());
        },

        // 초기화 버튼 클릭
        evtClickReset() {
            this.$emit('update:useSelected', '');
        },

        // 적용 버튼 클릭
        evtClickConfirm() {
            this.inputKeyword = '';
            this.$emit('input', this.inputKeyword);
            this.$emit('clickConfirm');
        },
    },

    directives: {
        init: {
            inserted: function (el, binding, vnode) {
                if (vnode.elm.parentNode.parentNode._prevClass.indexOf('is-autocomplete') >= 0) {
                    vnode.context.isAutocomplete = true;
                }
            },
        },
    },
};
</script>

<style lang="scss" scoped></style>
