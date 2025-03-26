<template>
    <div class="dcp ui-select-box" v-widthInit>
        <div class="wrap">
            <button ref="selectBtn" type="button" class="select-button" :class="{ 'is-expanded': isExpanded }" @click="evtClickSelectBtn" @keydown="evtKeydown" :title="multiple && getTitle" :disabled="disabled"><span v-html="getSelectedName"></span></button>
            <transition name="fade_posy">
                <CompSelectList v-if="isExpanded" ref="selectList" :useOpts="getUseOpts" :multiple="multiple" :useSelected.sync="useSelected" :useColor="useColor" :selectItemIdx="selectItemIdx" :disableZeroSelect="disableZeroSelect" @clickItem="evtClickItem" @clickConfirm="evtClickConfirm" :style="selectListStyle" v-click-outside="evtDocClick" v-behavior-scroll-resize="evtResizeScroll" v-init></CompSelectList>
            </transition>
        </div>
    </div>
</template>
<script>
import CompSelectList from './CompSelectList.vue';

export default {
    name: 'comp-select-box',
    components: {
        CompSelectList,
    },
    data() {
        return {
            useSelected: this.value, // value 카피 데이터
            isExpanded: false, // 셀렉트 목록 확장 여부
            selectListStyle: {}, // 셀렉트 목록 wrapper 스타일 설정
            selectItemIdx: -1, // 방향키 이동시 사용될 셀렉트 아이템 인덱스
            listScrollTop: 0, // 방향키 이동시 셀렉트 목록 스크롤 값
            isNotScroll: false, // 스크롤 이동 여부
        };
    },

    props: {
        id: {},
        disabled: {},
        value: { type: String, required: true }, // 선택 아이템 코드
        opts: { type: Array, required: true }, // 옵션 목록
        multiple: { type: Boolean, default: false }, // 멀티 여부
        useColor: { type: Boolean, default: false }, // 색상 포함 여부
        allSelectedLabel: { type: String, default: null }, // 전체 선택 라벨명
        notSelectedLabel: { type: String, default: null }, // 선택 값 없을 경우 사용될 라벨명
        disableZeroSelect: { type: Boolean, default: false }, // true: 선택 값 최소 한개이상. 미만일 경우 적용 버튼 disabled
        labelVisibleNum: { type: Number, default: 1 }, // 선택된 값의 라벨명 표시 개수 설정
    },
    computed: {
        selected: {
            get() {
                // 전체 선택 문구 있을 때 값이 없으면 전체선택값 넣기
                if (this.allSelectedLabel && !this.value && !this.multiple) {
                    this.$emit('input', this.getUseOpts[0].code);
                    return this.getUseOpts[0].code;
                }

                return this.value;
            },
            set(val) {
                if (val.length) {
                    this.useSelected = val;
                    this.$emit('input', val);
                } else {
                    this.$emit('input', '');
                }
            },
        },

        getUseOpts() {
            const result = structuredClone(this.opts);

            if (result.length) {
                // 'allSelectedLabel'이 설정되어 있고 단일 선택 모드인 경우
                if (this.allSelectedLabel && !this.multiple) {
                    // 전체 아이템 코드를 추출하여 배열의 맨 앞에 추가
                    let allCode = this.opts.filter((item) => !item.disabled).map((item) => item.code);
                    result.unshift({
                        code: allCode.join(','),
                        name: this.allSelectedLabel,
                        color: '#666',
                    });
                }
                // notSelectedLabel, allSelectedLabel, value 모두 값이 없으면서 단일 일경우 목록 첫번째 값을 선택 처리
                if (!this.notSelectedLabel && !this.allSelectedLabel && !this.value && !this.multiple) {
                    this.$emit('input', result[0].code);
                }
            }

            return result;
        },

        /**
         * 현재 선택된 아이템 이름 반환 함수
         * @returns {String} 현재 선택된 아이템 이름
         */
        getSelectedName() {
            if (!this.multiple) {
                const selectedItem = this.getUseOpts.find((item) => String(item.code) === String(this.selected));
                return selectedItem ? this.getSelectedItemName(selectedItem) : this.notSelectedLabel || '선택하세요';
            } else {
                const selectedItems = this.getUseOpts.filter((opt) => this.selected?.split(',').includes(opt.code));
                return selectedItems.length > 0 ? this.getSelectedItemsName(selectedItems) : this.notSelectedLabel || '선택하세요';
            }
        },

        /**
         * 멀티일 경우, 선택된 전체 아이템 이름 반환 함수. 셀렉트 버튼 타이틀에 보여짐
         * @returns {String} 현선택된 전체 아이템 이름
         */
        getTitle() {
            const items = this.getUseOpts.filter((opt) => this.selected?.split(',').includes(opt.code));
            return !items.length ? '' : `총 ${items.length}개 / ${items.arrObjAttrToStr('name', '')}`;
        },
    },
    created() {
        if (this.allSelectedLabel && !this.value && this.multiple) {
            // 전체 아이템 선택 처리
            this.selected = this.getUseOpts.arrObjAttrToStr('code');
        }
    },
    watch: {
        useSelected(val) {
            // val 값이 쉼표로 시작하면 첫 번째 문자 제거
            if (val.startsWith(',')) {
                this.useSelected = val.slice(1);
            }
        },

        isExpanded(val) {
            if (!val) {
                setTimeout(() => {
                    this.selectItemIdx = -1;
                });
            }
        },

        // 옵션 목록 방향키 동작시 목록 스크롤 이동
        selectItemIdx(val) {
            if (this.selectItemIdx > 0) {
                const list = this.getScrollList();
                const target = this.$el.querySelector('.select-item.is-hover');
                const targetPosY = target ? target.offsetTop - list?.scrollTop - 40 : 0;
                const delta = targetPosY + 25 - list?.offsetHeight;

                if (delta > 0) this.listScrollTop = list?.scrollTop + delta;
                else this.listScrollTop = Math.max(0, list?.scrollTop + targetPosY);
            } else {
                this.listScrollTop = 0;
            }
        },

        // 옵션 목록 스크롤 값
        listScrollTop(val) {
            if (this.isNotScroll) return;
            const list = this.getScrollList();
            if (list) list.scrollTop = val;
        },
    },
    methods: {
        /**
         * 스크롤 대상 목록 가져오는 함수
         * @returns {HTMLElement|null} 스크롤 대상 목록 또는 null (찾지 못한 경우).
         */
        getScrollList() {
            const target = this.$refs.selectList?.$el;
            return this.multiple ? target?.children[0].children[1].children[0] : target?.children[0].children[0];
        },

        // keydown 이벤트 핸들러. 셀렉트 박스 옵션 목록 방향키 동작
        evtKeydown(e) {
            // PageUp & PageDown
            if (e.code.indexOf('Page') >= 0) {
                e.preventDefault();
                const list = this.getScrollList();
                const visibleFirstIdx = Math.floor(list.scrollTop / list.firstElementChild.firstElementChild.offsetHeight);
                const visibleLastIdx = Math.ceil((list.scrollTop + list.clientHeight) / list.firstElementChild.firstElementChild.offsetHeight) - 2;

                // up. 현재 보여지는 목록의 첫 번째 항목 선택
                if (e.keyCode === 33) this.selectItemIdx = visibleFirstIdx;
                // down. 현재 보여지는 목록의 마지막 항목 선택
                if (e.keyCode === 34) this.selectItemIdx = Math.min(visibleLastIdx, this.opts.length - 1);

                this.isNotScroll = true;
                setTimeout(() => {
                    this.isNotScroll = false;
                }, 50);
            }
            // Tab
            if (e.keyCode === 9) {
                this.isExpanded = false;
            }
            // Up
            if (e.keyCode === 38) {
                e.preventDefault();
                let idx = Math.max(this.selectItemIdx - 1, -1);
                setTimeout(() => {
                    this.selectItemIdx = idx;
                }, 60);
            }
            // Down
            if (e.keyCode === 40) {
                e.preventDefault();
                this.isExpanded = true;
                let idx = Math.min(this.selectItemIdx + 1, this.getSelectOptsLength() - 1);

                setTimeout(() => {
                    this.selectItemIdx = idx;
                }, 60);
            }
            // Enter
            if (e.keyCode === 13) {
                e.preventDefault();
                if (!this.multiple) {
                    this.isExpanded = false;
                    if (this.selectItemIdx >= 0) this.selected = this.getUseOpts[this.selectItemIdx].code;
                } else {
                    let selectedArr = this.useSelected.split(',');
                    if (this.selectItemIdx >= 0) {
                        if (selectedArr.length && selectedArr.includes(this.getSelectCode())) {
                            selectedArr.splice(selectedArr.indexOf(this.getSelectCode()), 1);
                        } else {
                            selectedArr.push(this.getSelectCode());
                        }
                        this.selectItemIdx = -1;
                        this.useSelected = selectedArr.join();
                    }
                }
            }
        },

        /**
         * 옵션이 10개 이상인 경우 'uncheckedList'에서, 미만인 경우 'getUseOpts'에서 선택된 아이템 반환 (멀티일때 사용)
         * @returns {String} 현재 선택된 아이템의 코드
         */
        getSelectCode() {
            const uncheckedList = this.opts.filter((item) => this.useSelected.split(',').indexOf(item.code) < 0);
            return this.opts.length > 10 ? uncheckedList[this.selectItemIdx].code : this.getUseOpts[this.selectItemIdx].code;
        },

        /**
         *
         * 옵션이 10개 이상인 경우 'uncheckedList'의 길이, 미만인 경우 'getUseOpts'의 길이 반환 (멀티일때 사용)
         * @returns {Number} 목록 아이템 개수
         */
        getSelectOptsLength() {
            const uncheckedList = this.opts.filter((item) => this.useSelected.split(',').indexOf(item.code) < 0);
            return this.opts.length > 10 ? uncheckedList.length : this.getUseOpts.length;
        },

        // 셀렉트 버튼 클릭
        evtClickSelectBtn() {
            this.isExpanded = !this.isExpanded;
            this.useSelected = this.selected ? this.selected : '';
            this.$emit('click');
        },

        /**
         * 아이템 클릭 함수
         * @returns {Object} 클릭 아이템
         */
        evtClickItem(item) {
            this.selected = String(item.code);
            this.isExpanded = false;
        },

        // 적용 버튼 클릭
        evtClickConfirm() {
            this.selected = this.useSelected;
            this.isExpanded = false;
        },

        /**
         * 선택된 아이템의 이름 반환 (단일)
         * @param {Object} item - 선택된 아이템 객체
         * @returns {String} 선택된 아이템의 이름
         */
        getSelectedItemName(item) {
            const { before, name, after } = item;
            return `${before ? '<span class="icon is-before">' + before + '</span>' : ''}${name}${after ? '<span class="icon is-after">' + after + '</span>' : ''}`;
        },

        /**
         * 선택된 아이템들의 이름 반환 (멀티)
         * 전체 아이템 개수와 선택된 아이템 개수가 일치할 경우, 'allSelectedLabel'이 설정되어 있다면 해당 라벨을, 그렇지 않으면 '전체'를 반환
         * @param {Array} items - 선택된 아이템들의 배열
         * @returns {String} 선택된 아이템들의 이름
         */
        getSelectedItemsName(items) {
            items.forEach((item) => (item.html = this.getSelectedItemName(item)));
            return this.getUseOpts.length === items.length ? (this.allSelectedLabel ? this.allSelectedLabel : '전체') : items.arrObjAttrToStr('html', '', this.labelVisibleNum);
        },

        // 셀렉트 리스트 wrapper 스타일 설정
        getSelectListStyle() {
            const target = this.$refs?.selectBtn.getBoundingClientRect();
            this.selectListStyle = { minWidth: target.width + 'px', top: target.bottom + 'px', left: target.left + 'px' };
        },

        evtDocClick(e) {
            if (!this.$el.contains(e.target)) {
                this.isExpanded = false;
                this.useSelected = this.selected;
            }
        },

        evtResizeScroll() {
            this.isExpanded = false;
        },
    },

    directives: {
        init: {
            inserted: function (el, binding, vnode) {
                vnode.context.getSelectListStyle();
            },
        },

        // width 설정시 하위 엘리먼트 'wrap' 의 min-width 속성 끄기
        widthInit: {
            inserted: function (el, binding, vnode) {
                if (vnode.elm.style['width']) vnode.elm.lastChild.style.minWidth = 0;
            },
        },
    },
};
</script>
