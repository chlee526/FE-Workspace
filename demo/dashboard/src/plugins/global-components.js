/**
 * 전역 컴포넌트 등록
 */

import Vue from 'vue';
//topSearch
import CompTopSearch from '@shared/ui/top_search';
//tree-view
import TreeView from '@shared/ui/tree_view';
//helpbox
import CompHelpboxBtn from '@shared/ui/helpbox_btn';
//board
import CompPaginate from '@shared/ui/board/paginate';
import CompTableSort from '@shared/ui/board/sort';
import CompTableFilter from '@shared/ui/board/filter';
//image
import CompImage from '@shared/ui/image';
//tooltip
import CompTooltip from '@shared/ui/tooltip';
//excel-button
import CompExcelBtn from '@shared/ui/excel_btn';
//chart
import CompChartPie from '@shared/ui/chart/pie';
import CompChartRadar from '@shared/ui/chart/radar';
import CompChartColumnLine from '@shared/ui/chart/column_line';
import CompChartWordcloud from '@shared/ui/chart/wordcloud';
import CompChartTreemap from '@shared/ui/chart/treemap';
import CompChartGender from '@shared/ui/chart/gender';
import CompChartAge from '@shared/ui/chart/age';
import CompChartGage from '@shared/ui/chart/gage';
/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  Layout 시작
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
//components > sidebar
import CompSidefollow from '@shared/layout/aside';
//common > location
import CompLocation from '@shared/layout/location';
/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  UI - FORM 시작
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
//favorites
import CompFavorite from '@shared/ui/form/favorite';
//datepicker
import CompDatePicker from '@shared/ui/form/datepicker';
//timepicker
import CompTimePicker from '@shared/ui/form/timepicker';
//button
import CompButton from '@shared/ui/form/button';
//inputbox
import CompInputBox from '@shared/ui/form/inputbox';
//selectBox
import CompSelectBox from '@shared/ui/form/selectbox';
//checkbox
import CompCheckBox from '@shared/ui/form/checkbox';
import CompCheckBoxGrp from '@shared/ui/form/checkboxGrp';
//switch
import CompSwitch from '@shared/ui/form/switch';
//radio
import CompRadio from '@shared/ui/form/radio/';
import CompRadioGrp from '@shared/ui/form/radioGrp/';
//tab
import CompTab from '@shared/ui/form/tab';
//textarea
import CompTextArea from '@shared/ui/form/textarea';
//slider
import CompSlider from '@shared/ui/form/slider';
//adv
import CompAdv from '@shared/ui/form/adv';
// Filter Grp
import CompFilterGrp from '@shared/ui/form/filterGrp';
// List
import CompList from '@shared/ui/form/listGrp';
// editor
import CompEditor from '@shared/ui/form/editor';
import CompJoidtEditor from '@shared/ui/form/editor/jodit';
// Colorpicker
import CompColorPicker from '@shared/ui/form/colorPicker';
/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  TEMPLATES 시작
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
//template
import TmplAgeRank from '@shared/templates/age_rank_table';
import TmplAttrSelector from '@shared/templates/attr_selector';
import TmplVolume from '@shared/templates/volume';
import TmplRkeyword from '@shared/templates/rkeyword';
import TmplHotKeyword from '@shared/templates/hot_keyword_rank';
import TmplIncGenderage from '@shared/templates/inc_genderage';
import TmplShareComparision from '@shared/templates/share_comparison';
//template > modal
import TmplModalRelinfo from '@shared/templates/modal/relinfo';
import TmplModalExRelationKeyword from '@shared/templates/modal/ex_relation_keyword';
import TmplModalSearchVolume from '@shared/templates/modal/search_volume';
import TmplModalReactionVolume from '@shared/templates/modal/reaction_volume';
import TmplModalSimilar from '@shared/templates/modal/similar';
import TmplModalCustom from '@shared/templates/modal/custom';
//고급검색 모달
import TmplModalAdvDetail from '@shared/ui/form/adv/AdvInputDetail';

/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

  전역 등록

  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/

//layout
Vue.component('comp-location', CompLocation);
Vue.component('comp-side-follow', CompSidefollow);

//topSearch
Vue.component('comp-topsearch', CompTopSearch);

//tree-view

Vue.component('tree-view', TreeView);

//helpbox
Vue.component('comp-helpbox-btn', CompHelpboxBtn);

//board
Vue.component('comp-paginate', CompPaginate);
Vue.component('comp-table-sort', CompTableSort);
Vue.component('comp-table-filter', CompTableFilter);

//image
Vue.component('comp-image', CompImage);

//tooltip
Vue.component('comp-bubble-box', CompTooltip);

//excel-button
Vue.component('comp-excel-btn', CompExcelBtn);

//chart
Vue.component('comp-chart-pie', CompChartPie);
Vue.component('comp-chart-radar', CompChartRadar);
Vue.component('comp-chart-column-line', CompChartColumnLine);
Vue.component('comp-chart-wordcloud', CompChartWordcloud);
Vue.component('comp-chart-treemap', CompChartTreemap);
Vue.component('comp-chart-gender', CompChartGender);
Vue.component('comp-chart-age', CompChartAge);
Vue.component('comp-chart-gage', CompChartGage);

/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  TEMPLATES 시작
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/
//templates
Vue.component('tmpl-page_age_rank', TmplAgeRank);
Vue.component('tmpl-attr_selector', TmplAttrSelector);
Vue.component('tmpl-volume', TmplVolume);
Vue.component('tmpl-rkeyword', TmplRkeyword);
Vue.component('tmpl-hot-keyword', TmplHotKeyword);
Vue.component('tmpl-inc-genderage', TmplIncGenderage);
Vue.component('tmpl-share-comparision', TmplShareComparision);

Vue.component('tmpl-modal-relinfo', TmplModalRelinfo);
Vue.component('tmpl-modal-search_volume', TmplModalSearchVolume);
Vue.component('tmpl-modal-ex_relation_keyword', TmplModalExRelationKeyword);
Vue.component('tmpl-modal-reaction-volume', TmplModalReactionVolume);
Vue.component('tmpl-modal-similar', TmplModalSimilar);
Vue.component('tmpl-modal-custom', TmplModalCustom);

//고급검색 모달
Vue.component('tmpl-modal-adv-detail', TmplModalAdvDetail);

/*
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
  UI - FORM 시작
  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
*/

//favorites
Vue.component('comp-favorites', CompFavorite);

//datepicker
Vue.component('comp-datepicker', CompDatePicker);

//timepicker
Vue.component('comp-timepicker', CompTimePicker);

//button
Vue.component('comp-button', CompButton);

//inputbox
Vue.component('comp-input-box', CompInputBox);

//selectBox
Vue.component('comp-selectbox', CompSelectBox);

//checkbox
Vue.component('comp-checkbox', CompCheckBox);
Vue.component('comp-checkbox-grp', CompCheckBoxGrp);

//switch
Vue.component('comp-switch-btn', CompSwitch);

//radio
Vue.component('comp-radio', CompRadio);
Vue.component('comp-radio-grp', CompRadioGrp);

//tab
Vue.component('comp-tab', CompTab);

//textarea
Vue.component('comp-textarea', CompTextArea);

//slider
Vue.component('comp-slider', CompSlider);

//adv
Vue.component('comp-adv', CompAdv);

// Filter Grp
Vue.component('comp-filter-grp', CompFilterGrp);

// List
Vue.component('comp-list', CompList);

// Colorpicker
Vue.component('comp-colorpicker', CompColorPicker);

// editor
Vue.component('comp-editor', CompEditor);

Vue.component('comp-jodit-editor', CompJoidtEditor);
