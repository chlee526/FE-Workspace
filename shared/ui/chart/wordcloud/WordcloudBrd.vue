<template>
    <div class="ui_brd is-data-v2 is-row-over is-sticky">
        <div class="wrap" ref="scrollContainer" :style="getHgt + '; max-height: none;'">
            <table>
                <colgroup>
                    <col style="width: 60px" />
                    <col />
                    <col v-if="useAttr" :style="'width:' + valueCellWid" />
                    <col :style="'width:' + valueCellWid" />
                    <col v-if="useFluc" :style="'width:' + valueCellWid" />
                </colgroup>
                <thead>
                    <tr>
                        <th><strong>순위</strong></th>
                        <th>
                            <strong>{{ labelName }}</strong>
                        </th>
                        <th v-if="useAttr"><strong>속성</strong></th>
                        <th>
                            <strong>{{ getVolumeTitle }}</strong>
                        </th>
                        <th v-if="useFluc"><strong>증감률</strong></th>
                    </tr>
                </thead>
                <!-- 데이터 없는 경우 -->
                <tbody v-if="getParseData.length == 0">
                    <tr v-for="idx in 4" :key="'a' + idx" class="is-no-over">
                        <td :colspan="brdOpts.colCnt"></td>
                    </tr>
                    <tr class="is-no-over">
                        <td :colspan="brdOpts.colCnt" class="no_over no_data in_list" style="text-align: center"><span class="ui_no_data_txt">데이터가 없습니다.</span></td>
                    </tr>
                    <tr v-for="idx in 5" :key="'b' + idx" class="is-no-over">
                        <td :colspan="brdOpts.colCnt"></td>
                    </tr>
                </tbody>
                <!-- // 데이터 없는 경우 -->

                <!-- 데이터 있는 경우 -->
                <tbody v-else ref="list">
                    <tr v-for="(item, idx) in getParseData" :data-code="item.code" :key="'c' + idx">
                        <th>
                            <span>{{ idx + 1 }}</span>
                        </th>
                        <td style="text-align: center">
                            <button v-if="toggleType" @click="evt_click(item)" :class="{ 'is-selected-rk': checked && checked.arrObjAttrToStr('code').strToArr().includes(item.code) }" :style="getSelectedItems(item) ? '--color:' + (fixActiveColor ? fixActiveColor : getSelectedItems(item).color) : ''">
                                <strong>{{ item.name }}</strong>
                            </button>
                            <strong v-else>{{ item.name }}</strong>
                        </td>
                        <td v-if="useAttr" style="text-align: center">
                            <span>{{ item.attrName }}</span>
                        </td>
                        <td class="is-number">
                            <button @click="evt_clickVolume(item)" class="ui_lnk" :title="String(item.weight).addComma()">
                                <span class="txt">{{ item.weight.lengthLimitComma(0) }}</span>
                            </button>
                        </td>
                        <td v-if="useFluc" class="is-number" style="max-width: 100px">
                            <span v-if="!item.new" class="ui_fluc is-box" :title="item.fluc.numToFluc('%')" v-html="item.fluc.numToFlucHtml('%', 'limit')"></span>
                            <span v-else class="ui_fluc is-box" title="New"><span class="is-new">New</span></span>
                        </td>
                    </tr>
                    <tr v-for="idx in brdOpts.rowCnt - getParseData.length > 0 ? brdOpts.rowCnt - getParseData.length : 0" :key="'d' + idx" class="is-no-over">
                        <td :colspan="brdOpts.colCnt"></td>
                    </tr>
                </tbody>
                <!-- // 데이터 있는 경우 -->
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'comp-chart-wordcloud-brd',
    data() {
        return {
            vshow: false,
            brdOpts: {
                colCnt: 3, // 게시판 Col
                rowCnt: 10, // 게시판 Row
            },
            attrCellWid: 0,
            valueCellWid: 0,
        };
    },
    props: {
        commonSearchOpts: { type: Object },
        toggleType: { type: String, default: null },
        rkData: {
            type: Array,
            default() {
                return [];
            },
        },
        value: { type: Array, default: null },
        visible: { type: Boolean },
        useAttr: { type: Boolean, defalut: false },
        useFluc: { type: Boolean, defalut: false },
        labelName: { type: String },
        fixActiveColor: { type: String, default: null },
        elHgt: { type: Number, default: 0 },
    },
    computed: {
        /**
         * v-model 연결
         */
        checked: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        /**
         * rkData 배열 가공, 새로운 데이터 배열 반환
         * @return {Array} 가공된 데이터 배열
         */
        getParseData() {
            const result = this.rkData.map((item) => {
                // 'type' 속성을 'rkeyword'로 설정
                item.type = 'rkeyword';

                // 'name' 속성을 설정 (keyword 또는 name 값 사용)
                item.name = item.keyword ? item.keyword : item.name;

                // 'fluc' 속성이 존재하면 숫자로 변환
                if (item.fluc) item.fluc = Number(item.fluc);

                return item;
            });
            return result;
        },

        /**
         * brd 높이 설정
         * @return {String} height style
         */
        getHgt() {
            let hgt = this.elHgt;
            // 정적 스타일(staticStyle)이 있는 경우
            if (this.$vnode.data.staticStyle) {
                hgt = this.$vnode.data.staticStyle.height.split('px')[0];
            }
            // 동적 스타일(style)이 있는 경우
            else if (this.$vnode.data.style) {
                hgt = this.$vnode.data.style.split(':')[1].split('px')[0];
            }
            // 기본 높이 설정
            else {
                return 'height: 404px';
            }
            return 'height:' + hgt + 'px';
        },
        /**
         * 정보량 title
         * @return {String} '정보량'
         */
        getVolumeTitle() {
            // return this.labelName == '검색어' ? '인기도' : '언급량';
            return '정보량';
        },
    },
    created() {
        if (this.getHgt) {
            const tableHeight = parseInt(this.getHgt.split('px')[0].split('height:')[1]);

            // 테이블 높이와 31px의 고정 행 높이를 기준으로 행 수 계산
            const fixedRowHeight = 31;
            const topBottomPadding = 46;
            const numberOfRows = Math.floor((tableHeight - topBottomPadding) / fixedRowHeight);

            this.brdOpts.rowCnt = numberOfRows;
        }
    },
    mounted() {
        if (this.visible) this.valueCellWid = this.$el.getBoundingClientRect().width >= 600 ? '12%' : '80px';
        if (this.useAttr) this.brdOpts.colCnt += 1;
        if (this.useFluc) this.brdOpts.colCnt += 1;
    },
    watch: {
        visible(val) {
            if (val) {
                // 셀 넓이 설정
                this.valueCellWid = this.$el.getBoundingClientRect().width >= 600 ? '12%' : '80px';
                // checked 항목 위치로 스크롤 이동
                this.scrollToSelectItem();
            }
        },
        useAttr(val) {
            this.brdOpts.colCnt = val ? this.brdOpts.colCnt + 1 : this.brdOpts.colCnt;
        },
        useFluc(val) {
            this.brdOpts.colCnt = val ? this.brdOpts.colCnt + 1 : this.brdOpts.colCnt - 1;
        },
    },
    methods: {
        /**
         * 선택된 항목을 return
         * @param {Object} item 찾고자 하는 항목
         * @return {Object|null} 선택된 항목 또는 null
         */
        getSelectedItems(item) {
            // 'rkData' 배열이 비어 있지 않고 'checked' 배열이 존재하는 경우
            if (this.rkData.length && this.checked) {
                // 'checked' 배열에서 'code' 속성이 주어진 'item' 객체와 일치하는 항목을 찾아 반환
                return this.checked.find((checked) => checked.code === item.code);
            }
            // 일치하는 항목이 없을 경우 null 반환
            return null;
        },

        /**
         * 선택된 항목으로 스크롤 이동
         */
        scrollToSelectItem() {
            if (!this.checked) return;

            // 선택된 항목의 DOM 요소
            let selectedItem = this.$refs.list.querySelector('tr[data-code="' + this.checked[0].code + '"]');

            // 선택된 항목의 DOM 요소가 존재하는 경우
            if (selectedItem) {
                // 스크롤 컨테이너의 스크롤 위치를 조정하여 선택된 항목이 화면에 보이도록 함
                this.$refs.scrollContainer.scrollTop = selectedItem.offsetTop - 76;
            } else {
                // -76 위치로 스크롤 (선택된 항목이 화면에 없음)
                this.$refs.scrollContainer.scrollTop = -76;
            }
        },
        /**
         * 클릭 이벤트 처리
         * - 'toggleType'이 'one'인 경우, 'checked' 배열을 선택한 항목 하나([evt])로 설정
         * - 'toggleType'이 'multi'인 경우, 'checked' 배열을 생성하고 항목을 추가 또는 제거
         * - 'toggleType'이 다른 경우, 'click' 이벤트를 부모 컴포넌트로 전달
         * @param {Object} evt 클릭된 항목
         */
        evt_click(evt) {
            // 'toggleType'이 'one'인 경우, 'checked' 배열을 선택한 항목 하나([evt])로 설정
            if (this.toggleType === 'one') {
                this.checked = [evt];
            }
            // 'toggleType'이 'multi'인 경우
            else if (this.toggleType === 'multi') {
                // 'checked' 배열이 없는 경우, 새로 생성
                if (!this.checked) this.checked = [];

                // 클릭된 항목(evt)이 'checked' 배열에 포함되어 있는지 확인
                const evtIdx = this.checked.indexOf(evt);

                // 클릭된 항목(evt)이 'checked' 배열에 없는 경우, 배열에 추가
                if (evtIdx === -1) {
                    this.checked.push(evt);
                }
                // 클릭된 항목(evt)이 'checked' 배열에 있는 경우, 배열에서 제거
                else {
                    this.checked.splice(evtIdx, 1);
                }
            }
            // 'toggleType'이 다른 경우, 'click' 이벤트를 부모 컴포넌트로 전달
            else {
                this.$emit('click', evt);
            }
        },
        /**
         * 정보량 숫자 클릭 이벤트 처리
         * @param {Object} $e 클릭된 이벤트 객체
         */
        evt_clickVolume($e) {
            this.$emit('click', $e);
        },
    },
};
</script>
