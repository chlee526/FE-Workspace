<template>
    <div>
        <nav class="gnb" :class="{ 'is-no-topsearchs': !topSearchEnabled }">
            <ul>
                <li v-for="($item, $idx) in navDatas" v-bind:key="$item.url" :class="[{ 'is-over': overIdx == $idx }]" @mouseenter="overIdx = $idx" @mouseleave="overIdx = null">
                    <div>
                        <a v-if="$item.link" :href="$item.link" target="_blank" class="item" :class="[{ has_sub: $item.children }]">
                            <span class="txt">{{ $item.name }}</span>
                        </a>
                        <button v-else-if="$item.ready" class="item" :class="[{ has_sub: $item.children }]" @click.stop="$store.dispatch('DIALOG', ['준비중입니다.', '준비중', 0])">
                            <span class="txt">{{ $item.name }}</span>
                        </button>
                        <router-link v-else :to="$item.url" class="item" :class="[{ has_sub: $item.children }]" active-class="is-active">
                            <span class="txt">{{ $item.name }}</span>
                        </router-link>
                        <div ref="sub" v-if="$item.children" class="sub">
                            <transition name="gnb_sub">
                                <ul v-if="$idx == overIdx">
                                    <li v-for="($item2, $idx2) in $item.children" v-bind:key="$idx2" :class="[{ 'is-over': overIdx2 == $idx2 }]" @mouseenter="overIdx2 = $idx2" @mouseleave="overIdx2 = null">
                                        <a v-if="$item2.link" :href="$item2.link" target="_blank" class="item" :class="[{ has_sub: $item2.children }]">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </a>
                                        <button v-else-if="$item2.ready" class="item" :class="[{ has_sub: $item2.children }]" @click.stop="$store.dispatch('DIALOG', ['준비중입니다.', '준비중', 0])">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </button>
                                        <router-link v-else :to="$item2.url" class="item" :class="[{ has_sub: $item2.children }]" active-class="is-active">
                                            <span class="txt">{{ $item2.name }}</span>
                                        </router-link>

                                        <transition name="fade">
                                            <ul v-if="$idx2 == overIdx2" class="nav_depth3">
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
                                        </transition>
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
import $ from 'jquery';

export default {
    name: 'comp-gnb',
    data() {
        return {
            topSearchEnabled: true,
            overIdx: null,
            overIdx2: null,
        };
    },
    computed: {
        ...mapGetters(['getRoutes']),
        navDatas: function () {
            return this.getRoutes;
        },
    },
    mounted() {
        if ($('.top_searchs').length <= 0) {
            this.topSearchEnabled = false;
        }
    },
    watch: {
        $route(val) {
            this.overIdx = null;
            this.overIdx2 = null;
        },
    },
};
</script>
