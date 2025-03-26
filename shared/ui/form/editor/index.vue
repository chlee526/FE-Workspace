<template>
    <textarea v-if="jodit" ref="jodit_editor" class="jodit-editor" :id="`jodit_editor_${id}`"></textarea>
    <div v-else :id="`quillEditor_${id}`" class="editor_wrap">
        <quillEditor ref="editor" id="editor" v-model="contentData" :options="editorOption" :spellcheck="false"></quillEditor>
    </div>
</template>

<script>
import 'jodit/es2021/jodit.min.css';
import { Quill } from 'vue-quill-editor';
import { quillEditor } from 'vue-quill-editor';
import htmlEditButton from 'quill-html-edit-button';

import { Jodit } from './jodit.min.js'; //gs리테일 jodit editor 사용

Quill.register('modules/htmlEditButton', htmlEditButton);
export default {
    name: 'comp-editor',
    components: { quillEditor },

    data() {
        return {
            contentData: '',
            editorOption: {
                placeholder: '',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // <strong>, <em>, <u>, <s>
                        [{ header: 1 }, { header: 2 }], // <h1>, <h2>
                        ['blockquote', { list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }, { indent: '-1' }, { indent: '+1' }],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
                        [{ font: [] }],
                        [{ color: [] }, { background: [] }],
                        ['link', 'image'],
                    ],

                    htmlEditButton: {
                        prependSelector: `div#quillEditor_${this.id}`,
                        okText: '확인',
                        cancelText: '취소',
                        buttonTitle: '소스보기',
                        buttonHTML: '<div><span class="icon-angle-left"></span><span class="icon-angle-right"></span></div>',
                    },
                },
            },
            updateContent: true,
            observer: null,
            editor: null,
            styleAttribute: null,
            defaultHeight: 300,
            defaultMinHeight: 300,
            defaultMinWidth: 500,
        };
    },

    props: {
        id: { type: String, default: '' },
        value: { type: String, required: true },
        placeholder: {
            type: String,
            default: '',
        },
        jodit: {
            type: Boolean,
            default: false,
        },

        //toolbar opts
        toolOpts: {
            type: Object,
            default: () => {
                return {
                    background: '#fff',
                    color: '',
                };
            },
        },

        //contents opts
        contentsOpts: {
            type: Object,
            default: () => {
                return {
                    background: '#fff',
                    color: '',
                };
            },
        },
        // sticky 기준
        toolbarStickyOffset: {
            type: Number,
            default: 0,
        },
        addFonts: { type: Array, default: null },
    },

    computed: {
        data: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        /**
         * jodit editor 기본 옵션 config
         * https://xdsoft.net/jodit/ 에서 확인 가능
         */
        joditConfig() {
            return {
                uploader: {
                    insertImageAsBase64URI: true,
                    defaultHandlerSuccess: function (data, resp) {
                        var i,
                            field = 'files';

                        const _this = this.jodit ?? this;
                        if (data[field] && data[field].length) {
                            for (i = 0; i < data[field].length; i += 1) {
                                _this.events.fire('setUpdateContent', true);
                                _this.s.insertImage(data.baseurl + data[field][i]);
                            }
                        }
                    },
                },
                language: 'ko',
                showPlaceholder: false,
                allowResizeY: false,
                enter: 'P',
                sourceEditor: 'area',
                disablePlugins: 'preview,add-new-line,video,about,clean-html,file,class-span,fullsize,print,ai-assistant,copyformat,symbols',
                hidePoweredByJodit: true,
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                showCharsCounter: false,
                showWordsCounter: false,

                events: {
                    afterInit: (e) => {
                        // 이벤트 설정 영역
                    },
                },
            };
        },
    },

    created() {
        if (this.jodit) {
            if (this.addFonts) {
                // 폰트 추가 있을 경우
                const list = this.addFonts.reduce((acc, font) => {
                    acc[font] = font; // 폰트 이름과 값 동일하게
                    return acc;
                }, {});

                Jodit.defaultOptions.controls.font.list = {
                    ...Jodit.defaultOptions.controls.font.list,
                    ...list,
                };
            }

            // 한글 설정
            Jodit.lang.ko = {
                ...Jodit.lang.ko,
                'Line height': '줄간격',
                'Change mode': 'HTML모드 변경',
                'Fill color or set the text color': '색상',
            };

            // brush 아이콘에 커스텀 설정
            Jodit.modules.Icon.set('brush', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M80 0v-160h800V0H80Zm140-280 210-560h100l210 560h-96l-50-144H368l-52 144h-96Zm176-224h168l-82-232h-4l-82 232Z"/></svg>');
        } else {
            if (this.data) {
                this.contentData = this.data;
            }

            // 폰트목록 설정
            const quillFont = Quill.import('formats/font');
            let fonts = ['Pretendard', '맑은고딕']; // 기본 폰트 목록
            if (this.addFonts) {
                // 폰트 추가 있을 경우
                this.addFonts.map((item) => fonts.push(item));
            }
            quillFont.whitelist = fonts;
            this.editorOption.modules.toolbar[6][0].font = fonts;
            this.editorOption.placeholder = this.placeholder.length ? this.placeholder : '';
        }
    },

    mounted() {
        if (!this.observer) {
            // MutationObserver 생성
            this.observer = new MutationObserver(() => {
                this.styleAttribute = this.$el.getAttribute('style'); // style 변경 감지 후 업데이트
                this.editorInit();
            });
            // $el 감시 시작
            this.observer.observe(this.$el, {
                attributes: true, // 속성 변경 감시
                attributeFilter: ['style'], // style 속성만 감시
            });
        }

        this.styleAttribute = this.$el.getAttribute('style');
        this.editorInit();
    },

    watch: {
        toolOpts(val) {
            if (this.jodit) {
                this.editor.destruct();
            }
        },

        placeholder(val) {
            if (!this.jodit) {
                this.editorOption.placeholder = val;
            } else {
                this.editor.destruct();
            }
            this.editorInit();
        },

        contentData(val) {
            this.data = val;
        },

        value(val) {
            if (this.jodit) {
                this.editor.value != val && (this.editor.value = val);
            } else {
                this.contentData = val;
            }
        },
    },

    methods: {
        /**
         * 에디터 생성 및 속성 등록
         *
         */
        editorInit() {
            if (this.jodit) {
                const editorConfig = this.editorConfig();

                this.editor = Jodit.make(this.$refs.jodit_editor, editorConfig);

                this.editor.value = this.value;
                this.editor.updateContent = this.updateContent;

                // 에디터 내부 (textarea) 내용이 변경 되었을 때 실행 되는 이벤트
                this.editor.events.on('change', (e) => {
                    if (!!e?.trim() == false) {
                        // e = this.defaultMessage;
                        this.editor.execCommand('foreColor', false, '#000000');
                    }

                    if (this.updateContent) {
                        return this.$emit('input', e);
                    }
                });

                this.editor.events.on('setUpdateContent', (e) => {
                    this.updateContent = e;
                });

                //compositon 관련 사항 외에 모든 키 다운 이벤트 처리
                this.editor.events.on('keydown', (e) => {
                    this.updateContent = true;
                });

                //composition 관련 사항으로 인하여 한글 입력 후 최종적으로 작성 완료 때만 emit
                this.editor.editor.addEventListener('compositionend', (e) => {
                    this.$emit('input', e.target.innerHTML);
                });

                //composition 관련 사항으로 인하여 한글 입력 도중에는 에디터 내용 변하더라도 emit 막는 용도
                this.editor.editor.addEventListener('compositionupdate', (e) => {
                    this.updateContent = false;
                });
            } else {
                const editorWrap = document.getElementById(`quillEditor_${this.id}`);

                const editor = editorWrap.querySelector('.quill-editor');
                const toolbar = editorWrap.querySelector('.ql-toolbar.ql-snow');
                const content = editorWrap.querySelector('.ql-container.ql-snow');

                editor.style.height = this.styleConfig().height ? this.styleConfig().height : this.defaultHeight + 'px';
                editor.style.minHeight = this.styleConfig().minHeight ? this.styleConfig().minHeight : this.defaultMinHeight + 'px';
                editor.style.minWidth = this.styleConfig().minWidth ? this.styleConfig().minWidth : this.defaultMinWidth + 'px';

                // placeholder 없으면 아예 지워버리기
                if (!this.placeholder) {
                    content.querySelector('.ql-editor.ql-blank').removeAttribute('data-placeholder');
                } else {
                    content.querySelector('.ql-editor.ql-blank').setAttribute('data-placeholder', this.placeholder);
                }

                toolbar.style.background = this.toolOpts?.background;
            }
        },

        /**
         * custom jodit editor
         * 외부 props 값에 맞춰서 옵션 변경 및 스타일 적용
         */
        editorConfig() {
            let config = Object.assign({}, this.joditConfig);

            const styleConfig = this.styleConfig();

            if (this.placeholder) {
                config.showPlaceholder = this.placeholder.length > 0;
                config.placeholder = this.placeholder;
            }

            // 인라인 스타일 적용
            config = { ...config, ...styleConfig };

            // css 변수 선언
            config.styleValues = {
                // 'color-background-default': this.styleConfig.background, // content 배경
                // 'color-border': this.styleConfig.background, // 에디터 border 색깔
                'color-panel': this.toolOpts?.background, // tool 배경색
                'color-icon': this.toolOpts?.color, // tool icon
            };

            this.toolbarStickyOffset && (config.toolbarStickyOffset = this.toolbarStickyOffset);

            // content 내부 스타일
            config.style = {
                color: this.contentsOpts?.color,
                background: this.contentsOpts?.background,
            };

            let customButton = ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', 'indent', 'outdent', '|', 'font', 'brush', 'fontsize', 'paragraph', 'lineHeight', '|', 'superscript', 'subscript', '\n', 'cut', 'copy', 'paste', 'selectall', '|', 'hr', 'table', 'link', 'image', '|', 'left', '---', 'undo', 'redo', 'find', '|', 'source'];

            config.buttons = customButton;

            // 버튼 커스텀 추가 하고싶을 때 예시
            // let button = [
            //     ...Jodit.defaultOptions.buttons,
            //     {
            //         icon: 'brush',
            //         name: '삭제',
            //         tooltip: '내용을 모두 삭제합니다',
            //         exec: (t, e, n) => {
            //             console.log(t, e, n);
            //         },
            //     },
            // ];

            // config.buttons = button;

            return config;
        },

        /**
         * 외부 인라인 스타일
         */
        styleConfig() {
            const styleObj = {};

            if (!this.styleAttribute) {
                return styleObj;
            }

            this.styleAttribute.split(';').forEach((item) => {
                const [key, value] = item.split(':');
                const formattedKey = key.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
                if (formattedKey && value) {
                    styleObj[formattedKey] = value.trim();
                }
            });

            // minWidth 값 없을 경우 셋팅
            if (!styleObj.minWidth) {
                styleObj.minWidth = this.defaultMinWidth + 'px';
            }

            // minHeight 값 없을 경우 셋팅
            if (!styleObj.minHeight) {
                styleObj.minHeight = this.defaultMinHeight + 'px';
            }

            return styleObj;
        },
    },

    /**
     * 옵저버, 에디터 지우기
     */

    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }

        if (this.jodit) {
            // jodit 사용 시 제거
            this.editor.destruct();
        }
    },
};
</script>
