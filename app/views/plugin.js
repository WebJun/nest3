
let AjaxImg = {
    imgMaxN: 10,
    imgMaxSize: 10,
    allowExt: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    axios: null,
    init: () => {
        CKEDITOR.plugins.add('ajaximage', {
            init: AjaxImg.ajaximage
        });
    },
    ajaximage: (editor) => {
        let pluginName = 'ajaximage';
        editor.ui.addButton('Ajaximage', {
            label: '이미지 업로드',
            command: 'OpenWindow',
            icon: CKEDITOR.plugins.getPath('ajaximage') + 'ajaximage.gif'
        });
        let cmd = editor.addCommand('OpenWindow', {
            exec: () => {
                let ele = document.getElementById('imgFile');
                ele.click();
            }
        });
    },
    setAxios: (axios) => {
        this.axios = axios;
    },
    validate: (files) => {
        let dot_pos;
        let ext;
        if (files.length <= 0) {
            throw new Error(`이미지를 선택해주세요`);
        }
        if (files.length > AjaxImg.imgMaxN) {
            throw new Error(`이미지는 한 번에 최대 ${AjaxImg.imgMaxN}개까지 업로드할 수 있습니다.`);
        }
        for (let i = 0; i < files.length; i++) {
            ext = AjaxImg.getExtension(files[i].name);
            if (AjaxImg.allowExt.indexOf(ext) === -1) {
                throw new Error(`허용되지 않는 확장자입니다.`);
            }
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > AjaxImg.imgMaxSize * 1024 * 1024) {
                throw new Error(`이미지 하나의 최대 크기는 ${AjaxImg.imgMaxSize}MB입니다.`);
            }
        }
    },
    getExtension(path) {
        let basename = path.split(/[\\/]/).pop();
        let pos = basename.lastIndexOf('.');
        if (basename === '' || pos < 1) {
            return '';
        }
        return basename.slice(pos + 1).toLowerCase();
    },
    submitImg: (e) => {
        let formData = new FormData(); // formData 객체를 생성한다.
        for (let i = 0; i < e.target.files.length; i++) {
            formData.append('imgfile[]', e.target.files[i]);
        }
        console.log(axios)
        this.axios
            .post('/posts/images', formData)
            .then((res) => {
                // gv.loadingIcon.hide();
                let result = res.data;
                if (result.status !== 'OK') {
                    alert(result.message);
                    return false;
                }
                let imgData = '';
                for (let i = 0; i < result.crypto.length; i++) {
                    imgData += `<p><img src="https://lar2.cono.kr/storage/${result.crypto[i]}"
                            alt="${result.name[i]}"></p>`;
                }
                let lastKey = Object.keys(CKEDITOR.instances)[0];
                let originData = CKEDITOR.instances[lastKey].getData();
                CKEDITOR.instances[lastKey].setData(originData + imgData);
            })
            .catch((e) => {
                console.log(e)
                alert(e);
            });
    },
}
AjaxImg.init();
