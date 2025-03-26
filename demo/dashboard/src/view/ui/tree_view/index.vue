<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>TreeView</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/tree_view" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span><strong>TreeView</strong></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <comp-filter-grp pos="BL">
                                                <template v-slot:title> 설정</template>
                                                <template v-slot:items>
                                                    <dl>
                                                        <dt>
                                                            <strong>최대 노드 갯수</strong>
                                                        </dt>
                                                        <dd><comp-input-box id="set_maxNode" type="number" v-model="set.maxNode" placeholder="노드 갯수" label="노드갯수 입력" min="1" style="width: 100px"></comp-input-box></dd>
                                                    </dl>

                                                    <dl>
                                                        <dt>
                                                            <strong>멀티 기능</strong>
                                                        </dt>
                                                        <dd><comp-switch-btn id="set_multiple" class="is-small" v-model="set.multiple"></comp-switch-btn></dd>
                                                    </dl>
                                                    <dl>
                                                        <dt>
                                                            <strong>에디터 기능</strong>
                                                        </dt>
                                                        <dd><comp-switch-btn id="set_editType" class="is-small" v-model="set.editType"></comp-switch-btn></dd></dl
                                                ></template>
                                            </comp-filter-grp>
                                        </div>
                                        <div class="rc">
                                            <div class="grp">
                                                <strong class="title">크기</strong>
                                                <comp-input-box id="set_wid" v-model="set.size.wid" placeholder="가로 자동" label="가로 입력" style="width: 100px"></comp-input-box>
                                                <comp-input-box id="set_hgt" v-model="set.size.hgt" placeholder="세로 자동" label="세로 입력" style="width: 100px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp"><strong class="title">타입</strong><comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp></div>
                                            <hr />
                                            <div class="grp"><strong class="title">폴더 초기화</strong><comp-button @click="resetClick">초기화</comp-button></div>
                                        </div>
                                    </div>
                                    <div class="ui_row content" style="height: 100%; display: flex; justify-content: center; padding: 20px 0 0">
                                        <div class="wrap is-cols-pad">
                                            <div class="ui_col w14"><tree-view class="is-treeview" ref="treeView" v-model="nodeData" :style="getStyle" :editType="set.editType" :loading="loading" :opts.sync="opts2" @click.capture="nodeClick" @evt_delete="evt_delete" @evt_modify="modifyNode" @evt_confirm="addNode" :maxNode="Number(set.maxNode)" :nodeInstance="getNodeInstance" :multiple="set.multiple" @update="sortUpdate" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { uuid } from 'vue-uuid';
import { API_rkeywordGroupAdd, API_rkeywordGroupUpdate } from '@shared/api/rkeyword';

import CustomItem from './components/CustomItem';
import CustomSearch from './components/search/CustomSearch.vue';
let id = 1000;
export default {
    name: 'component-treeview',
    data() {
        return {
            nodeData: '',
            getItemsWrapPos: '',
            set: {
                multiple: false,
                maxNode: 2,
                size: {
                    wid: 300,
                    hgt: 600,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '기본형' },
                        { code: 1, name: '컴포넌트형' },
                    ],
                },
                clickType: {
                    value: 1,
                    opts: [
                        { code: 0, name: '단일' },
                        { code: 1, name: '다중' },
                    ],
                },
                filterType: {
                    value: 1,
                    opts: [
                        { code: 0, name: '기본형' },
                        { code: 1, name: '에디터형' },
                    ],
                },
                sortable: true,
                editType: true,
                datas: [],
            },
            loading: false,
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            filterGrpOn: false,
            input: {
                name: '',
                sg_seqs: '',
            },
            modify: {
                name: '',
                sg_seqs: '',
                p_seqs: '',
                use_yn: 'Y',
            },
            opts2: [
                {
                    code: 100,
                    name: 'test100',
                    children: [{ code: 101, name: 'test101' }],
                },
                {
                    code: 200,
                    name: 'test200',
                },
                {
                    code: 300,
                    name: 'test300',
                },
                {
                    code: 400,
                    name: 'test400',
                },
            ],
            list: [
                { code: '뉴스', name: '뉴스' },
                { code: '블로그', name: '블로그' },
                { code: '카페', name: '카페' },
                { code: '커뮤니티', name: '커뮤니티' },
                { code: '유튜브', name: '유튜브' },
                { code: '인스타그램', name: '인스타그램' },
                { code: '트위터', name: '트위터' },
            ],
        };
    },
    computed: {
        getNodeInstance() {
            return {
                component: { nodeCustom: this.getComponent, searchCustom: this.getSearchCustomComponent },
                event: {},
                props: {},
            };
        },
        getStyle() {
            return `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'}; height: ${this.set.size.hgt ? this.set.size.hgt + 'px' : 'auto'}`;
        },
        getSlots() {
            let result = '';
            if (this.set.filterType.value == 1) {
                result = 'addBtnSlot';
            } else {
                result = 'notBtnSlot';
            }
            return result;
        },

        getComponent() {
            return this.set.type.value == 1 ? CustomItem : {};
        },

        getSearchCustomComponent() {
            return this.set.type.value == 1 ? CustomSearch : {};
        },

        getSgSeqs() {
            if (this.$store.getters.getChns.length > 0) {
                return JSON.parse(JSON.stringify(this.$store.getters.getChns));
            } else {
                let list = JSON.parse(
                    JSON.stringify([
                        { code: 'c_93', name: 'c_93' },
                        { code: 'c_113', name: 'c_113' },
                        { code: 'c_94', name: 'c_94' },
                        { code: 'c_95', name: 'c_95' },
                        { code: 'c_97', name: 'c_97' },
                        { code: 'c_99', name: 'c_99' },
                        { code: 'c_100', name: 'c_100' },
                    ]),
                );

                list.map((item) => {
                    if (!this.modify.sg_seqs.includes(item.code)) {
                        item.disabled = true;
                    }
                });

                return list;
            }
        },
    },
    methods: {
        sortUpdate(val) {
            console.log('sortUpdate ==== >', val);
        },
        resetClick() {
            this.$refs.treeView.inputSearchClick('');
        },

        evt_delete(data) {
            this.$store
                .dispatch('DIALOG_WRN', ['삭제 시 하위 노드 변경이 있을 수 있습니다', '삭제하시겠습니까?', 2])
                .then(() => {
                    this.deleteNode(data);
                })
                .catch((err) => {
                    if (err != 3) {
                        this.$store.dispatch('DIALOG_ERR', ['키워드 그룹을 삭제하지 못했습니다', '키워드 그룹 삭제 실패', 0]);
                    }
                })
                .finally(() => {});
        },

        async deleteNode(data) {
            this.loading = true;
            this.$refs.treeView.deleteNode(data);
            this.loading = false;
        },

        async addNode(data) {
            id++;

            //생성된 코드 임시로 형태만 나옴 (api 나오면 수정 삭제 처리 할것)

            let newChild = {
                // ...data.data,
                treeLevel: data.data.treeLevel + 1,
                g_code: id,
                p_code: data.data.g_code,
                name: data.input.name,
                code: id,
            };

            this.$refs.treeView.addNode(newChild, id);
        },

        async modifyNode(data, type) {
            let modify = { ...data.data, name: data.input.name };

            this.$refs.treeView.modifyTree(modify);
        },

        nodeClick(data) {},

        /**
         * Level 1 그룹 내 하위 그룹 추가
         * 추가하기 위한 부모 node 값 this.addNode로 전달 및 validation 체크
         * @param {Object} data Level 1 해당 노드 값
         */
        evt_confirm(data) {
            let targetRef = `addGrp_${data.g_code}`;

            if (this.input.name.length < 1) {
                this.$store
                    .dispatch('DIALOG_ERR', ['키워드 그룹 이름은 빈값을 넣을 수 없습니다.', 0])
                    .then(($val) => {})
                    .catch(($err) => {});
            } else {
                const newChild = {
                    level: data.level,
                    name: this.input.name,
                    sg_seqs: this.input.sg_seqs,
                    p_seqs: data.sg_seqs,

                    use_yn: 'Y',
                    p_code: data.k_seq,
                    children: data.children,
                };

                this.addNode(newChild, id);
                this.$refs[targetRef].hndl_close();

                this.input.name = '';
                this.input.sg_seqs = '';
            }
        },
        /**
         * 노드 정보 수정
         * @param {Object} data Level 1 해당 노드 값
         * @param {String} type 수정하려는 컴포넌트 종류에 따라서 다르게 들어옴 (undefined, string, switch)
         */

        evt_modify(data, type) {
            let targetRef = `modifyGrp_${data.g_code}`;

            if (type == undefined) {
                if (this.modify.name.length < 1) {
                    this.$store.dispatch('DIALOG_ERR', ['키워드 그룹 이름은 빈값을 넣을 수 없습니다.', 0]);
                } else {
                    this.modifyNode(data, type);
                    this.$refs[targetRef].hndl_close();
                }
            } else {
                this.modifyNode(data, type);
            }
        },

        /**
         * toolGrp 창 종료 될 경우 실행
         */
        evt_cancel() {
            this.$refs.treeView.offTool();
        },

        /**
         * toolGrp 창 실행 될 경우 실행
         * @param {Object} data  해당 노드 값
         */

        handleNodeClick(data) {
            setTimeout(() => {
                // this.$refs.treeView.onTool(data);
            }, 100);

            this.input.name = '';
            this.modify.name = data.name;
            this.modify.sg_seqs = data.sg_seqs;
            this.modify.p_seqs = data.p_seqs;
            this.modify.edit_seqs = data.sg_seqs;
            this.input.sg_seqs = data.sg_seqs;
        },

        /**
         * 트리뷰 노드를 다시 그리는 메소드
         * @param {Object} data  해당 노드 값
         */

        searchNode(data) {
            this.$refs.treeView.searchClick(data);
        },
    },
};
</script>

<style src="./style.scss" lang="scss" />
