<template>
    <div class="appContainerWrap">
        <Header>
            <!-- UTIL에 기능 추가할 경우 -->
            <template slot="addUtils"> </template>

            <!-- 헤더에 추가할 경우 -->
            <div slot="addSlot" style="position: absolute; right: 0; bottom: 0">추가내용</div>
        </Header>
        <div id="container">
            <transition name="fade" mode="out-in">
                <router-view />
            </transition>
            <Footer v-if="getUseageLNB" />
        </div>
        <Footer v-if="!getUseageLNB" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Header from '@shared/layout/header';
import Footer from '@shared/layout/footer';
import { setHandleScroll, windowSetReroadChck } from '@shared/utils/refresh';

export default {
    name: 'comp-layout',
    data() {
        return {
            useLNB: this.getUseageLNB,
        };
    },
    components: {
        Header,
        Footer,
    },
    computed: {
        ...mapGetters(['getUseageLNB']),
    },
    mounted() {
        // shared/utils/refresh의 handleScroll 이벤트를 할당하기 위한 함수
        setHandleScroll();

        /**
         * 브라우저 새로고침(F5) 처리전 실행되는 함수
         * 일시적으로 쿠키 값을 변경하여 route 이동 전 새로고침으로 이동인지 단순 route 이동인지 확인 하는 용도
         */
        windowSetReroadChck();
    },
    watch: {
        useLNB(val) {
            this.$store.commit('setting/SET_USEAGELNB', val);
        },
    },
    methods: {
        async evt_abLogout(res) {
            await this.$store
                .dispatch('user/LOGOUT', {
                    thenDisabled: true, // 토큰 제거 안하는 옵션
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>
