<template>
    <div ref="treeView" class="ui-tree-view is-loading" :class="{ 'is-loading': loading }">
        <InputSearch ref="inputs" @search="inputSearchClick" @evt_confirm="evt_confirm" :editType="editType" :nodeInstance="nodeInstance" />

        <!-- 드래그 기능 O -->
        <virtual-list v-if="dragAble && copyList.length > 0" class="wrap" data-key="g_code" :data-sources="copyList" :data-component="{}" :keeps="40" :estimate-size="40" wrap-class="list-wrap" v-sortable="{ data: copyList, wrapClass: 'list-wrap', itemClass: 'comp-item', targetClass: sortTargetClass }" @listUpdate="listUpdate">
            <template #item="{ index, item }">
                <div class="comp-item" :data-index="index" :data-select-key="dataIndexKey ? item[dataIndexKey] : index" :data-drag-group="item.p_code">
                    <component :is="getComponent" :maxNode="maxNode" :value="item" @nodeClick="nodeClick" @dbClick="dbClick" @evt_delete="evt_delete" @evt_modify="evt_modify" @evt_confirm="evt_confirm" @openTree="openTree" :nodeInstance="nodeInstance" :openFolder="openFolder" :getShowExpand="getShowExpand" />
                </div>
            </template>
        </virtual-list>

        <!-- 드래그 기능 X -->

        <virtual-list v-else-if="!dragAble && copyList.length > 0" class="wrap" data-key="g_code" :data-sources="copyList" :data-component="{}" :keeps="40" :estimate-size="40" wrap-class="list-wrap">
            <template #item="{ index, item }">
                <component v-on="eventTargetList" :is="getComponent" :maxNode="maxNode" :value="item" @nodeClick="nodeClick" @dbClick="dbClick" @evt_delete="evt_delete" @evt_modify="evt_modify" @evt_confirm="evt_confirm" @openTree="openTree" :nodeInstance="nodeInstance" :openFolder="openFolder" :getShowExpand="getShowExpand" />
            </template>
        </virtual-list>

        <div v-else class="nodata-wrap">
            <div class="ui_no_data_txt">데이터가 없습니다</div>
        </div>
    </div>
</template>

<script>
import { isEmpty } from 'lodash';

import BasicItem from './components/item/basic';
import CustomItem from './components/item/custom';
import InputSearch from './components/search/input';

export default {
    name: 'tree-view',
    data() {
        return {
            eventTargetList: {},

            list: [], // 초기 세팅값
            copyList: [], // 트리뷰 그려주는 json

            selectList: [], // 멀티타입 선택 기능 시 선택 된 노드 정보 배열
            copyCloseFolder: [],
            addList: [], // 트리뷰 내 추가 된 노드 정보 리스트 (임시 보관용)

            searchText: '', // 노드 이름 검색 후 임시 저장소
            openFolder: [], // 폴더리스트 중 열린 폴더 키값 모음
            wrapHeight: 0,
            selectNode: {}, // 선택 된 노드 정보
            select: false, // 선택 가능 여부 처리
        };
    },
    components: {
        BasicItem, // 기본 컴포넌트
        InputSearch, // 검색영역 컴포넌트
        CustomItem, // 외부 커스텀 컴포넌트 사용 시
    },
    props: {
        selectBox: { type: Boolean, default: false }, // selectBox 용
        dragAble: { type: Boolean, default: false }, // 트리뷰 드래그 기능
        dataIndexKey: { type: String, default: null }, // data-index 설정(selectable의 키값으로 사용)
        sortTargetClass: { type: String, default: '' }, // 정렬 타겟 클래스
        value: {
            type: String,
        },
        opts: { require: true }, // data list
        loading: {
            type: Boolean,
            default: false,
        },
        editType: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        maxNode: { type: Number, default: 2 }, // 트리뷰 최대 노드 depth
        nodeInstance: {
            type: Object,
            default: () => {
                return {
                    component: {
                        nodeCustom: {},
                        searchCustom: {},
                    },
                    event: {},
                    props: {},
                };
            },
        },
    },
    computed: {
        //maxNode 1뎁스 이상이며 1뎁스의 자식 노드가 존재 할 경우에만 각 노드 아이템의 앞 부분 공간 생성 (반대로는 공간 삭제)
        getShowExpand() {
            let tmp = this.list.filter((item) => {
                if (item.children.length > 0) {
                    return item;
                }
            });

            return this.maxNode > 1 && tmp.length > 0;
        },
        getComponent() {
            if (this.nodeInstance.component.nodeCustom && !isEmpty(this.nodeInstance.component.nodeCustom)) {
                return CustomItem;
            } else {
                return this.editType ? CustomItem : BasicItem;
            }
        },
        virtualStyle() {
            return `height:calc(100% - ${this.wrapHeight + 10}px); `;
        },
    },
    created() {
        for (let item in this.nodeInstance.event) {
            this.eventTargetList[item] = (...v) => {
                this.$emit(item, ...v);
            };
        }

        if (this.value == undefined) {
            this.select = false;
        } else {
            this.select = true;
            if (this.multiple && this.value.length > 0) {
                this.selectList = this.value.split(',');
            }
        }

        this.copyCloseFolder = [];
        this.addList = [];

        this.list = JSON.parse(JSON.stringify(this.opts));

        this.reMakeNodeChildArray(this.list);

        this.copyList = structuredClone(this.list);

        this.bindClassSelect();

        if (this.selectBox) {
            let tmp = this.flattenWithParentCode(this.list);
            let result = this.value.split(',');

            tmp.forEach((item) => {
                if (result.includes(String(item.g_code)) && item?.p_code) {
                    this.findParentList(tmp, item, []);
                }
            });

            this.searchClick();
        } else {
            this.openFolder = [];
        }
    },

    watch: {
        value(val) {
            if (this.selectBox) {
                this.selectList = val.split(',');
                this.searchClick();
            }
        },
        selectNode(val) {
            if (this.multiple) {
                this.$emit('input', this.selectList.join(','));
                // this.$emit('getSelectData', val);
            } else {
                if (val.g_code != undefined) {
                    this.$emit('input', val.g_code.toString());
                    // this.$emit('getSelectData', val);
                }
            }
        },
        opts(val) {
            this.list = JSON.parse(JSON.stringify(val));

            this.reMakeNodeChildArray(this.list);
            this.copyList = structuredClone(this.list);

            this.searchClick();
        },
    },
    methods: {
        getSelectData() {
            return this.selectNode;
        },
        /**
         * 트리뷰 드래그 이벤트 처리 시 list, copyList 데이터 변경 함수
         * @param {Arrary} arr 변경하고자 하려는 배열
         * @param {Object} dragCode 드래그 하려는 node code
         * @param {Arrary} tgCode 드래그 대상 node code
         */

        flattenModfiyWithDrag(arr, dragCode, tgCode) {
            if (arr.children) {
                let result = arr.children.find((item) => {
                    return item.g_code == dragCode;
                });
                if (isEmpty(result)) {
                    arr.children.forEach((item) => {
                        this.flattenModfiyWithDrag(item, dragCode, tgCode);
                    });
                } else {
                    let dragIdx = arr.children.findIndex((item) => {
                        return item.g_code == dragCode;
                    });

                    let tgIdx = arr.children.findIndex((item) => {
                        return item.g_code == tgCode;
                    });

                    let delItem = arr.children.splice(dragIdx, 1);

                    arr.children.splice(tgIdx, 0, delItem[0]);
                }
            } else {
                let result = arr.find((item) => {
                    return item.g_code == dragCode;
                });

                if (isEmpty(result)) {
                    arr.forEach((item) => {
                        this.flattenModfiyWithDrag(item, dragCode, tgCode);
                    });
                } else {
                    let dragIdx = arr.findIndex((item) => {
                        return item.g_code == dragCode;
                    });

                    let tgIdx = arr.findIndex((item) => {
                        return item.g_code == tgCode;
                    });

                    let delItem = arr.splice(dragIdx, 1);

                    arr.splice(tgIdx, 0, delItem[0]);
                }
            }
        },

        /**
         * sortable 디렉티브 이벤트 결과 값 처리 함수
         * @param {Object} val 이벤트 처리 결과값
         */

        listUpdate(val) {
            let dragIdx = val.detail?.dragIdx;
            let tgIdx = val.detail?.tgIdx;

            let dragCode = this.copyList[dragIdx].g_code;
            let tgCode = this.copyList[tgIdx].g_code;

            this.flattenModfiyWithDrag(this.list, dragCode, tgCode);

            this.searchClick();
            this.$emit('update', val);
        },

        // 트리뷰 노드 등록 이벤트 결과 값 확인 함수
        evt_confirm(newChild) {
            this.$emit('evt_confirm', newChild);
        },

        // 트리뷰 노드 수정 이벤트 결과 값 확인 함수
        evt_modify(data, type) {
            this.$emit('evt_modify', data, type);
        },

        // 트리뷰 노드 삭제 이벤트 결과 값 확인 함수
        evt_delete(data) {
            this.$emit('evt_delete', data);
        },

        dbClick(data) {
            this.$emit('dbClick', data);
        },

        /**
         * 배열을 flat 처리 하는 재귀함수
         * @param {Arrary} arr 함수
         */

        flattenWithParentCode(arr) {
            return arr.reduce((acc, item) => {
                // 부모 코드와 현재 코드를 조합하여 새 코드 생성

                if (Array.isArray(item.children) && item.children.length > 0) {
                    // 현재 항목에 하위 배열이 있는 경우, 재귀적으로 평탄화하여 결과에 추가
                    if (item.treeLevel > this.maxNode) {
                        return acc;
                    } else {
                        return acc.concat(item, ...this.flattenWithParentCode(item.children));
                    }
                } else {
                    if (item.treeLevel > this.maxNode) {
                        return acc;
                    } else {
                        // 현재 항목에 하위 배열이 없는 경우 현재 항목만 결과에 추가
                        return acc.concat(item);
                    }
                }
            }, []);
        },

        /**
         * 특정 node의 toggle 이벤트 실행 시 상위/하위 노드를 결과 값에 따라
         * 보여줄지 말지 체크 해주는 함수
         * @param {Arrary} parent 부모 배열
         * @param {Object} child 부모 배열에 값이 있는지 확인하려는 node 정보
         * @param {Arrary} list 결과 값을 담기 위한 배열
         */

        findParentList(parent, child, list) {
            if (child.p_code != undefined) {
                let idx = parent.findIndex((v) => {
                    return v.g_code == child.p_code;
                });

                if (idx == -1) {
                    return;
                }

                if (parent[idx].p_code != undefined) {
                    this.findParentList(parent, parent[idx], list);
                }

                this.openFolder.push(parent[idx].g_code);
                this.openFolder = this.openFolder.filter((item) => {
                    return !this.copyCloseFolder.includes(item);
                });

                list.push(parent[idx]);
            }
        },

        /**
         * 트리뷰를 그리는 배열 내부에 자신의 부모가 없을 경우 해당 배열에서 제거 되는 함수
         *
         * @param {Arrary} list 트리뷰 그리는 배열
         * @param {Object} item 부모 배열에 값이 있는지 확인하려는 node 정보
         */

        checkParent(list, item) {
            if (item.p_code != undefined) {
                let idx = list.findIndex((v) => {
                    return v.g_code == item.p_code;
                });

                if (idx == -1) {
                    let idx2 = list.findIndex((v) => {
                        return v.g_code == item.g_code;
                    });

                    if (idx2 == -1) {
                        return;
                    }

                    if (list[idx2].children != undefined && list[idx2].children.length > 0) {
                        list[idx2].children.forEach((val) => {
                            this.checkParent(list, val);
                        });
                        list.splice(idx2, 1);
                    } else {
                        list.splice(idx2, 1);
                    }
                }
            }
        },

        /**
         * 검색 시 결과값 처리 하는 함수
         * 나온 결과값 내에서 노드를 추가하거나 삭제하거나 toggle 동작을 수행하기 위한 list를 return 함
         * @param {Arrary} arr 함수
         * @param {Sring} value 검색 하려는 값
         * @param {Arrary} list 결과값이 담긴 Array
         */

        findValueInMultidimensionalArray(arr, value, list) {
            if (list == null || list == undefined) list = [];

            if (arr.children) {
                if (arr.children.length > 0) {
                    let flattenList = this.flattenWithParentCode([arr]);

                    let flattenFilterList = flattenList.filter((val) => {
                        if (
                            val.name.toUpperCase().includes(value.toUpperCase()) ||
                            this.addList.filter((item) => {
                                return item.g_code == val.g_code;
                            }).length > 0
                        )
                            return (
                                val.name.toUpperCase().includes(value.toUpperCase()) ||
                                this.addList.filter((item) => {
                                    return item.g_code == val.g_code;
                                }).length > 0
                            );
                    });

                    if (flattenFilterList.length > 0) {
                        list.push(arr);

                        flattenFilterList.forEach((item) => {
                            this.findParentList(flattenList, item, list);

                            list.push(item);

                            let childList = this.flattenWithParentCode([item]);

                            childList.forEach((x) => {
                                list.push(x);
                            });

                            if (item.children != undefined) {
                                for (let j = 0; j < item.children.length; j++) {
                                    list.push(item.children[j]);

                                    this.findValueInMultidimensionalArray(item.children[j], value, list);
                                }
                            }
                        });
                    }

                    this.openFolder = [...new Set(this.openFolder)];
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (
                        arr[i].name.toUpperCase().includes(value.toUpperCase()) ||
                        this.addList.filter((item) => {
                            return item.g_code == arr[i].g_code;
                        }).length > 0
                    ) {
                        list.push(arr[i]);
                    }
                    this.findValueInMultidimensionalArray(arr[i], value, list);
                }
            }

            list = [...new Set(list)];

            list = list.filter((item) => {
                return item.p_code == undefined || this.openFolder.includes(item.p_code);
            });

            list.forEach((item) => {
                this.checkParent(list, item);
            });

            return list;
        },

        /**
         * 트리뷰에 있는 검색 폼에서 search 이벤트 실행 시 발생 되는 함수
         * @param {Sring} searchName 검색 하려는 값
         */

        inputSearchClick(searchName) {
            this.copyCloseFolder = [];

            this.addList = [];
            this.searchText = '';

            if (searchName.length > 0) {
                this.searchText = searchName;
                let searchResult = this.findValueInMultidimensionalArray(this.list, this.searchText);

                let tmp = searchResult.map((item) => {
                    if (this.openFolder.includes(item.g_code)) {
                        item.is_open = true;
                    } else {
                        item.is_open = false;
                    }

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    // if (this.selectNode.g_code == item.g_code) {
                    //     item.is_select = true;
                    // } else {
                    //     item.is_select = false;
                    // }
                    return item;
                });

                searchResult = structuredClone(tmp);

                this.copyList = searchResult.filter((val) => {
                    return val.p_code == undefined || this.openFolder.includes(val.p_code);
                });
            } else {
                this.openFolder = [];
                let flattenList = this.flattenWithParentCode(this.list);

                let flattenFilterList = flattenList.filter((item) => {
                    return !item.p_code;
                });

                this.copyList = flattenFilterList;

                if (this.select && Object.entries(this.selectNode).length == 0) {
                    // this.nodeClick(this.copyList[0]);
                }

                let tmp = this.copyList.map((item) => {
                    item.is_open = false;

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    return item;
                    // if (item.g_code == this.selectNode.g_code) {
                    //     item.is_select = true;
                    //     return item;
                    // } else {
                    //     item.is_select = false;
                    //     return item;
                    // }
                });

                this.copyList = structuredClone(tmp);
            }
        },

        /**
         * 트리뷰에 있는 폴더 형태 노드 중 open 되어 있는 폴더가 없을 경우 실행
         * searchClick 메소드의 분기를 분리하는 용도
         */

        noToggleOpenFolderSearch() {
            if (this.searchText.length < 1) {
                this.openFolder = [];

                let flattenList = this.flattenWithParentCode(this.list);

                let flattenFilterList = flattenList.filter((item) => {
                    return item.p_code == undefined || this.openFolder.includes(item.p_code);
                });

                let tmp = flattenFilterList.map((item) => {
                    if (this.openFolder.includes(item.g_code)) {
                        item.is_open = true;
                    } else {
                        item.is_open = false;
                    }

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    return item;
                });

                this.copyList = structuredClone(tmp);
                this.bindClassSelect();

                if (this.select && isEmpty(this.selectNode)) {
                    let tmp = this.flattenWithParentCode(this.list);

                    let findItem = tmp.filter((item) => {
                        return item.g_code == String(this.value);
                    });

                    // if (findItem.length > 0) this.nodeClick(findItem[0]);
                }
            } else {
                let searchResult = this.findValueInMultidimensionalArray(this.list, this.searchText);

                let tmp = searchResult.map((item) => {
                    if (this.openFolder.includes(item.g_code)) {
                        item.is_open = true;
                    } else {
                        item.is_open = false;
                    }

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    return item;
                });

                searchResult = structuredClone(tmp);

                this.copyList = searchResult.filter((val) => {
                    return val.p_code == undefined || this.openFolder.includes(val.p_code);
                });
            }
        },

        /**
         * 트리뷰에 있는 폴더 형태 노드 중 이미 open 되어 있는 폴더가 있을 경우 실행
         * searchClick 메소드의 분기를 분리하는 용도
         */

        toggleOpenFolderSearch() {
            if (this.searchText.length > 0) {
                let searchResult = this.findValueInMultidimensionalArray(this.list, this.searchText);

                let tmp = searchResult.map((item) => {
                    if (this.openFolder.includes(item.g_code)) {
                        item.is_open = true;
                    } else {
                        item.is_open = false;
                    }

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    return item;
                });

                searchResult = structuredClone(tmp);

                this.copyList = searchResult.filter((item) => {
                    return item.p_code == undefined || this.openFolder.includes(item.p_code);
                });
            } else {
                let flattenList = this.flattenWithParentCode(this.list);

                let flattenFilterList = flattenList.filter((item) => {
                    return item.p_code == undefined || this.openFolder.includes(item.p_code);
                });

                let tl = structuredClone(flattenFilterList);

                flattenFilterList.forEach((item) => {
                    this.checkParent(tl, item);
                });

                let tmp = tl.map((item) => {
                    if (this.openFolder.includes(item.g_code) && item.children.length > 0) {
                        item.is_open = true;
                    } else {
                        item.is_open = false;
                    }

                    let result = this.value.split(',');

                    if (result.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }

                    return item;
                });

                this.copyList = structuredClone(tmp);
                this.bindClassSelect();
            }
        },

        /**
         * 받아온 opts 값 내 키워드값을 검색하거나 트리뷰 노드를 다시 그리기 위한 함수
         * 기능에 따라서 함수를 분리 해야할 수 있음
         * @param {Arrary} arr 함수
         * @param {String, Object} type 검색 조건 관련해서 추가한 로직
         * */

        searchClick() {
            if (this.openFolder.length > 0) {
                this.toggleOpenFolderSearch();
            } else {
                this.noToggleOpenFolderSearch();
            }
        },

        /**
         * 트리뷰 node 클릭 시 클래스 부여하기 위한 함수
         * @param {Object} data  해당 노드 값
         */

        nodeClick(data) {
            if (this.select) {
                let node = data;
                if (data == undefined || data == null) {
                    node = {};
                }
                if (this.multiple) {
                    let idx = this.selectList.findIndex((val) => {
                        return val == node.g_code;
                    });
                    let tmp = this.selectList.filter((item) => {
                        return item != node.g_code;
                    });
                    if (idx == -1) {
                        tmp.push(String(node.g_code));
                    }
                    this.selectList = structuredClone(tmp);
                }
                this.selectNode = node;
                this.bindClassSelect();
                this.$emit('click', node);
            }
        },

        /**
         * 트리뷰 내 select 처리 된 node의 data를 변경 시켜 클래스를 부여하는 함수
         */

        bindClassSelect() {
            let tmp = this.copyList.map((item) => {
                if (this.multiple) {
                    if (this.selectList.includes(String(item.g_code))) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }
                    return item;
                } else {
                    if (item.g_code == this.selectNode.g_code) {
                        item.is_select = true;
                    } else {
                        item.is_select = false;
                    }
                    return item;
                }
            });

            this.copyList = structuredClone(tmp);
        },

        /**
         * 화면 그리는 복사 데이터인 this.list 내 노드 데이터 추가 시 사용 함수
         * @param {Arrary} arr 함수
         * @param {Object} node 추가하기 위한 해당 노드의 값
         */
        findAddNodeChildArray(arr, node) {
            if (arr.children) {
                for (let i = 0; i < arr.children.length; i++) {
                    if (arr.children[i].g_code === node.p_code) {
                        if (arr.children[i].children == undefined) {
                            arr.children[i].children = [];
                        }
                        arr.children[i].children.push(node);

                        this.addList.push(node);

                        if (
                            this.openFolder.filter((item) => {
                                return item == arr.children[i].g_code;
                            }).length < 1
                        ) {
                            this.openFolder.push(arr.children[i].g_code);
                        }

                        let index = this.copyCloseFolder.findIndex((d) => {
                            return d === node.g_code;
                        });
                        this.copyCloseFolder.splice(index, 1);
                    } else {
                        this.findAddNodeChildArray(arr.children[i], node);
                    }
                }
            } else {
                if (node.treeLevel == 1) {
                    arr.push(node);
                    this.addList.push(node);

                    return this.reMakeNodeChildArray(arr);
                }

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].g_code === node.p_code) {
                        this.addList.push(node);

                        if (
                            this.openFolder.filter((item) => {
                                return item == arr[i].g_code;
                            }).length < 1
                        ) {
                            this.openFolder.push(arr[i].g_code);
                        }

                        let index = this.copyCloseFolder.findIndex((d) => {
                            return d === node.g_code;
                        });
                        this.copyCloseFolder.splice(index, 1);

                        if (arr[i].children == undefined) {
                            arr[i].children = [];
                        }
                        return arr[i].children.push(node);
                    } else {
                        this.findAddNodeChildArray(arr[i], node);
                    }
                }
            }

            return null;
        },

        /**
         * 화면 그리는 복사 데이터인 this.list 내 노드 삭제 시 사용 함수
         * @param {Arrary} arr 함수
         * @param {String} value 삭제하기 위한 해당 노드의 코드값
         */
        findDeleteNodeChildArray(arr, data) {
            if (arr.children) {
                for (let i = 0; i < arr.children.length; i++) {
                    if (arr.children[i].g_code === data.g_code) {
                        arr.children = arr.children.filter((item) => {
                            return item.g_code != data.g_code;
                        });

                        if (arr.children.length == 0) {
                            let index = this.openFolder.findIndex((d) => {
                                return d === data.g_code;
                            });
                            this.openFolder.splice(index, 1);
                        }
                    } else {
                        this.findDeleteNodeChildArray(arr.children[i], data);
                    }
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].g_code === data.g_code) {
                        this.list = arr.filter((item) => {
                            return item.g_code != data.g_code;
                        });

                        let index = this.openFolder.findIndex((d) => {
                            return d === data.g_code;
                        });
                        this.openFolder.splice(index, 1);

                        return;
                    } else {
                        this.findDeleteNodeChildArray(arr[i], data);
                    }
                }
            }
        },

        /**
         * 화면 그리는 복사 데이터인 this.list 내 노드 데이터 수정 시 사용 함수
         * @param {Arrary} arr 함수
         * @param {String} value 수정하기 위한 해당 노드의 코드값
         */
        findModifyNodeChildArray(arr, data) {
            if (arr.children) {
                for (let i = 0; i < arr.children.length; i++) {
                    if (arr.children[i].g_code === data.g_code) {
                        for (const [key, value] of Object.entries(data)) {
                            arr.children[i][key] = value;
                        }
                        this.addList.push(data);
                    }

                    if (arr.g_code === data.g_code) {
                        arr.children[i].sg_seqs = data.sg_seqs;
                    }
                    arr.children[i].p_seqs = arr.sg_seqs;

                    this.findModifyNodeChildArray(arr.children[i], data);
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].g_code === data.g_code) {
                        for (const [key, value] of Object.entries(data)) {
                            arr[i][key] = value;
                        }

                        this.addList.push(data);
                    }
                    this.findModifyNodeChildArray(arr[i], data);
                }
            }
        },

        /**
         * 전달 받은 JSON 을 트리뷰 형태로 변경하는 함수
         * @param {Object} arr 변경하고자 하는 JSON 리스트
         */

        reMakeNodeChildArray(arr, pCode, treeLevel, pSeqs) {
            if (treeLevel == null || treeLevel == undefined) treeLevel = 1;

            if (arr.children) {
                for (let i = 0; i < arr.children.length; i++) {
                    if (arr.children[i].children == undefined) {
                        arr.children[i].children = [];
                    }

                    if (arr.children[i]?.k_seq) {
                        arr.children[i].g_code = arr.children[i].k_seq;
                    } else {
                        arr.children[i].g_code = arr.children[i].code ? arr.children[i].code : arr.children[i].name + '_' + i;
                    }

                    if (arr.children[i].g_code == pCode) {
                        arr.children[i].g_code = arr.children[i].g_code + '_' + i;
                    }

                    if (!this.multiple && this.select && arr.children.length > 0 && Object.entries(this.selectNode).length == 0) {
                        if (this.value.split(',').includes(String(arr.children[i].g_code))) {
                            // this.nodeClick(arr[i]);
                            this.selectNode = arr.children[i];
                        }
                    }

                    arr.children[i].treeLevel = treeLevel + 1;
                    arr.children[i].p_code = pCode;

                    // arr.children[i].sg_seqs = arr.children[i]?.sg_seqs ? arr.children[i].sg_seqs : '';

                    if (pSeqs != null) {
                        arr.children[i].p_seqs = pSeqs;
                    }

                    this.reMakeNodeChildArray(arr.children[i], arr.children[i].g_code, arr.children[i].treeLevel, arr.children[i].sg_seqs);
                }
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].children == undefined) {
                        arr[i].children = [];
                    }

                    arr[i].treeLevel = treeLevel;

                    // arr[i].sg_seqs = arr[i]?.sg_seqs ? arr[i].sg_seqs : '';

                    arr[i].filterGrpOn = false;

                    if (arr[i].k_seq != undefined) {
                        arr[i].g_code = arr[i].k_seq;
                    } else {
                        arr[i].g_code = arr[i].code != undefined ? arr[i].code : arr[i].name + '_' + i;
                    }

                    if (!this.multiple && this.select && arr.length > 0 && Object.entries(this.selectNode).length == 0) {
                        if (this.value.split(',').includes(String(arr[i].g_code))) {
                            // this.nodeClick(arr[i]);
                            this.selectNode = arr[i];
                        }
                    }

                    this.reMakeNodeChildArray(arr[i], arr[i].g_code, arr[i].treeLevel, arr[i].sg_seqs);
                }
            }
        },

        /**
         * 상위 컴포넌트에서 트리뷰 내 함수(수정)를 실행시키기 위한 용도
         * @param {Object} data 노드 정보
         */
        modifyTree(data) {
            this.findModifyNodeChildArray(this.list, data);

            this.addList = this.addList.filter((item) => {
                return item.g_code != data.g_code;
            });

            this.addList.push(data);

            this.$emit('update:opts', this.list);
        },

        /**
         * 상위 컴포넌트에서 트리뷰 내 함수(추가)를 실행시키기 위한 용도
         * @param {Object} data 노드 정보
         */
        addNode(data, id) {
            if (data != undefined) {
                this.findAddNodeChildArray(this.list, data);
            } else {
                // this.$emit('addNode', data);
            }

            this.$emit('update:opts', this.list);
        },

        /**
         *  상위 컴포넌트에서 트리뷰 내 함수(삭제)를 실행시키기 위한 용도
         * @param {Object} data 삭제하려는 해당 노드의 정보
         */

        deleteNode(data) {
            this.findDeleteNodeChildArray(this.list, data);
            this.searchClick();

            if (this.selectNode.g_code == data.g_code) {
                this.nodeClick(this.copyList[0]);
            }

            this.$emit('update:opts', this.list);
        },

        /**
         * 트리뷰 노드 토글 함수
         * this.openFolder 에 open 상태에 따라 받아온 노드값을 넣고 빼기
         * @param {Boolean} open 노드의 togle 상태
         * @param {Object} node 해당 노드의 정보
         */
        openTree(open, node) {
            if (open) {
                this.openFolder.includes(node.g_code) ? '' : this.openFolder.push(node.g_code);

                let index = this.copyCloseFolder.findIndex((d) => {
                    return d === node.g_code;
                });

                this.copyCloseFolder.splice(index, 1);

                this.searchClick();
            } else {
                let index = this.openFolder.findIndex((d) => {
                    return d === node.g_code;
                });

                this.openFolder.splice(index, 1);

                this.copyCloseFolder = this.copyCloseFolder.filter((item) => {
                    return item != node.g_code;
                });

                this.copyCloseFolder.push(node.g_code);

                this.searchClick();
            }
        },
    },
};
</script>
