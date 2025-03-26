<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <comp-location></comp-location>

            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>버튼</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_brd is-data is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 130px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                            <col style="width: 100px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th><strong></strong></th>
                                                                <th><strong>Default</strong></th>
                                                                <th><strong>Active</strong></th>
                                                                <th><strong>Disabled</strong></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th><strong>&lt;a&gt; tag</strong></th>
                                                                <td>
                                                                    <comp-button href="#"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Small 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button class="is-small"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-small is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="" class="is-small" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Normal 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>Large 사이즈</strong></th>
                                                                <td>
                                                                    <comp-button class="is-large"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-large is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-large" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>X-Large 사이즈</strong></th>
                                                                <td class="no_bg">
                                                                    <comp-button class="is-xlarge"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-xlarge is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-xlarge" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>포인트컬러</strong></th>
                                                                <td><comp-button class="is-color-hl">버튼</comp-button></td>
                                                                <td>
                                                                    <comp-button class="is-color-hl is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-color-hl" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>블랙컬러</strong></th>
                                                                <td><comp-button class="is-color-black">버튼</comp-button></td>
                                                                <td>
                                                                    <comp-button class="is-color-black is-active"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-color-black" disabled><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>커스텀 컬러</strong></th>
                                                                <td>
                                                                    <comp-button custom-color="#ea8cd0"><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-only is-active" custom-color="#6880d8"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after" custom-color="#d6a924" disabled><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(only)</strong></th>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only is-active"><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button href="#" class="is-icon-only" disabled><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(with) - before</strong></th>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before"><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before is-active"><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-before" disabled><span class="icon">&#xe008;</span><span class="txt">버튼</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>아이콘(with) - after</strong></th>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after"><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after is-active"><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                                <td>
                                                                    <comp-button class="is-icon-with is-after" disabled><span class="txt">버튼</span><span class="icon">&#xe008;</span></comp-button>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th><strong>로딩 기능 사용</strong></th>
                                                                <td>
                                                                    <comp-button :loading="true"><span class="txt">다운로드</span></comp-button>
                                                                </td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
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
    </div>
</template>

<script>
export default {
    name: 'component-button',
};
</script>

<style></style>
