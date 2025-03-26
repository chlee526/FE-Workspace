<template>
    <div ref="selectBox" class="dcp selectBox" v-widthInit>
        <div ref="container" class="wrap">
            <button ref="input" class="inputs" :class="{ 'is-expanded': expanded }" type="button" :title="getTitle" :disabled="disabled" @click="evt_inputClick" @keydown="evtKeydown">
                <span v-html="selected_txt" />
            </button>
            <div ref="list" class="list" :style="'top: ' + pos_top + 'px; left:' + pos_left + 'px'">
                <transition name="fade_posy">
                    <div v-if="expanded" ref="expandWrap" class="wrap" :class="{ 'is-multiple': multiple }" @scroll="evt_listScroll" v-init v-click-outside="evt_docClick" v-behavior-scroll-resize="evt_resizeScroll" :style="getWrapStyle">
                        <!-- 검색 -->
                        <comp-input-box v-if="autoComplete" id="inputbox_01" class="is-small" v-model="searchName" placeholder="검색어 입력" label="라벨값" @keydown="evtKeydown"></comp-input-box>

                        <!-- 단일 트리뷰 -->
                        <div v-if="!multiple && treeView">
                            <tree-selectbox :multiple="false" :list="visibleItems" @toggle="toggle" @nodeClick="nodeClick" :style="spacerStyle"></tree-selectbox>
                        </div>

                        <!-- 멀티 트리뷰 -->
                        <div v-else-if="multiple && treeView" class="is-tree">
                            <div class="all">
                                <comp-button class="is-small" @click="evt_allChkClick"><span class="txt">전체 선택</span></comp-button>
                            </div>
                            <div class="list_wrap">
                                <div class="unchecked_list" :style="'max-height:' + getMaxHgt_Multi + 'px;'">
                                    <comp-tree-view class="treeview" :opts="opts" :multiple="true" :list="visibleItems" :search-name="searchName" @toggle="toggle" @selected="nodeClick" :style="spacerStyle"></comp-tree-view>
                                </div>
                                <div class="checked_list">
                                    <span class="total"
                                        >총<strong>{{ selected.length.lengthLimitComma(0) }}</strong
                                        >건</span
                                    >
                                    <ul>
                                        <li v-for="item in getCheckedLists" :key="'c' + item.code">
                                            <button class="item" :class="selected.indexOf(item.code) >= 0 ? 'is-active' : ''" :value="item.code" title="선택해제" :disabled="item.disabled" @click="evt_itemClick">{{ item.name }} 클릭</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="btns">
                                <button class="ui_btn is-small is-icon-only" title="선택초기화" @click="evt_allCancleClick"><span class="ui_icon">&#xe020;</span></button>
                                <button class="ui_btn is-small is-color-hl" @click="evt_confirmClick"><span>적용</span></button>
                            </div>
                        </div>

                        <!-- 단일 -->
                        <virtual-list v-else-if="!multiple && !treeView" ref="optsList" class="virtual_list not_multiple" :class="!useColor || 'is-color'" :data-sources="notMultipleItems" :data-component="item" data-key="code" :estimate-size="25" :extra-props="{ autoComplete, searchName, selected, evt_itemClick, activeSelectItemIdx, useEllipsis }"></virtual-list>

                        <!-- 멀티 -->
                        <div v-else class="is-multiple" :class="!useColor || 'is-color'">
                            <div v-if="useColor || getUseOpts.length <= 10" class="all">
                                <comp-button class="is-small" @click="evt_allChkClick"><span class="txt">전체 선택</span></comp-button>
                            </div>
                            <div class="list_wrap">
                                <template v-if="!useColor && getUseOpts.length > 10">
                                    <div class="checked_list">
                                        <div class="tops">
                                            <comp-button class="is-small" @click="evt_allChkClick"><span class="txt">전체 선택</span></comp-button>
                                            <span class="total"
                                                >총 <strong>{{ getCheckedLists.length.lengthLimitComma(0) }}</strong
                                                >건</span
                                            >
                                        </div>

                                        <virtual-list class="virtual_list" :data-sources="checkedItems" :data-component="item" :estimate-size="25" data-key="code" :extra-props="{ autoComplete, searchName, selected, evt_itemClick, useTitle, useEllipsis }" :style="'height:' + uncheckListHgt + 'px'"></virtual-list>
                                    </div>
                                    <div class="unchecked_list" :class="{ 'is-nodata': !unCheckedItems.length }" v-uncheckInit>
                                        <strong class="ui_invisible">아이템</strong>

                                        <virtual-list class="virtual_list" :data-sources="unCheckedItems" :data-component="item" :estimate-size="25" data-key="code" :extra-props="{ autoComplete, searchName, selected, evt_itemClick, useEllipsis }"></virtual-list>
                                    </div>
                                </template>
                                <ul v-else ref="expandList">
                                    <li v-for="(item, idx) in getUseOpts" :key="'list_' + idx">
                                        <button class="item" :class="{ 'is-active': tmpSelected.indexOf(String(item.code)) >= 0, 'ui-ellipsis': useEllipsis }" :value="item.code" :title="item.name" :disabled="item.disabled" @click="evt_itemClick" v-html="classBind(item.name)" :style="useColor ? '--color:' + item.color : ''" />
                                    </li>
                                </ul>
                            </div>
                            <div class="btns">
                                <button class="ui_btn is-small is-icon-only" title="선택초기화" @click="evt_allCancleClick"><span class="ui_icon">&#xe020;</span></button>
                                <button class="ui_btn is-small is-color-black" :disabled="isSelected && useDisabled" @click="evt_confirmClick"><span>적용</span></button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list';
import $ from 'jquery';

import AtcItem from './AtcItem'; // 자동완성 목록 아이템 컴포넌트(가상스크롤 라이브러리 사용을 위해 컴포넌트로 분리)
export default {
    name: 'comp-selectbox',
    data() {
        return {
            expanded: false,
            pos_top: 0,
            pos_left: 0,
            max_hgt: 0,
            list_hgt: 0,
            multi_scroll_hgt: 0,
            // allChecked: this.selected && this.selected.length == this.opts.length ? true : false,
            allChecked: false,
            check_list: '',
            check_Array: [],
            visibleIdxS: 0,
            visibleIdxE: 26,
            listScroll: 0,
            searchName: '',
            selectedSet: new Set(),

            //treeview 테스트
            scrollTop: 0,
            rowHeight: 23,
            rootHeight: 400,
            nodePadding: 22,
            toggleArr: ['0'],
            selectedNode: null,
            selectList: [],
            copyList: [],
            icList: [],
            arrayStore: [],
            tmpSelected: [],
            refSelectSelected: this.multiple ? [] : '',

            paddingTop: 0,
            paddingBottom: 0,

            uncheckListHgt: 0,

            isSelected: false, //다중 선택에서 선택지 있는지 체크
            selectedIdx: -1,
            item: AtcItem,
            useTitle: true,

            activeSelectItemIdx: -1,
            optsListScrollTop: 0,
            virtualScrollTop: false,

            resizeObserver: null, // 화면 변화시 selecbox 크기/위치 조정
            selectBoxWidth: 0,
        };
    },
    components: { 'virtual-list': VirtualList },
    props: {
        id: { type: String },
        value: {},
        opts: { type: Array },
        multiple: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        notSelectedLabel: { type: String },
        allSelectedLabel: { type: String },
        treeView: { type: Boolean, default: false },
        autoComplete: { type: Boolean, default: false }, //자동완성 사용시
        useColor: { type: Boolean, default: false }, //색상 포함
        useDisabled: { type: Boolean, default: false }, //다중 선택에서 선택지 체크 여부
        multiple2: {},
        parentItem: {},
        useEllipsis: { type: Boolean, default: false }, // 말줄임표 적용여부
        useAnchorWidth: { type: Boolean, default: false }, // anchor width 사용여부
        expandWidth: { type: String },
    },
    computed: {
        selected: {
            get() {
                // 단일 선택 모드
                if (!this.multiple) {
                    // 전체 선택 문구가 있고 값이 없는 경우
                    if (this.allSelectedLabel && !this.value && this.getUseOpts?.length) {
                        // 첫 번째 옵션의 코드가 있는 경우에만 emit
                        const defaultCode = this.getUseOpts[0].code;
                        defaultCode !== undefined && this.$emit('input', defaultCode);
                        return defaultCode;
                    }
                    return this.value;
                }

                // 다중 선택 모드
                if (this.treeView) {
                    // 트리뷰에서는 쉼표로 구분된 문자열을 배열로 변환
                    return this.check_list ? this.check_list.split(',') : [];
                }

                // 일반 다중 선택
                return this.value ? this.getTmpSelected : [];
            },

            set($val) {
                // 값이 있는 경우
                if ($val?.length) {
                    if (this.multiple) {
                        this.tmpSelected = $val;
                    } else {
                        this.$emit('input', $val);
                        !this.treeView && this.$emit('change', $val);
                    }

                    !this.treeView && this.$emit('change', $val);
                    return;
                }

                // 값이 없는 경우
                this.$emit('input', null);
                !this.multiple && !this.treeView && this.$emit('change', $val);
            },
        },

        getWrapStyle() {
            const maxHeight = !this.multiple && !this.treeView && this.getMaxHgt + 'px';

            if (!this.useAnchorWidth) {
                if (this.expandWidth)
                    return {
                        width: this.expandWidth,
                        maxHeight,
                    };

                return {
                    minWidth: this.selectBoxWidth + 'px',
                    maxHeight,
                };
            }

            return {
                width: this.selectBoxWidth + 'px',
                maxHeight,
            };
        },
        notMultipleItems() {
            const items = this.autoComplete ? this.getFilterDatas : this.getUseOpts;

            return items;
        },

        checkedItems() {
            return this.getCheckedLists;
        },

        unCheckedItems() {
            return this.getFilterDatas;
        },

        getTmpSelected() {
            if (this.treeView) {
                console.log(this.check_list);
                return this.check_list.split(',');
            }

            const selectedCodesSet = new Set((this.value || '').split(','));
            const processedCodes = new Set();

            return this.opts
                .filter((item) => {
                    const code = String(item.code);
                    if (selectedCodesSet.has(code) && !processedCodes.has(code)) {
                        processedCodes.add(code);
                        return true;
                    }
                    return false;
                })
                .map((item) => String(item.code));
        },
        getMaxHgt() {
            return this.max_hgt;
        },
        getMaxHgt_Multi() {
            return this.max_hgt - (this.autoComplete ? 29 : 0) - 33 - 40 - 99;
        },
        itemCount() {
            return this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName))).filter((val) => {
                return this.toggleArr.includes(val.parentCode);
            }).length;
        },
        visibleNodeCount() {
            let count = Math.ceil(this.rootHeight / this.rowHeight) + 2 * this.nodePadding;

            count = Math.min(this.itemCount - this.startIndex, count);

            return count;
        },
        visibleItems() {
            return this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)))
                .filter((val) => {
                    return this.toggleArr.includes(val.parentCode);
                })
                .slice(this.startIndex, this.startIndex + this.visibleNodeCount);
        },

        startIndex() {
            let startNode = Math.floor(this.scrollTop / this.rowHeight) - this.nodePadding;

            startNode = Math.max(0, startNode);

            return startNode;
        },
        offsetY() {
            return this.startIndex * this.rowHeight;
        },
        spacerStyle() {
            return {
                transform: 'translateY(' + this.offsetY + 'px)',
            };
        },
        getUseOpts() {
            const options = [...this.opts];

            if (this.allSelectedLabel && !this.multiple) {
                const enabledCodes = options
                    .filter((item) => !item.disabled)
                    .map((item) => item.code)
                    .join(',');

                options.unshift({
                    code: enabledCodes,
                    name: this.allSelectedLabel,
                    color: '#666',
                });
            }

            if (!this.notSelectedLabel && !this.allSelectedLabel && !this.value && !this.multiple && options.length > 0) {
                this.$emit('input', options[0].code);
            }

            return options;
        },

        selected_txt() {
            // 기본 반환값 초기화
            let result = '';

            // 단일 선택 모드
            if (!this.multiple) {
                // 선택된 항목 찾아서 텍스트 설정 (code를 문자열로 변환하여 비교)
                this.opts.forEach(($item) => {
                    if (String($item.code) === String(this.selected)) {
                        result = this.formatItemText($item);
                    }
                });
                // 전체 선택 레이블이 있고 첫 번째 옵션이 선택된 경우
                if (this.allSelectedLabel && String(this.value) === String(this.getUseOpts[0].code)) {
                    result = this.allSelectedLabel;
                }
            }
            // 다중 선택 모드
            else if (this.value) {
                // 선택된 첫 번째 항목의 텍스트 찾기
                const selectedItem = this.findFirstSelectedItem();
                if (selectedItem) {
                    result = this.formatItemText(selectedItem);
                }

                const selectedCnt = this.getTmpSelected.length;
                // 2개 이상 선택된 경우 "외 N개" 텍스트 추가
                if (selectedCnt > 1) {
                    result = `${result} 외 ${selectedCnt - 1}개`;
                }

                // 활성화된 모든 항목이 선택된 경우 전체 선택 텍스트 표시
                const disableOpts = this.opts.filter((opt) => opt.disabled).length;
                const optsLength = this.opts.length - disableOpts;
                if (selectedCnt === optsLength) {
                    result = this.allSelectedLabel || '전체';
                }
            }

            // 결과가 없는 경우 기본 텍스트 반환
            return result || this.notSelectedLabel || this.getUseOpts?.getParseDatas({ code: '' })[0]?.name || '선택하세요';
        },

        getTitle() {
            if (!this.multiple) return '';

            const tmpSelected = this.getTmpSelected;
            const selectedCount = tmpSelected.length;

            if (!selectedCount) return '총 0개';

            // opts를 Map으로 변환하여 검색 성능 향상
            const optsMap = new Map(this.opts.map((item) => [String(item.code), item.name]));

            const selectedNames = tmpSelected
                .map((code) => optsMap.get(String(code)))
                .filter(Boolean)
                .join(', ');

            return selectedNames ? `총 ${selectedCount}개 / ${selectedNames}` : `총 ${selectedCount}개`;
        },

        getEnabledOpts() {
            return this.opts.filter(($item) => !$item.disabled);
        },

        getCheckedLists() {
            if (this.treeView && this.multiple && this.selected) {
                let tl = this.check_Array.filter((val) => {
                    return !val.children;
                });

                const result = this.check_Array.filter((val) => {
                    return this.selected.includes(val.code);
                });

                this.setAllChecked(tl, result);
            }

            // tmpSelected를 String Set으로 변환
            const selectedSet = new Set(this.tmpSelected?.map(String) || []);

            // 필터링
            return this.opts.filter(($item) => selectedSet.has(String($item.code)));
        },

        getUnCheckedLists() {
            const result = [];

            // tmpSelected가 배열이면 Set으로 변환하여 사용
            const selectedSet = Array.isArray(this.tmpSelected) ? new Set(this.tmpSelected.map(String)) : null;

            this.opts.forEach(($item) => {
                const itemCode = String($item.code);

                // tmpSelected가 배열이면 Set을 사용하여 포함 여부 체크
                if (selectedSet) {
                    if (!selectedSet.has(itemCode)) {
                        result.push($item);
                    }
                } else {
                    const selectedValue = selectedSet ? null : String(this.tmpSelected);
                    // 배열이 아니라면 단일 값과 비교
                    if (selectedValue !== itemCode) {
                        result.push($item);
                    }
                }
            });

            return result;
        },

        getFilterDatas() {
            // 검색어가 없으면 기본 필터링만 수행
            if (!this.searchName) {
                return this.filterAndAddAllSelected(this.opts);
            }

            // 검색어 소문자 변환 (한 번만 수행)
            const searchTerm = this.searchName.toLowerCase();
            const filteredItems = this.filterItems(this.opts, searchTerm);

            return this.addAllSelectedOption(filteredItems);
        },
    },
    created() {
        if (!this.notSelectedLabel && !this.allSelectedLabel && !this.value && !this.multiple) {
            this.$emit('input', this.getUseOpts[0].code);
        }
        if (this.multiple) {
            if (this.getCheckedLists.length == this.getEnabledOpts.length) this.allChecked = true;
            else this.allChecked = false;
        }

        this.tmpSelected = this.value ? (this.multiple ? this.getTmpSelected : this.value) : [];
    },
    mounted() {
        if (this.treeView) this.copyList = this.opts;

        // 페이지에 새 요소 추가로 크기/위치 조정이 필요할 때 동작
        this.observeContentResized();
    },
    watch: {
        // 옵션 목록 방향키 동작시 스크롤 이동
        activeSelectItemIdx(val) {
            if (this.activeSelectItemIdx >= 0) {
                const item = this.$el.querySelector('.item.is-hover');
                const selItemPosY = item ? item.offsetTop - this.$refs.optsList?.$el.scrollTop - 40 : 0;
                const delta = selItemPosY + 25 - this.$refs.optsList?.$el.offsetHeight;
                if (delta > 0) {
                    this.optsListScrollTop = this.$refs.optsList?.$el.scrollTop + delta;
                } else {
                    this.optsListScrollTop = Math.max(0, this.$refs.optsList?.$el.scrollTop + selItemPosY);
                }
            } else {
                this.optsListScrollTop = 0;
            }
        },

        optsListScrollTop(val) {
            if (this.$refs.optsList) this.$refs.optsList.$el.scrollTop = val;
        },

        tmpSelected: {
            handler(newSelected) {
                // 다중 선택 선택 여부 체크
                this.isSelected = this.multiple && this.useDisabled && newSelected.length <= 0;

                if (Array.isArray(newSelected)) {
                    // Set 업데이트
                    this.selectedSet = new Set(newSelected);
                }
            },
            immediate: true,
        },

        //검색
        searchName(t) {
            if (this.treeView) {
                this.copyList = this.opts;

                let childList = this.checkChildren(this.deepFilter(this.opts, (node) => node.name.includes(this.searchName)));

                childList.forEach((val) => {
                    if (this.selectList.includes(val.code)) {
                        val.is_check = true;
                        childList = this.childCheck(childList, val.parentCode);
                    } else {
                        val.is_check = false;
                    }
                });

                this.copyList = this.checkChildren(this.deepFilter(childList, (node) => node.name.includes(this.searchName))).filter((val) => {
                    return this.toggleArr.includes(val.parentCode);
                });
            }
            if (t == '') this.selectedIdx = -1;
        },

        opts($val) {
            const tmpSelected = $val.filter(($item) => this.value && String(this.value).strToArr().includes(String($item.code)) && !$item.disabled);
            this.$emit('input', tmpSelected.arrObjAttrToStr('code'));
        },

        value($val) {
            if (this.multiple) {
                this.allChecked = this.getCheckedLists.length === this.getEnabledOpts.length;
            }
        },
        expanded($val) {
            if ($val) {
                // 다중 선택일 때는 간단히 처리
                if (this.multiple) {
                    this.searchName = '';
                    this.tmpSelected = this.value ? this.getTmpSelected : [];
                }
            } else {
                // 목록창이 꺼질 때의 처리
                this.searchName = ''; // 검색어 초기화는 공통

                if (this.multiple) {
                    this.tmpSelected = this.value ? this.getTmpSelected : [];
                } else if (this.autoComplete) {
                    // autoComplete만 있을 때는 여기서 종료
                    return;
                }

                // treeView 처리
                if (this.treeView) {
                    // 초기값 설정
                    const checkList = this.value || '';
                    const checkListArr = checkList.strToArr();
                    const toggleSet = new Set(this.toggleArr);

                    // 필터링된 옵션 목록 한 번만 생성
                    const filteredOpts = this.deepFilter(this.opts, (node) => node.name.includes(this.searchName));
                    const childList = this.checkChildren(filteredOpts);

                    // 체크 상태 처리 최적화
                    const checkedItems = [];
                    const parentUpdates = new Set();

                    childList.forEach((val) => {
                        const isChecked = checkListArr.includes(val.code);
                        val.is_check = isChecked;

                        if (isChecked) {
                            checkedItems.push(val);
                            parentUpdates.add(val.parentCode);
                        }
                    });

                    // 부모 노드 업데이트
                    parentUpdates.forEach((parentCode) => {
                        this.childCheck(childList, parentCode);
                    });

                    // 최종 결과 설정
                    this.check_Array = checkedItems;
                    this.check_list = checkList;
                    this.selectList = checkListArr;

                    // copyList 생성 최적화
                    this.copyList = childList.filter((val) => toggleSet.has(val.parentCode) && val.name.includes(this.searchName));
                }

                this.activeSelectItemIdx = -1;
            }
        },
    },
    methods: {
        /**
         * 다중 선택 모드일 때 allSelectedLabel이 있으면 배열 앞에 추가
         * @param {Array{Object}} items - `code`, `name`, `disabled` 속성을 가진 객체 배열
         */
        addAllSelectedOption(items) {
            if (!this.allSelectedLabel || this.multiple) {
                return items;
            }

            // 전체 선택 옵션 생성을 위한 코드 문자열
            const enabledCodes = items
                .filter((item) => !item.disabled)
                .map((item) => item.code)
                .join(',');

            // 새 배열을 생성하여 전체 선택 옵션 추가
            return [
                {
                    code: enabledCodes,
                    name: this.allSelectedLabel,
                    color: '#666',
                },
                ...items,
            ];
        },

        filterAndAddAllSelected(items) {
            const filtered = this.multiple && this.getUseOpts.length >= 10 ? items.filter((item) => !this.selectedSet.has(String(item.code))) : items;

            return this.addAllSelectedOption(filtered);
        },

        filterItems(items, searchTerm) {
            // 다중 선택이고 10개 이상 선택된 경우
            if (this.multiple && this.getUseOpts.length >= 10) {
                // 배열 메소드 체이닝으로 한 번의 순회로 처리
                return items.filter((item) => !this.selectedSet.has(String(item.code)) && item.name.toLowerCase().includes(searchTerm));
            }

            // 일반 검색
            return items.filter((item) => item.name.toLowerCase().includes(searchTerm));
        },
        /**
         * 아이템 텍스트 포맷팅 (아이콘 포함)
         */
        formatItemText(item) {
            return `${item.before ? '<span class="ui_icon is-before">' + item.before + '</span>' : ''}${item.name}${item.after ? '<span class="ui_icon is-after">' + item.after + '</span>' : ''}`;
        },

        /**
         * 첫 번째 선택된 항목 찾기
         */
        findFirstSelectedItem() {
            if (this.treeView) {
                // 트리뷰에서 선택된 항목 찾기
                const res = this.checkChildren(this.deepFilter(this.opts, (node) => node.name.includes('')));
                return res.find((item) => this.getTmpSelected.includes(String(item.code)));
            } else {
                // 일반 리스트에서 선택된 항목 찾기
                return this.opts.find((item) => this.getTmpSelected.includes(String(item.code)));
            }
        },
        /**
         * 페이지에 새 요소 추가로 크기/위치 조정이 필요할 때 동작
         */
        observeContentResized() {
            const content = document.querySelector('#content');
            const aside = document.querySelector('aside');

            // ResizeObserver 인스턴스 만들어서 할당
            this.resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry) => {
                    // #content의 크기가 변경되었을때 select 위치 재조정
                    // aside가 있으면 aside 크기가 변경되었을때 select 위치 재조정
                    if (entry.target === content || (aside && entry.target === aside)) {
                        this.setSizePosition();
                    }
                });
            });
            // content 관찰 시작
            this.resizeObserver.observe(content);

            // aside 관찰 시작
            if (aside) this.resizeObserver.observe(aside);
        },

        /**
         * selectbox expand 위치 조정 및 크기 조정
         */
        setSizePosition() {
            if (!this.$refs.container) return;

            const { width } = this.$refs.container.getBoundingClientRect();
            this.selectBoxWidth = width;

            this.set_rePos();
        },

        // 셀렉트 박스 옵션 목록 방향키 동작
        evtKeydown(e) {
            // Tab
            if (e.keyCode == 9) {
                this.expanded = false;
            }
            // Up
            if (e.keyCode === 38) {
                e.preventDefault();
                let idx = Math.max(this.activeSelectItemIdx - 1, -1);
                setTimeout(() => {
                    this.activeSelectItemIdx = idx;
                }, 60);
            }
            // Down
            if (e.keyCode === 40) {
                e.preventDefault();
                this.expanded = true;
                let idx = Math.min(this.activeSelectItemIdx + 1, this.getUseOpts.length - 1);
                setTimeout(() => {
                    this.activeSelectItemIdx = idx;
                }, 60);
            }
            // Enter
            if (e.keyCode === 13) {
                e.preventDefault();

                if (this.activeSelectItemIdx >= 0) {
                    const { code } = this.getFilterDatas[this.activeSelectItemIdx];
                    this.selected = String(code);
                }

                this.expanded = false;
            }
        },

        setAllChecked(tl, result) {
            this.allChecked = tl.length == result.length && result.length > 0;
        },

        childCheck(list, parentCode) {
            list.forEach((v) => {
                if (v.code == parentCode) {
                    if (
                        v.children.length ==
                        v.children.filter((v3) => {
                            return v3.is_check == true;
                        }).length
                    ) {
                        v.is_check = true;

                        if (v.parentCode !== '0') {
                            this.childCheck(list, v.parentCode);
                        }
                    }
                }
            });

            return list;
        },

        //노드클릭
        nodeClick(node) {
            this.arrayStore = [];

            if (node.model.children) {
                if (node.checked) {
                    let tl = this.checkChildren(this.deepFilter([node.model], (node) => node.name.includes(this.searchName)));

                    if (tl.length == 0) {
                        tl.push(node.model);
                        this.checkChildren(node.model).forEach((v) => {
                            tl.push(v);
                        });
                    }

                    if (node.$parent.model) {
                        tl[0].parentCode = node.$parent.model.code;
                    } else {
                        tl[0].parentCode = '0';
                    }

                    tl.forEach((val) => {
                        val.is_check = true;

                        if (!val.children) {
                            if (this.selectList.includes(val.code)) {
                                this.selectList.splice(this.selectList.indexOf(val.code), 1);
                            }
                            this.selectList.push(val.code);
                        }
                    });

                    let tl2 = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)));

                    tl2.forEach((val) => {
                        tl.forEach((val2) => {
                            if (val.code == val2.code) {
                                val.is_check = true;
                            }

                            val.is_check ? this.arrayStore.push(val.code) : '';
                        });
                    });
                    this.arrayStore = [...new Set(this.arrayStore)];

                    if (node.$parent.model) {
                        if (
                            node.$parent.model.children.length ==
                            node.$parent.model.children.filter((val) => {
                                return this.arrayStore.includes(val.code);
                            }).length
                        ) {
                            tl2.forEach((val) => {
                                if (val.code == node.$parent.model.code) {
                                    val.is_check = true;
                                }
                            });
                        }
                    }

                    if (node.$parent.model) {
                        node.$parent.model.children = tl2.filter((val) => {
                            return node.$parent.model.code == val.code;
                        })[0].children;
                    }

                    this.copyList = this.checkChildren(this.deepFilter(tl2, (node) => node.name.includes(this.searchName))).filter((val) => {
                        return this.toggleArr.includes(val.parentCode);
                    });

                    this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)))
                        .filter((val) => {
                            return !val.children && val.is_check == true;
                        })
                        .forEach((val) => {
                            this.selectList = [];
                            this.check_Array.push(val);
                            const set = [...new Set(this.check_Array)];
                            this.check_Array = set;

                            this.check_Array.forEach((val) => {
                                this.selectList.push(val.code);
                            });

                            this.check_list = this.selectList.join(',');
                        });
                } else {
                    let tl = this.checkChildren(this.deepFilter([node.model], (node) => node.name.includes(this.searchName)));

                    if (tl.length == 0) {
                        tl.push(node.model);
                        this.checkChildren(node.model).forEach((v) => {
                            tl.push(v);
                        });
                    }

                    if (node.$parent.model) {
                        tl[0].parentCode = node.$parent.model.code;
                    } else {
                        tl[0].parentCode = '0';
                    }

                    tl.forEach((val) => {
                        val.is_check = false;
                        if (this.selectList.includes(val.code)) {
                            this.selectList.splice(this.selectList.indexOf(val.code), 1);
                        }
                    });

                    let tl2 = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)));

                    tl2.forEach((val) => {
                        tl.forEach((val2) => {
                            if (val.code == val2.code) {
                                val.is_check = false;
                            }
                        });
                    });

                    if (node.$parent.model) {
                        if (
                            node.$parent.model.children.length !=
                            node.$parent.model.children.filter((val) => {
                                return this.arrayStore.includes(val.code);
                            }).length
                        ) {
                            tl2.forEach((val) => {
                                if (val.code == node.$parent.model.code) {
                                    val.is_check = false;
                                }
                            });
                        }
                    }

                    if (node.$parent.model) {
                        node.$parent.model.children = tl2.filter((val) => {
                            return node.$parent.model.code == val.code;
                        })[0].children;
                    }
                    this.copyList = this.checkChildren(this.deepFilter(tl2, (node) => node.name.includes(this.searchName))).filter((val) => {
                        return this.toggleArr.includes(val.parentCode);
                    });

                    this.check_Array = this.check_Array.filter((val) => {
                        return this.selectList.includes(val.code);
                    });

                    this.check_list = this.selectList.join(',');
                }
            } else {
                if (node.checked) {
                    let tl2 = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)));

                    tl2.forEach((val) => {
                        if (val.code == node.model.code) {
                            val.is_check = true;
                        }
                        val.is_check ? this.arrayStore.push(val.code) : '';
                    });

                    if (node.$parent.model) {
                        if (
                            node.$parent.model.children.length ==
                            node.$parent.model.children.filter((val) => {
                                return this.arrayStore.includes(val.code);
                            }).length
                        ) {
                            tl2.forEach((val) => {
                                if (val.code == node.$parent.model.code) {
                                    val.is_check = true;
                                }
                            });
                        }
                    }

                    if (node.$parent.model) {
                        node.$parent.model.children = tl2.filter((val) => {
                            return node.$parent.model.code == val.code;
                        })[0].children;
                    }

                    this.copyList = this.checkChildren(this.deepFilter(tl2, (node) => node.name.includes(this.searchName))).filter((val) => {
                        return this.toggleArr.includes(val.parentCode);
                    });

                    this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)))
                        .filter((val) => {
                            return !val.children && val.is_check == true;
                        })
                        .forEach((val) => {
                            this.selectList = [];
                            this.check_Array.push(val);
                            const set = [...new Set(this.check_Array)];
                            this.check_Array = set;

                            this.check_Array.forEach((val) => {
                                this.selectList.push(val.code);
                            });

                            this.check_list = this.selectList.join(',');
                        });
                } else {
                    if (this.selectList.includes(node.model.code)) {
                        node.model.is_check = false;
                        this.selectList.splice(this.selectList.indexOf(node.model.code), 1);
                    }

                    let tl2 = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)));

                    tl2.forEach((val) => {
                        this.arrayStore.push(val.code);
                    });

                    if (
                        node.$parent.model != undefined &&
                        node.$parent.model.children.length !=
                            node.$parent.model.children.filter((val) => {
                                return val.is_check == true && this.arrayStore.includes(val.code);
                            }).length
                    ) {
                        tl2.forEach((val) => {
                            if (val.code == node.$parent.model.code) {
                                val.is_check = false;
                            }
                        });
                    }

                    if (node.$parent.model) {
                        node.$parent.model.children = tl2.filter((val) => {
                            return node.$parent.model.code == val.code;
                        })[0].children;
                    }

                    this.copyList = this.checkChildren(this.deepFilter(tl2, (node) => node.name.includes(this.searchName))).filter((val) => {
                        return this.toggleArr.includes(val.parentCode);
                    });

                    this.check_Array = this.check_Array.filter((val) => {
                        return this.selectList.includes(val.code);
                    });

                    this.check_list = this.selectList.join(',');
                }
            }

            if (node.$parent.model) {
                let tl = node.$parent.model.children;

                let tl2 = tl.filter((val) => {
                    return val.is_check == true;
                });

                if (node.checked) {
                    tl2.forEach((val) => {
                        if (val.code == node.model.code) {
                            tl2.splice(tl2.indexOf(val), 1);
                        }
                    });

                    tl2.push(node.model);
                } else {
                    tl2 = tl2.filter((val) => {
                        return val.code != node.model.code;
                    });
                }

                if (tl.length == tl2.length) {
                    node.$parent.model.is_check = true;

                    if (node.$parent.$parent.model) this.nodeParentCheck(node.$parent.$parent, node.$parent.$parent.model.children);
                } else {
                    node.$parent.model.is_check = false;

                    if (node.$parent.$parent.model) this.nodeParentCheck(node.$parent.$parent, node.$parent.$parent.model.children);
                }
            }
        },
        nodeParentCheck(parent, list) {
            let cnt = 0;
            list.forEach((val) => {
                if (val.is_check == true) {
                    cnt++;
                }
            });

            if (cnt == list.length) {
                parent.model.is_check = true;
                if (parent.$parent.model) {
                    this.nodeParentCheck(parent.$parent, parent.$parent.model.children);
                }
            } else {
                parent.model.is_check = false;
                if (parent.$parent.model) {
                    this.nodeParentCheck(parent.$parent, parent.$parent.model.children);
                }
            }

            if (!parent.$parent.model) {
                let res = [];

                this.copyList.forEach((val) => {
                    if (val.code == parent.model.code) {
                        val = parent.model;
                    }
                    res.push(val);
                });

                this.copyList = res;
            }
        },
        itemClickChild(list, value) {
            let parent = '';

            if (value != 1) {
                list.forEach((val) => {
                    if (val.code == value) {
                        val.is_check = false;

                        list.forEach((val2) => {
                            if (val2.code == val.parentCode) {
                                val2.is_check = false;
                                parent = val2.parentCode;
                            }
                        });
                    }
                });
                if (parent != 0 && parent != '') this.itemClickChild(list, parent);
            } else {
                list[0].is_check = false;
            }

            return list;
        },

        searchCheckChild(list, value) {
            let parent = '';

            list.forEach((val) => {
                if (value == val.code) {
                    parent = val.parentCode;

                    if (parent != 0 && parent != '') {
                        if (
                            list
                                .filter((val2) => {
                                    return val2.code == parent;
                                })[0]
                                .children.filter((val3) => {
                                    return val3.is_check == true;
                                }).length ==
                            list.filter((val2) => {
                                return val2.code == parent;
                            })[0].children.length
                        ) {
                            list.filter((val2) => {
                                return val2.code == parent;
                            })[0].is_check = true;
                        } else {
                            list.filter((val2) => {
                                return val2.code == parent;
                            })[0].is_check = false;
                        }
                    }
                }
            });

            if (parent != 0 && parent != '') this.searchCheckChild(list, parent);

            return list;
        },
        toggle(e, type) {
            if (type) {
                if (this.toggleArr.includes(e)) {
                    this.checkChildren(
                        this.visibleItems.filter((val) => {
                            return val.code == e;
                        })[0],
                    ).forEach((e) => {
                        this.toggleArr = this.toggleArr.filter((val) => {
                            return val != e.parentCode;
                        });
                    });
                } else {
                    this.toggleArr.push(e);
                }
            } else {
                let result = [];

                if (e.target) {
                    e.list.forEach((val) => {
                        this.check_Array.includes(val) ? this.check_Array.splice(this.check_Array.indexOf(val), 1) : this.check_Array.push(val);
                    });
                } else {
                    e.list.forEach((val) => {
                        this.check_Array.splice(this.check_Array.indexOf(val), 1);
                    });
                }

                this.check_Array.forEach((val) => {
                    result.push(val.code);
                });

                this.check_list = result.join(',');
            }
        },
        deepFilter(nodes, cb, parentCode) {
            return nodes
                .map((node) => {
                    if (cb(node)) {
                        if (node.num == undefined) {
                            node.num = 1;
                        }

                        if (node.parentCode == undefined) {
                            node.parentCode = '0';
                        }

                        return node;
                    }

                    if (node.children) {
                        for (let i = 0; i < node.children.length; i++) {
                            node.children[i].parentCode = node.code;
                            node.children[i].num = node.num + 1;
                        }
                    }
                    let children = this.deepFilter(node.children || [], cb);
                    return children.length && { ...node, children };
                })
                .filter(Boolean);
        },

        checkChildren(data, list, num) {
            if (num == undefined) num = 1;
            if (list == undefined) list = [];
            let branch = '';

            if (data.children) {
                branch = data.children;
            } else {
                branch = data;
            }

            for (let i = 0; i < branch.length; i++) {
                branch[i].parentCode = branch[i].parentCode == '0' ? '0' : data.code ? data.code : 1;
                branch[i].num = num;
                list.push(branch[i]);
                if (branch[i].children) {
                    num++;
                    this.checkChildren(branch[i], list, num);
                    num--;
                }
            }

            return list;
        },

        classBind(val) {
            if (!this.searchName) {
                return val;
            }

            return String(val).replace(this.searchName, `<span class="is-hl-inputkeyword">${this.searchName}</span>`);
        },

        // 확인버튼 클릭
        evt_confirmClick() {
            if (this.multiple && this.treeView) {
                this.tmpSelected = this.check_list.split(',');
            }

            const result = this.tmpSelected.length ? this.tmpSelected.join(',') : null;

            this.$emit('input', result);
            this.$emit('change', result);
            this.expanded = false;
        },
        evt_docClick(e) {
            if (!this.$el.contains(e.target)) {
                this.expanded = false;
                this.selectedIdx = -1;
            }
        },
        evt_inputClick($e) {
            this.expanded = !this.expanded;
            this.$emit('click');
        },
        evt_itemClick($e) {
            const value = String($e.target.value);

            const toggleSelection = (list, item) => {
                const index = list.indexOf(item);
                return index === -1 ? [...list, item] : list.filter((i) => i !== item);
            };

            if (!this.multiple) {
                this.expanded = false;
                this.selected = value;
                this.searchName = '';
            } else {
                $e.stopPropagation();
                this.tmpSelected = toggleSelection(this.tmpSelected, value);

                if (this.treeView) {
                    this.check_Array = this.check_Array.filter((item) => this.tmpSelected.includes(item.code));

                    console.log(this.check_Array);
                    // this.check_Array = this.check_Array.filter(val => {
                    //     return tmp.includes(val.code);
                    // });
                    // this.selectList = tmp;
                    // this.check_list = tmp.join(',');
                    // let tl = this.checkChildren(this.deepFilter(this.copyList, node => node.name.includes(this.searchName)));
                    // tl = this.itemClickChild(tl, $e.target.value);
                    // this.copyList = this.checkChildren(this.deepFilter(tl, node => node.name.includes(this.searchName))).filter(val => {
                    //     return this.toggleArr.includes(val.parentCode);
                    // });
                }
            }
        },

        evt_allCancleClick() {
            if (this.treeView && this.multiple) {
                this.selectList = [];
                this.check_Array = [];

                let tt = this.checkChildren(this.deepFilter(this.opts, (node) => node.name.includes('')));

                tt.forEach((val) => {
                    val.is_check = false;
                });

                this.copyList = this.checkChildren(this.deepFilter(this.opts, (node) => node.name.includes(this.searchName))).filter((val) => {
                    return this.toggleArr.includes(val.parentCode);
                });

                let tl2 = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName))).filter((val) => {
                    return !val.children;
                });

                this.check_Array = this.check_Array.filter((it) => !tl2.includes(it));

                this.check_Array.forEach((val) => {
                    this.selectList.push(val.code);
                });

                this.check_list = this.selectList.join(',');
            } else {
                this.tmpSelected = [];
            }
        },
        evt_allChkClick($e) {
            this.selectList = [];

            if (this.treeView && this.multiple) {
                this.check_Array = [];

                // 검색어로 필터링된 트리에서 자식 노드가 없는 노드들만 check_Array에 추가
                this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)))
                    .filter((val) => !val.children)
                    .forEach((val) => {
                        this.check_Array.push(val);
                    });

                // 중복 제거
                this.check_Array = [...new Set(this.check_Array)];

                // 선택된 노드들의 code를 selectList에 추가
                this.check_Array.forEach((val) => {
                    this.selectList.push(val.code);
                });

                // 선택된 코드들을 문자열로 변환
                this.check_list = this.selectList.join(',');

                // 필터링된 트리의 모든 노드를 체크 상태로 변경
                let filteredTree = this.checkChildren(this.deepFilter(this.copyList, (node) => node.name.includes(this.searchName)));
                filteredTree.forEach((val) => {
                    val.is_check = true;
                });

                // toggleArr에 포함된 parentCode를 가진 노드들만 필터링
                if (this.toggleArr && this.toggleArr.length) {
                    this.copyList = filteredTree.filter((val) => this.toggleArr.includes(val.parentCode));
                } else {
                    this.copyList = filteredTree;
                }
            } else {
                // 트리뷰가 아닌 경우, 비활성화되지 않은 모든 항목의 code를 선택
                this.tmpSelected = this.opts.filter((item) => !item.disabled).map((item) => String(item.code));
            }
        },
        evt_resizeScroll() {
            this.expanded = false;
        },
        getScrollParents($node) {
            let result = [];

            getElements($node);

            function getElements($el) {
                if ($el == null) {
                    return null;
                }

                if ($el.scrollHeight > $el.clientHeight) {
                    result.push($el);
                    return getElements($el.parentNode);
                } else {
                    return getElements($el.parentNode);
                }
            }

            return result;
        },

        set_rePos() {
            if (this.expanded) {
                const $input = $(this.$refs.input);
                const $list = $(this.$refs.list);
                const inputOffset = $input.offset();
                const inputHeight = $input.outerHeight();
                const inputWidth = $input.outerWidth();
                const windowHeight = $(window).height();
                const windowWidth = $(window).width();
                const scrollTop = $(document).scrollTop();
                const scrollLeft = $(document).scrollLeft();

                // useAnchorWidth가 true이고 expandWidth가 undefined일 때 input의 너비를 사용
                if (this.useAnchorWidth && !this.expandWidth) {
                    $list.css('width', inputWidth + 'px');
                }

                const listHeight = $list.outerHeight() || 500; // 기본값 또는 실제 높이
                const listWidth = this.useAnchorWidth && this.expandWidth === undefined ? inputWidth : $list.outerWidth();

                // 기본 위치 (input 아래)
                let top = inputOffset.top - scrollTop + inputHeight;
                let left = inputOffset.left - scrollLeft;

                // 수직 방향 체크
                const spaceBelow = windowHeight - (inputOffset.top - scrollTop + inputHeight);
                const spaceAbove = inputOffset.top - scrollTop;

                // 아래쪽 공간이 부족하고 위쪽 공간이 충분하면 위로 표시
                if (spaceBelow < listHeight && spaceAbove > listHeight) {
                    top = inputOffset.top - scrollTop - listHeight;
                }

                // 수평 방향 체크
                const spaceRight = windowWidth - (inputOffset.left - scrollLeft);

                // useAnchorWidth true일 때도 오른쪽 공간 부족하면 오른쪽 정렬
                if (spaceRight < listWidth) {
                    // input 요소의 오른쪽 끝에 맞춰 정렬
                    left = inputOffset.left - scrollLeft + (inputWidth - listWidth);
                }

                // 최대 높이 설정
                const maxHeight = Math.min(500, windowHeight - Math.abs(top) - 10);

                this.pos_top = top;
                this.pos_left = left;
                this.max_hgt = maxHeight;
                this.multi_scroll_hgt = windowHeight - 134 - 35 - 50;
            }
        },

        evt_listScroll($e) {
            this.visibleIdxS = this.$refs.expandWrap ? Math.max(0, Math.floor(this.$refs.expandWrap.scrollTop / 23) - 20) : 0;
            this.visibleIdxE = this.visibleIdxS + 50;
            if (this.$refs.expandList) {
                this.paddingTop = this.visibleIdxS * 23;
                this.paddingBottom = Math.max(0, (this.opts.length - this.visibleIdxE) * 23);
            }
        },
    },
    beforeDestroy() {
        // observer 해제
        if (this.resizeObserver) this.resizeObserver.disconnect();
    },
    directives: {
        // 달력 Insereted
        init: {
            inserted: function (el, binding, vnode) {
                vnode.context.set_rePos();
                vnode.context.evt_listScroll();
            },
        },
        // 셀렉트 항목
        uncheckInit: {
            inserted: function (el, binding, vnode) {
                vnode.context.uncheckListHgt = parseInt(el.getBoundingClientRect().height * 0.45);
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
