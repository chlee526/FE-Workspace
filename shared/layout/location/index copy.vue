<template>
    <div v-if="getUseage" id="locator" class="ui_location" :class="{ 'is-no-topsearchs': !topSearchEnabled }">
        <div class="wrap">
            <div class="inner_wrap">
                <!-- <router-link :to="item.url" v-for="(item, index) in getCurGnbLocation" v-bind:key="'locator_' + index" class="item ui_lnk">
                    <span class="txt">{{ item.name }}</span>
                </router-link> -->

                <TransitionGroup name="fade" mode="out-in">
                    <template v-for="(item, idx) in getCurGnbLocation">
                        <router-link :to="item.url" :key="`${item.name}_${idx}`" class="item ui_lnk">
                            <span class="txt">{{ item.name }}</span>
                        </router-link>
                    </template>
                </TransitionGroup>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

import TopicGroupVolume from '../../../projects/2023_shinhancard/src/view/voc/TopicGroupVolume.vue';
export default {
    name: 'comp-location',
    data() {
        return {
            topSearchEnabled: true,
            curLocs: [
                { name: 'name_1', url: 'url_1' },
                { name: 'name_2', url: 'url_2' },
            ],
        };
    },
    computed: {
        getUseage() {
            return process.env.VUE_APP_USEAGE_LOCATOR === 'true' && !this.getUseageLNB;
        },
        ...mapGetters(['getRoutes', 'getUseageLNB']),
        currPath() {
            return this.$route.path;
        },
        getCurGnbLocation() {
            let curGnbLocation = [];
            this.getRoutes.filter((item) => {
                if (item.children) {
                    item.children.filter((item2) => {
                        if (item2.url === this.currPath) {
                            curGnbLocation.push(item);
                            curGnbLocation.push(item2);
                        }
                    });
                } else {
                    if (item.url === this.currPath) {
                        curGnbLocation.push(item);
                    }
                }
            });
            return curGnbLocation;
        },
    },
    mounted() {
        const top_searchs = document.querySelector('.top_searchs');
        if (!top_searchs) {
            this.topSearchEnabled = false;
        }
    },
    watch: {
        $route: {
            deep: true,
            handler(val) {
                this.curLocs.splice(this.curLocs.length - 1, 1);
                this.curLocs.push({ name: `name_${parseInt(Math.random() * 100)}`, url: `url_${parseInt(Math.random() * 100)}` });
                console.log(this.curLocs);
                // this.curLocs = this.getCurGnbLocation;
            },
        },
    },
    methods: {},
};
</script>
