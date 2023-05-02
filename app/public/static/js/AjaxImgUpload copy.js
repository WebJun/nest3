class AjaxImgUpload {
    constructor() {
        this.imgMaxN = 10;
        this.imgMaxSize = 10;
        this.allowExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        this.axios = null;
    }
    init() {
        this.setAxios(axios);
        CKEDITOR.plugins.add('ajaximage', {
            init: (editor) => {
                editor.ui.addButton('Ajaximage', {
                    label: '이미지 업로드',
                    command: 'OpenWindow',
                    icon: '/static/img/ajaximage.gif',
                });
                editor.addCommand('OpenWindow', {
                    exec: () => {
                        let e = document.getElementById('imgFile');
                        e.click();
                    }
                });
            },
        });
    }
    run(e) {
        try {
            const files = e.target.files
            this.validate(files);
            this.submit(files);
            e.target.value = '';
        } catch (e) {
            alert(e.message);
            e.target.value = '';
            return false;
        }
    }
    setAxios(axios) {
        this.axios = axios;
    }
    validate(files) {
        if (files.length <= 0) {
            throw new Error(`이미지를 선택해주세요`);
        }
        if (files.length > this.imgMaxN) {
            throw new Error(`이미지는 한 번에 최대 ${this.imgMaxN}개까지 업로드할 수 있습니다.`);
        }
        for (let i = 0; i < files.length; i++) {
            const ext = this.getExtension(files[i].name);
            if (this.allowExt.indexOf(ext) === -1) {
                throw new Error(`허용되지 않는 확장자입니다.`);
            }
        }
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > this.imgMaxSize * 1024 * 1024) {
                throw new Error(`이미지 하나의 최대 크기는 ${this.imgMaxSize}MB입니다.`);
            }
        }
    }
    getExtension(path) {
        const basename = path.split(/[\\/]/).pop();
        const pos = basename.lastIndexOf('.');
        if (basename === '' || pos < 1) {
            return '';
        }
        return basename.slice(pos + 1).toLowerCase();
    }
    async submit(files) {
        const formData = new FormData(); // formData 객체를 생성한다.
        [...files].forEach(file => formData.append('imgfile[]', file));
        const res = await this.axios.post('/file/upload', formData);
        const imgData = res.data.map((e) => {
            return `<p><img src="${e.filePath}"></p>`;
        }).join('');
        const lastKey = Object.keys(CKEDITOR.instances)[0];
        const originData = CKEDITOR.instances[lastKey].getData();
        CKEDITOR.instances[lastKey].setData(originData + imgData);
    }
}
