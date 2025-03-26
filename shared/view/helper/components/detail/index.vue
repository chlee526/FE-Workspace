<template>
    <div class="detail">
        <div class="subject">
            <p>{{ getHelpInfos?.subject }}</p>
        </div>
        <div class="content" v-if="getHelpInfos?.content" v-html="getHelpInfos?.content" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { uuid } from 'vue-uuid';

export default {
    name: 'comp-helper-detail',
    data() {
        return {
            apiUID: uuid.v4(),
            loading: false,
        };
    },
    props: {
        helperData: { type: Array },
    },
    computed: {
        ...mapGetters(['getRoutes']),

        // 파라미터로 전달받는 도움말 seq
        postId() {
            return this.$route.params.seq;
        },

        // posId로 알아오는 현재 도움말 정보
        getHelpInfos() {
            // if (this.helperData.length === 0) return null;
            return this.checkHelperValidSeq(this.postId, this.helperData);
        },
    },
    watch: {
        postId: {
            deep: true,
            immediate: true,
            handler() {
                // if (this.helperData.length) {
                //     const isValid = this.getHelpInfos;
                //     if (!isValid) this.$router.push({ path: '/err/404' });
                // }
            },
        },
        getHelpInfos: {
            deep: true,
            handler(val) {
                if (this.helperData.length) {
                    const isValid = this.getHelpInfos;
                    if (!isValid) this.$router.push({ path: '/err/404' });
                }
                // console.log('getHelpInfos  >>  ', val, this.helperData.length);
            },
        },
    },
    methods: {
        /**
         * 도움말 접근 시 유효한 seq인지 검증
         * @param seq 도움말 시퀀스
         * @param menuList 검증할 도움말 목록
         * @returns {Boolean || null}
         */
        checkHelperValidSeq(seq, menuList) {
            for (let item of menuList) {
                if (parseInt(item.seq) === parseInt(seq)) {
                    if (item.use_yn === 'Y') return item;
                }
                if (item.children && item.children.length > 0) {
                    const found = this.checkHelperValidSeq(seq, item.children);
                    if (found !== null) {
                        return found;
                    }
                }
            }

            return null; // seq를 찾지 못한 경우
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
