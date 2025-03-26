<template>
    <div class="lnb">
        <h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="1.6em" viewBox="0 -960 960 960" fill="#fff">
                <path
                    d="M481.92-327.77q16.16 0 25.96-10.58 9.81-10.58 9.81-25.96t-10.38-25.19q-10.37-9.81-25.46-9.81-15.08 0-25.39 9.81t-10.31 25.19q0 15.38 10.36 25.96t25.41 10.58ZM457.62-461h48.3q.39-11.76 1.58-20.26 1.19-8.51 5.19-15.74t10.14-15q6.14-7.78 16.09-18.08 16.93-16.92 34.66-36.27 17.73-19.34 17.73-55.8 0-49.93-34.08-78-34.08-28.08-78.77-28.08-41.84 0-70 24.88-28.15 24.89-39.77 52.81l44.39 19.62q7.54-16.46 21.38-34.08 13.85-17.62 44.77-17.62 37.39 0 51.58 20.08Q545-642.46 545-621.31q0 24.54-17 40.39-17 15.84-32.92 31.54-11.85 12-18.85 20.61-7 8.62-11.5 18.46-4.5 9.85-5.81 21.31-1.3 11.46-1.3 28ZM480-76.46 344.46-212H228.31Q202-212 183-231q-19-19-19-45.31v-503.38Q164-806 183-825q19-19 45.31-19h503.38q27.01 0 45.66 19Q796-806 796-779.69v503.38Q796-250 777.35-231q-18.65 19-45.66 19H615.54L480-76.46ZM228.31-264h137.46L480-149.77 593.23-264h138.46q5.39 0 8.85-3.46t3.46-8.85v-503.38q0-5.39-3.46-8.85t-8.85-3.46H228.31q-5.39 0-8.85 3.46t-3.46 8.85v503.38q0 5.39 3.46 8.85t8.85 3.46Z" />
            </svg>
            <span>도움말</span>
            <router-link :to="`/view/helper`" class="btnSearch" title="검색">
                <div class="ui_icon icon-search"></div>
            </router-link>
        </h1>
        <nav>
            <ul>
                <template v-for="item in helperData">
                    <li v-if="item.use_yn === 'Y'" :key="item.seq" :class="{ 'is-active': isActive(item), 'is-expand': isExpanded(item.seq) && item.children }" v-set-height>
                        <button v-if="item.children && item.children.length" class="subject is-children" @click="toggleExpand(item.seq)">
                            <strong>{{ item.subject }}</strong>
                        </button>
                        <router-link v-else class="subject" :to="`/view/helper/${item.seq}`" active-class="is-active">
                            <strong>{{ item.subject }}</strong>
                        </router-link>
                        <div v-if="item.children" class="sub">
                            <ul>
                                <template v-for="subItem in item.children">
                                    <li v-if="subItem.use_yn === 'Y'" :key="subItem.seq" :class="{ 'is-active': isActive(subItem), 'is-expand': isExpanded(subItem.seq) }" v-set-height>
                                        <button v-if="subItem.children && subItem.children.length" class="subject is-children" @click="toggleExpand(subItem.seq)">
                                            <span>{{ subItem.subject }}</span>
                                        </button>
                                        <router-link v-else :to="`/view/helper/${subItem.seq}`" class="subject" active-class="is-active">
                                            <span>{{ subItem.subject }}</span>
                                        </router-link>

                                        <div v-if="subItem.children" class="sub">
                                            <ul>
                                                <template v-for="subItem2 in subItem.children">
                                                    <li v-if="subItem2.use_yn === 'Y'" :key="subItem2.seq">
                                                        <router-link :to="`/view/helper/${subItem2.seq}`" class="subject" active-class="is-active">
                                                            <span>{{ subItem2.subject }}</span>
                                                        </router-link>
                                                    </li>
                                                </template>
                                            </ul>
                                        </div>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </li>
                </template>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'comp-helper-lnb',
    data() {
        return {
            expandedItems: new Set(),
        };
    },
    props: {
        helperData: { type: Array },
    },
    computed: {
        ...mapGetters(['getRoutes', 'getUserHelperMenuList']),
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.updateAllHeights();
                    this.expandActiveItems(this.helperData);
                });
            },
        },
        helperData: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val && val.length) {
                    this.updateAllHeights();
                    this.expandActiveItems(this.helperData);
                }
            },
        },
    },
    mounted() {
        // this.$nextTick(() => {
        //     this.updateAllHeights();
        //     this.expandActiveItems(this.helperData);
        // });
    },
    methods: {
        isActive(item) {
            const routeSeq = parseInt(this.$route.path.split('/').slice(-1)[0]);

            // 현재 항목이 활성화되어 있는지 확인
            if (routeSeq === item.seq) {
                if (item.children && item.children.length > 0) {
                    // 자식이 있는 경우, 첫 번째 자식을 활성화
                    this.$nextTick(() => {
                        this.$router.push(`/view/helper/${item.children[0].seq}`);
                    });
                }
                return true;
            }

            if (item.children && item.children.length > 0) {
                return this.hasActiveChild(item.children);
            }

            return false;
        },

        hasActiveChild(children) {
            const routeSeq = parseInt(this.$route.path.split('/').slice(-1)[0]);

            for (let child of children) {
                if (routeSeq === child.seq) {
                    return true;
                }
                // 재귀적으로 더 깊은 자식들도 확인
                if (child.children && child.children.length > 0) {
                    if (this.hasActiveChild(child.children)) {
                        return true;
                    }
                }
            }
            return false;
        },

        isExpanded(seq) {
            return this.expandedItems.has(seq);
        },

        toggleExpand(seq) {
            const dummySet = this.expandedItems;
            if (dummySet.has(seq)) {
                dummySet.delete(seq);
            } else {
                dummySet.add(seq);
            }
            this.expandedItems = new Set(dummySet.values());
            this.$nextTick(() => {
                this.updateAllHeights();
            });
        },

        expandActiveItems(items) {
            for (const item of items) {
                if (this.isActive(item)) {
                    // 현재 항목이 활성 상태라면 모든 상위 항목을 확장
                    let parent = item;
                    while (parent) {
                        const dummySet = this.expandedItems;
                        dummySet.add(parent.seq);
                        this.expandedItems = new Set(dummySet.values());
                        parent = items.find((i) => i.children && i.children.includes(parent));
                    }
                }
                if (item.children) {
                    setTimeout(() => {
                        this.expandActiveItems(item.children);
                    }, 10);
                }
            }
        },

        updateAllHeights() {
            this.$el.querySelectorAll('li').forEach((li) => {
                this.setTotalChildrenHeight(li);
            });
        },

        setTotalChildrenHeight(el) {
            let totalHeight = 0;

            Array.from(el.children).forEach((child) => {
                if (child.classList.contains('sub')) {
                    if (el.classList.contains('is-expand')) {
                        let subHeight = 0;
                        Array.from(child.children).forEach((subChild) => {
                            if (subChild.tagName === 'UL') {
                                Array.from(subChild.children).forEach((li) => {
                                    subHeight += this.setTotalChildrenHeight(li);
                                });
                            } else {
                                subHeight += Math.ceil(subChild.offsetHeight);
                            }
                        });
                        totalHeight += subHeight;
                    }
                } else {
                    totalHeight += child.offsetHeight;
                }
            });
            el.style.setProperty('--hgt', `${totalHeight}px`);
            return totalHeight;
        },
    },
    directives: {
        setHeight: {
            bind(el, binding, vnode) {
                const context = vnode.context;
                el._setTotalChildrenHeight = () => context.setTotalChildrenHeight(el);
            },
            inserted(el) {
                el._setTotalChildrenHeight();
            },
            update(el) {
                el._setTotalChildrenHeight();
            },
            unbind(el) {
                delete el._setTotalChildrenHeight;
            },
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
