<template>
    <div id="content">
        <div class="wrap">
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>공지사항</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap notice_detail">
                                            <div class="notice_header">
                                                <strong class="title">{{ noticeData.title }}</strong>
                                                <span class="date">{{ noticeData.reg_date }}</span>
                                            </div>
                                            <div class="content" v-html="noticeData.content"></div>
                                            <div class="notice_footer">
                                                <router-link to="/view/notice">
                                                    <comp-button class="is-color-hl is-large"><span class="txt">목록</span></comp-button>
                                                </router-link>
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
import { uuid } from 'vue-uuid';
export default {
    name: 'noticeDetailPage',
    data() {
        return {
            apiUID: uuid.v4(), // API 사용하는 경우, API키생성 필수
            noticeData: {},
        };
    },

    computed: {
        getUseNotice() {
            return process.env.VUE_APP_NOTICE === 'true';
        },
    },

    watch: {
        $route(to, from) {
            if (to.path != from.path) this.fetchData();
        },
    },

    created() {
        if (!this.getUseNotice) this.$router.push({ path: '/err/404' }).catch((err) => {});
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        fetchData() {
            let params = {
                id: this.$route.params.seq,
            };

            let sampleData = {
                '01': {
                    seq: '01',
                    title: '공지사항 게시판 안내',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
                '02': {
                    seq: '02',
                    title: '공지사항 게시판 안내2',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
                '03': {
                    seq: '03',
                    title: '공지사항 게시판 안내3',
                    content:
                        ' <p>공지사항 안내사항 입니다</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p><br /><p>공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.</p>',
                    reg_date: '2023-07-03',
                    author: 'rsn',
                },
            };
            if (sampleData[params.id]) {
                this.noticeData = sampleData[params.id];
            } else {
                this.$router.push({ path: '/view/notice' }).catch((err) => {});
            }
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
