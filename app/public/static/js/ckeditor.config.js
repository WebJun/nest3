
CKEDITOR.replace('editor', {
    toolbar: [{
        name: 'document',
        items: ['Source']
    },
    {
        name: 'clipboard',
        items: ['Undo', 'Redo']
    },
    {
        name: 'basicstyles',
        items: ['Bold', 'Italic', 'Underline', 'Strike']
    },
    {
        name: 'links',
        items: ['Link', 'Unlink']
    },
    {
        name: 'insert',
        items: ['Table']
    },
    {
        items: ['Ajaximage']
    },
    {
        name: 'tools',
        items: ['Maximize']
    }],
    extraAllowedContent: 'img[src,alt]', // setData()에 img 허용
    resize_enabled: true, // 에디터 크기 조절 사용여부
    enterMode: CKEDITOR.ENTER_BR, // 엔터시 <br> 
    shiftEnterMode: CKEDITOR.ENTER_P, // 쉬프트+엔터시 <p>
    toolbarCanCollapse: false, // 툴바 클릭시 접히는 여부
    menu_subMenuDelay: 0, // 메뉴 클릭 할 때 딜레이 값
    autoParagraph: false,
    height: 400,
    width: '100%',
});
CKEDITOR.addCss('img {max-width:100%;}');
CKEDITOR.config.extraPlugins = ['ajaximage'];