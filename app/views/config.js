/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    config.toolbar = [
        { name: 'document', items: ['Source'] },
        { name: 'clipboard', items: ['Undo', 'Redo'] },
        { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike'] },
        { name: 'links', items: ['Link', 'Unlink'] },
        { name: 'insert', items: ['Table'] },
        { items: ['Ajaximage'] },
        { name: 'tools', items: ['Maximize'] },
    ];
    config.extraPlugins = 'ajaximage';
    config.extraAllowedContent = 'img[src,alt]'; // setData()에 img 허용
    config.resize_enabled = true; // 에디터 크기 조절 사용여부
    config.enterMode = CKEDITOR.ENTER_BR; // 엔터시 <br> 
    config.shiftEnterMode = CKEDITOR.ENTER_P; // 쉬프트+엔터시 <p>
    config.toolbarCanCollapse = false; // 툴바 클릭시 접히는 여부
    config.menu_subMenuDelay = 0; // 메뉴 클릭 할 때 딜레이 값
    config.autoParagraph = false;
    config.protectedSource.push(/<\?[\s\S]*?\?>?/g);
    config.height = 400;
};

CKEDITOR.addCss('img {max-width:100%;}');
