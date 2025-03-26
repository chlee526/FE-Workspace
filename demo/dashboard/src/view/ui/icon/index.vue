<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">icon</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>Icon</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/icon" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Icon 모음</span>
                                                    </li>
                                                    <li>
                                                        <span>Font: 'icomoon'</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="icon_wrap">
                                                <div class="icon_box" :key="item.id" v-for="(item, idx) in iconsDatas" :title="item.class" :data-idx="item.id">
                                                    <span class="icon" :class="item.class"></span>
                                                    <div class="btn_box">
                                                        <comp-button class="is-icon-with is-before" @click="copyClipBoard(idx, 'class')" title="class 복사">
                                                            <span class="icon icon-copy"></span>
                                                            <span class="txt">Class</span>
                                                        </comp-button>
                                                        <comp-button class="is-icon-with is-before" @click="copyClipBoard(idx, 'css')" title="CSS 코드 복사">
                                                            <span class="icon icon-copy"></span>
                                                            <span class="txt">CSS</span>
                                                        </comp-button>
                                                        <comp-button class="is-icon-with is-before" @click="copyClipBoard(idx, 'html')" title="HTML Entity 복사">
                                                            <span class="icon icon-copy"></span>
                                                            <span class="txt">HTML</span>
                                                        </comp-button>
                                                    </div>
                                                    <span class="className">{{ item.class }}</span>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'component-icon',
    data() {
        return {
            iconsDatas: [
                { id: '089', class: 'icon-folder-open' },
                { id: '088', class: 'icon-folder-off' },
                { id: '087', class: 'icon-chart_column_width_stack2' },
                { id: '086', class: 'icon-profile' },
                { id: '085', class: 'icon-television' },
                { id: '084', class: 'icon-move' },
                { id: '083', class: 'icon-share' },
                { id: '082', class: 'icon-company' },
                { id: '081', class: 'icon-drilldown' },
                { id: '080', class: 'icon-kibana' },
                { id: '079', class: 'icon-password-nolook' },
                { id: '078', class: 'icon-zoom' },
                { id: '077', class: 'icon-medal' },
                { id: '076', class: 'icon-password-look' },
                { id: '075', class: 'icon-hot' },
                { id: '074', class: 'icon-top' },
                { id: '073', class: 'icon-chart_column_width_group' },
                { id: '072', class: 'icon-chart_column_width_stack' },
                { id: '071', class: 'icon-logout' },
                { id: '070', class: 'icon-system' },
                { id: '069', class: 'icon-calendar' },
                { id: '068', class: 'icon-instruction' },
                { id: '067', class: 'icon-copy' },
                { id: '066', class: 'icon-chart-no-data' },
                { id: '065', class: 'icon-sort_up' },
                { id: '064', class: 'icon-sort_down' },
                { id: '063', class: 'icon-analyze' },
                { id: '062', class: 'icon-pin' },
                { id: '060', class: 'icon-restore' },
                { id: '059', class: 'icon-displace' },
                { id: '058', class: 'icon-globe' },
                { id: '057', class: 'icon-setting' },
                { id: '056', class: 'icon-autocomplete' },
                { id: '055', class: 'icon-cafe' },
                { id: '054', class: 'icon-attached-file' },
                { id: '053', class: 'icon-check-no-bg' },
                { id: '052', class: 'icon-dotted_arrow_left' },
                { id: '051', class: 'icon-dotted_arrow_right' },
                { id: '050', class: 'icon-detail-view' },
                { id: '049', class: 'icon-expansion' },
                { id: '048', class: 'icon-no-image' },
                { id: '047', class: 'icon-image-board' },
                { id: '046', class: 'icon-original-text' },
                { id: '045', class: 'icon-no-data' },
                { id: '044', class: 'icon-lock' },
                { id: '043', class: 'icon-caret-left' },
                { id: '042', class: 'icon-caret-right' },
                { id: '041', class: 'icon-caret-down' },
                { id: '040', class: 'icon-caret-up' },
                { id: '039', class: 'icon-chart-bubble' },
                { id: '038', class: 'icon-chart-column-height' },
                { id: '037', class: 'icon-chart-column-height-100' },
                { id: '036', class: 'icon-chart-column-width' },
                { id: '035', class: 'icon-chart-column-width-100' },
                { id: '034', class: 'icon-chart-line' },
                { id: '033', class: 'icon-chart-word-cloud' },
                { id: '032', class: 'icon-chart-donut' },
                { id: '031', class: 'icon-check' },
                { id: '030', class: 'icon-bookmark' },
                { id: '029', class: 'icon-email' },
                { id: '028', class: 'icon-preveal' },
                { id: '027', class: 'icon-modify' },
                { id: '026', class: 'icon-speech-bubble' },
                { id: '025', class: 'icon-normal-board' },
                { id: '024', class: 'icon-add-file' },
                { id: '023', class: 'icon-analogy' },
                { id: '022', class: 'icon-delet' },
                { id: '021', class: 'icon-back' },
                { id: '020', class: 'icon-reload' },
                { id: '019', class: 'icon-close' },
                { id: '018', class: 'icon-remove' },
                { id: '017', class: 'icon-add' },
                { id: '016', class: 'icon-reply' },
                { id: '015', class: 'icon-indicator' },
                { id: '014', class: 'icon-neutral' },
                { id: '013', class: 'icon-negative' },
                { id: '012', class: 'icon-positive' },
                { id: '011', class: 'icon-clock' },
                { id: '010', class: 'icon-angle-up' },
                { id: '009', class: 'icon-angle-down' },
                { id: '008', class: 'icon-write' },
                { id: '007', class: 'icon-search' },
                { id: '006', class: 'icon-info' },
                { id: '005', class: 'icon-excel' },
                { id: '004', class: 'icon-checkbox' },
                { id: '003', class: 'icon-angle-double-left' },
                { id: '002', class: 'icon-angle-double-right' },
                { id: '001', class: 'icon-angle-left' },
                { id: '000', class: 'icon-angle-right' },
            ],
            cssCopyChk: [],
            htmlCopyChk: [],
            copyTxt: '',
        };
    },
    methods: {
        copyClipBoard(idx, type) {
            this.copyTxt = '';
            const copyItem = { ...this.iconsDatas[idx] };

            switch (type) {
                case 'html': {
                    this.copyTxt = `&#xe${copyItem.id};`;
                    break;
                }
                case 'class': {
                    this.copyTxt = copyItem.class;
                    break;
                }
                case 'css': {
                    this.copyTxt = `\\e${copyItem.id}`;
                    break;
                }
                default: {
                    console.error('copyClipBoard: 옳지 않은 type');
                }
            }

            this.copyTxt.copyClipBoard(true);
        },
    },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
