<template>
    <div>
        <nav class="lnb">
            <ul>
                <li v-for="($item, $idx) in navDatas" v-bind:key="$item.url" :class="[{ 'is-active': $route.path.indexOf($item.url) != -1 }, { 'is-expanded': lnbExpandeds.includes($idx) }]">
                    <div>
                        <!-- 서브 메뉴 확장 -->
                        <input v-if="$item.children" :id="`lnb_${$idx}`" type="checkbox" class="btnExpanded" :value="$idx" v-model="lnbExpandeds" /><label v-if="$item.children" :for="`lnb_${$idx}`"></label>

                        <span class="dummy_top"></span>
                        <a v-if="$item.link" :href="$item.link" target="_blank" class="item" :class="[{ has_sub: $item.children }]">
                            <span class="txt">{{ $item.name }}</span>
                        </a>
                        <button v-else-if="$item.ready" class="item" :class="[{ has_sub: $item.children }]" @click.stop="$store.dispatch('DIALOG', ['준비중입니다.', '준비중', 0])">
                            <span class="txt">{{ $item.name }}</span>
                        </button>
                        <router-link v-else :to="$item.url" class="item" active-class="is-expanded" :class="[{ has_sub: $item.children }]">
                            <span class="txt">{{ $item.name }}</span>
                        </router-link>
                        <span class="dummy_bot"></span>

                        <div class="sub" v-if="$item.children">
                            <transition name="lnb_sub">
                                <ul ref="sub" v-if="lnbExpandeds.includes($idx)" style="--hgt: -1000px" v-init>
                                    <li v-for="($item2, $idx2) in $item.children" v-bind:key="$idx2">
                                        <a v-if="$item2.link" :href="$item2.link" target="_blank" class="item">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </a>
                                        <button v-else-if="$item2.ready" class="item" @click.stop="$store.dispatch('DIALOG', ['준비중입니다.', '준비중', 0])">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </button>
                                        <router-link v-else :to="$item2.url" class="item" active-class="is-active">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </router-link>

                                        <div class="sub nav_depth3" v-if="$item2.children">
                                            <ul>
                                                <li v-for="($item3, $idx3) in $item2.children" v-bind:key="$idx3">
                                                    <a v-if="$item3.link" :href="$item3.link" target="_blank" class="item">
                                                        <span class="txt">{{ $item3.name }}</span>
                                                    </a>
                                                    <button v-else-if="$item3.ready" class="item" @click.stop="$store.dispatch('DIALOG', ['준비중입니다.', '준비중', 0])">
                                                        <span class="txt">{{ $item3.name }}</span>
                                                    </button>

                                                    <router-link v-else :to="$item3.url" class="item" active-class="is-active">
                                                        <span class="txt">{{ $item3.name }}</span>
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'comp-lnb',

    data() {
        return {
            lnbExpandeds: [],
        };
    },
    computed: {
        ...mapGetters(['getRoutes']),
        navDatas: function () {
            return this.getRoutes;
        },
    },
    mounted() {
        this.hndl_route();
    },
    watch: {
        $route(to, form) {
            this.hndl_route();
        },
    },
    methods: {
        hndl_route() {
            this.navDatas.forEach((item, idx) => {
                if (this.$route.path.indexOf(item.url) != -1) this.lnbExpandeds = [idx];
            });
        },
    },
    directives: {
        init: {
            inserted(el, evt, vnode) {
                el.style.setProperty('--hgt', `-${el.offsetHeight}px`);
            },
        },
    },
};
</script>
