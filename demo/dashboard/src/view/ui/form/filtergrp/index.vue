<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>FilterGroup</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/filterGrp" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>FilterGroup - 확장형 필터링 모음</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : 목록의 가로/세로 크기, 스크롤 자동 생성</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>타입</strong></span>
                                                        <ul>
                                                            <li><strong>사용자 설정 형</strong> : 사용자가 원하는대로 목록을 구성 가능(샘플은 버튼/필터목록을 같이 구성했음)</li>
                                                            <li><strong>추가/삭제 형</strong> : 목록을 원하는 형태 1가지로 추가/삭제 하며 관리 가능(추가/삭제 형태: 원하는 형태를 임시 설정한 상태)</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>정렬</strong> : 드래그/드랍으로 순서 변경이 가능</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>위치</strong>
                                                <comp-selectbox id="set_pos" v-model="set.pos.value" :opts="set.pos.opts"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <comp-switch-btn id="set_confirm" class="is-small" v-model="set.confirm" label="적용버튼 포함"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <template v-if="set.confirm">
                                                <comp-filter-grp :pos="set.pos.value" :disabled="set.disabled" @confirm="evt_confirm">
                                                    <template v-slot:title>카테고리/그래프</template>
                                                    <template v-slot:items>
                                                        <dl>
                                                            <dt>
                                                                <strong>인풋박스</strong>
                                                            </dt>
                                                            <dd><comp-input-box id="set_input" class="is-small" type="text" v-model="set.input" label="인풋박스" style="width: 150px"></comp-input-box></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>체크박스그룹</strong>
                                                            </dt>
                                                            <dd><comp-checkbox-grp id="set_chk" class="is-small" v-model="set.chk.value" :opts="set.chk.opts" :box="true"></comp-checkbox-grp></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>라디오그룹</strong>
                                                            </dt>
                                                            <dd><comp-radio-grp id="set_radio" class="is-small" v-model="set.radio.value" :opts="set.radio.opts" :box="true"></comp-radio-grp></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>셀렉트박스</strong>
                                                            </dt>
                                                            <dd><comp-selectbox id="set_select" class="is-small" v-model="set.select.value" :opts="set.select.opts" style="width: 150px"></comp-selectbox></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>스위치</strong>
                                                            </dt>
                                                            <dd><comp-switch-btn id="set_switch" class="is-small" v-model="set.switch"></comp-switch-btn></dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </template>
                                            <template v-else>
                                                <comp-filter-grp :pos="set.pos.value" :disabled="set.disabled">
                                                    <template v-slot:title>카테고리/그래프</template>
                                                    <template v-slot:items>
                                                        <dl>
                                                            <dt>
                                                                <strong>인풋박스</strong>
                                                            </dt>
                                                            <dd><comp-input-box id="set_input" class="is-small" type="text" v-model="set.input" label="인풋박스" style="width: 150px"></comp-input-box></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>체크박스그룹</strong>
                                                            </dt>
                                                            <dd><comp-checkbox-grp id="set_chk" class="is-small" v-model="set.chk.value" :opts="set.chk.opts" :box="true"></comp-checkbox-grp></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>라디오그룹</strong>
                                                            </dt>
                                                            <dd><comp-radio-grp id="set_radio" class="is-small" v-model="set.radio.value" :opts="set.radio.opts" :box="true"></comp-radio-grp></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>셀렉트박스</strong>
                                                            </dt>
                                                            <dd><comp-selectbox id="set_select" class="is-small" v-model="set.select.value" :opts="set.select.opts" style="width: 150px"></comp-selectbox></dd>
                                                        </dl>
                                                        <dl>
                                                            <dt>
                                                                <strong>스위치</strong>
                                                            </dt>
                                                            <dd><comp-switch-btn id="set_switch" class="is-small" v-model="set.switch"></comp-switch-btn></dd>
                                                        </dl>
                                                    </template>
                                                </comp-filter-grp>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'comp-filtergrp',
    data() {
        return {
            set: {
                pos: {
                    value: 'BC',
                    opts: [
                        { code: 'OL', name: '좌측 겹침' },
                        { code: 'OC', name: '가운데 겹침' },
                        { code: 'OR', name: '우측 겹침' },
                        { code: 'BL', name: '좌측 하단' },
                        { code: 'BC', name: '가운데 하단' },
                        { code: 'BR', name: '우측 하단' },
                        { code: 'L', name: '좌측' },
                        { code: 'R', name: '우측' },
                    ],
                },
                disabled: false,
                confirm: false,
                input: '',
                chk: {
                    value: '1',
                    opts: [
                        { code: 1, name: '아이템 1' },
                        { code: 2, name: '아이템 2' },
                        { code: 3, name: '아이템 3' },
                    ],
                },
                radio: {
                    value: '1',
                    opts: [
                        { code: 1, name: '아이템 1' },
                        { code: 2, name: '아이템 2' },
                        { code: 3, name: '아이템 3' },
                    ],
                },
                select: {
                    value: 1,
                    opts: [
                        { code: 1, name: '아이템 1' },
                        { code: 2, name: '아이템 2' },
                        { code: 3, name: '아이템 3' },
                    ],
                },
                switch: true,
            },
        };
    },
    methods: {
        evt_confirm() {
            console.log('적용');
        },
    },
};
</script>

<style></style>
