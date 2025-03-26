<template>
    <div class="slider">
        <input type="range" class="input_tick" ref="inputTick" :list="id" :min="min == '1' ? 0 : min" :max="max" :step="division && type == 'label' ? stepHandler : 1" />

        <div class="bubble left" ref="bubbleLeft"></div>
        <input type="range" class="input left" ref="inputLeft" :min="min == '1' ? 0 : min" :max="max" v-model="val.split(',')[0]" :step="division && type == 'label' ? stepHandler : 1" @input="setLeftVal" @change="setData" @mouseover="evt_mouse_over" @mouseout="evt_mouse_out" />

        <div class="bubble right" ref="bubbleRight"></div>
        <input type="range" class="input right" ref="inputRight" :min="min == '1' ? 0 : min" :max="max" v-model="val.split(',')[1]" :step="division && type == 'label' ? stepHandler : 1" @input="setRightVal" @change="setData" @mouseover="evt_mouse_over" @mouseout="evt_mouse_out" />

        <div class="track">
            <div class="range" ref="range"></div>
            <div class="thumb left" ref="thumbLeft"></div>
            <div class="thumb right" ref="thumbRight"></div>
        </div>

        <datalist v-if="division && type == 'label'" :id="id" class="tick_list" @click="evt_click"></datalist>
        <datalist v-else-if="!division || type == 'nolabel'" :id="id" class="tick_list">
            <option class="tick_opt" :value="min == '1' ? 0 : min" :label="min + unit"></option>
            <option class="tick_opt" :value="max" :label="max + unit"></option>
        </datalist>
    </div>
</template>

<script>
export default {
    name: 'comp-slider',
    data() {
        return {
            hoverR: false,
            hoverL: false,
            minVal: '',
            maxVal: '',
            reRender: false,
        };
    },
    props: {
        id: { type: String },
        value: { type: String },
        min: { type: String, default: '0' }, // 최소 범위
        max: { type: String, default: '100' }, // 최대 범위
        unit: { type: String, default: null }, // 단위
        division: { type: String, default: null }, // 분할 구간 수
        type: { type: String, default: 'label' },
    },
    computed: {
        val: {
            get: function () {
                return this.value;
            },
            set: function ($val) {
                this.$emit('input', $val);
            },
        },
        stepHandler() {
            let result = this.min == '1' ? +this.max / +this.division : (+this.max - +this.min) / +this.division;
            return result;
        },
    },
    watch: {
        value(val) {
            this.renderRange(val.split(',')[0], val.split(',')[1]);
        },
        reRender() {
            this.renderTick();
        },
        type() {
            this.reRender = true;
        },
        division() {
            this.reRender = true;
        },
        unit() {
            if (this.division && this.type == 'label') this.reRender = true;
            this.renderRange(this.val.split(',')[0], this.val.split(',')[1]);
        },
    },

    methods: {
        renderTick() {
            if (!this.reRender) {
                if (!this.min || !this.max) return;
                const tickList = document.getElementById(this.id);

                // 초기 설정 범위 데이터 적용
                if (this.val !== '') {
                    const inputLeft = this.$refs.inputLeft.value;
                    const inputRight = this.$refs.inputRight.value;
                    this.renderRange(inputLeft, inputRight);
                } else {
                    this.val = this.min + ',' + this.max;
                }

                if (!this.division || this.type == 'nolabel') return;

                if (this.min == '1') {
                    // 최소범위가 1부터 시작일경우
                    for (let i = +this.min; i <= +this.max + 1; i += +this.max / +this.division) {
                        const el = document.createElement('option');
                        tickList.appendChild(el);
                        el.value = i - 1;
                        el.className = 'tick_opt';
                        el.label = i == 1 ? parseInt(i) + this.unit : parseInt(i) - 1 + this.unit;
                        el.style.position = 'relative';
                    }
                } else {
                    for (let i = +this.min; i <= +this.max; i += (+this.max - +this.min) / +this.division) {
                        const el = document.createElement('option');
                        el.className = 'tick_opt';
                        el.value = i;
                        el.label = i + this.unit;
                        el.style.position = 'relative';
                        tickList.appendChild(el);
                    }
                }
            } else {
                const tickList = document.getElementById(this.id);
                tickList.innerHTML = '';
                this.reRender = false;
            }
        },

        // value 기준 슬라이더 위치 조정
        renderRange($left, $right) {
            let leftPer = 0;
            let rightPer = 0;
            if (this.min == '1') {
                leftPer = (+$left / +this.max) * 100;
                rightPer = (+$right / +this.max) * 100;
            } else {
                leftPer = (((+$left - +this.min) / (+this.max - +this.min)) * 100).toFixed(1);
                rightPer = (((+$right - +this.min) / (+this.max - +this.min)) * 100).toFixed(1);
            }
            this.$refs.thumbLeft.style.left = leftPer + '%';
            this.$refs.range.style.left = leftPer + '%';
            this.$refs.bubbleLeft.style.left = leftPer + '%';
            this.$refs.bubbleLeft.innerText = this.unit == null ? $left : $left + this.unit;

            this.$refs.thumbRight.style.right = `${100 - rightPer}%`;
            this.$refs.range.style.right = `${100 - rightPer}%`;
            this.$refs.bubbleRight.style.right = `${100 - rightPer}%`;
            this.$refs.bubbleRight.innerText = this.unit == null ? $right : $right + this.unit;
        },

        setLeftVal(e) {
            const inputRight = this.$refs.inputRight;
            const inputLeft = this.$refs.inputLeft;
            let per = 0;

            if (+e.target.value >= +inputRight.value) e.target.value = inputRight.value;

            if (this.min == '1') {
                this.minVal = e.target.value == '0' ? '1' : e.target.value;
            } else {
                this.minVal = e.target.value;
            }

            e.target.value == this.max ? (inputLeft.style.zIndex = 30) : (inputLeft.style.zIndex = 20);

            if (this.min == '1') {
                per = (+e.target.value / +this.max) * 100;
            } else {
                per = (((+e.target.value - +this.min) / (+this.max - +this.min)) * 100).toFixed(1);
            }
            this.$refs.thumbLeft.style.left = per + '%';
            this.$refs.range.style.left = per + '%';

            // 말풍선
            this.$refs.bubbleLeft.style.left = per + '%';
            this.$refs.bubbleLeft.style.opacity = '1';
            this.$refs.bubbleLeft.innerText = this.unit == null ? this.minVal : this.minVal + this.unit;
        },

        setRightVal(e) {
            const inputLeft = this.$refs.inputLeft;
            let per = 0;

            if (+e.target.value <= +inputLeft.value) e.target.value = inputLeft.value;

            if (this.min == '1') {
                this.maxVal = e.target.value == '0' ? '1' : e.target.value;
            } else {
                this.maxVal = e.target.value;
            }

            if (this.min == '1') {
                per = (+e.target.value / +this.max) * 100;
            } else {
                per = (((+e.target.value - +this.min) / (+this.max - +this.min)) * 100).toFixed(1);
            }

            this.$refs.thumbRight.style.right = `${100 - per}%`;
            this.$refs.range.style.right = `${100 - per}%`;

            // 말풍선
            this.$refs.bubbleRight.style.right = `${100 - per}%`;
            this.$refs.bubbleRight.style.opacity = '1';
            this.$refs.bubbleRight.innerText = this.unit == null ? this.maxVal : this.maxVal + this.unit;
        },

        // 데이터 전달
        setData(e) {
            const _this = this;
            const inputRight = this.$refs.inputRight;
            const inputLeft = this.$refs.inputLeft;

            if (e.target == this.$refs.inputLeft) {
                if (_this.min == '1') {
                    let targetVal = e.target.value == '0' ? '1' : e.target.value;
                    _this.val = targetVal + ',' + inputRight.value;
                } else {
                    _this.val = e.target.value + ',' + inputRight.value;
                }
            } else {
                if (_this.min == '1') {
                    let targetVal = e.target.value == '0' ? '1' : e.target.value;
                    let leftVal = inputLeft.value == '0' ? '1' : inputLeft.value;
                    _this.val = leftVal + ',' + targetVal;
                } else {
                    _this.val = inputLeft.value + ',' + e.target.value;
                }
            }

            // 말풍선 1초뒤 사라짐
            if (e.target == this.$refs.inputLeft) {
                this.setBubbleLeft();
            } else {
                this.setBubbleRight();
            }
        },

        // 범위 클릭시 해당 범위로 이동
        evt_click(e) {
            let val = e.target.value;
            let min = this.value.split(',')[0];
            let max = this.value.split(',')[1];

            if (+val > +max) {
                this.val = min + ',' + val;
                this.setBubbleRight();
            } else if (+val < +min) {
                if (this.min == '1') {
                    this.val = val == '0' ? '1' + ',' + max : val + ',' + max;
                } else {
                    this.val = val + ',' + max;
                }
                this.setBubbleLeft();
            } else if (+max - +val <= +val - +min) {
                this.val = min + ',' + val;
                this.setBubbleRight();
            } else {
                this.val = val + ',' + max;
                this.setBubbleLeft();
            }
        },

        // 말풍선 효과
        setBubbleLeft() {
            this.hoverL = true;
            this.$refs.bubbleLeft.style.opacity = '1';
            setTimeout(() => {
                this.$refs.bubbleLeft.style.opacity = '0';
                this.hoverL = false;
            }, 1000);
        },
        setBubbleRight() {
            this.hoverR = true;
            this.$refs.bubbleRight.style.opacity = '1';
            setTimeout(() => {
                this.$refs.bubbleRight.style.opacity = '0';
                this.hoverR = false;
            }, 1000);
        },

        // 마우스 오버시 말풍선 표시
        evt_mouse_over(e) {
            e.target.previousElementSibling.style.opacity = '1';
        },
        evt_mouse_out(e) {
            if (e.target == this.$refs.inputLeft) {
                if (!this.hoverL) e.target.previousElementSibling.style.opacity = '0';
            } else {
                if (!this.hoverR) e.target.previousElementSibling.style.opacity = '0';
            }
        },
    },

    mounted: function () {
        this.renderTick();
    },
};
</script>

<style></style>
