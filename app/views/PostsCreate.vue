<template>
    <div class="TotalWrap">
        <div class="Component">
            <div class="spaceBetween">
                <router-link :to="{ name: 'posts.index' }" class="BoardTitle">자유게시판
                </router-link>
            </div>
            <div v-for="post in posts" class="FlexColumn">
                <input type="text" class="form-control" v-model="post.title" placeholder="제목을 입력하세요" />
                <ckeditor v-model="post.content" :editor-url="editorUrl" class="marginTop10"></ckeditor>
                <input type="file" id="imgFile" multiple="multiple" name="imgfile[]" accept="image/*" @change="uploadImg" style="display: none" />
                <div class="flexStart">
                    <button class="btn btn-danger btn-sm" @click="store">
                        글쓰기 완료
                    </button>
                    <router-link :to="{ name: 'posts.index' }">
                        <button class="btn btn-outline-dark btn-sm marginLeft5">
                            취소
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import CKEditor from 'ckeditor4-vue';

    export default {
        data: () => ({
            editorUrl: 'https://lar2.cono.kr/static/lib/ckeditor/ckeditor.js',
            posts: [{
                id: 0,
                title: '',
                content: ''
            }],
            isStoring: false,
        }),
        components: {
            ckeditor: CKEditor.component,
        },
        methods: {
            uploadImg(e) {
                try {
                    AjaxImg.validate(e.target.files);
                } catch (e) {
                    alert(e.message);
                    e.target.value = '';
                    return false;
                }
                AjaxImg.setAxios(axios);
                AjaxImg.submitImg(e);
                e.target.value = '';
            },
            store() {
                if (this.isStoring === true) {
                    return false;
                }
                this.isStoring = true;
                let {
                    title,
                    content
                } = this.posts[0];

                axios
                    .post('/posts', {
                        'title': title,
                        'content': content
                    }, {
                        // headers: { 'Content-Type': 'application/json' },
                    })
                    .then((res) => {
                        this.$router.push({
                            name: 'posts.index'
                        });
                        // this.$toast('글 추가 성공');
                    })
                    .catch((e) => {
                        this.isStoring = false;
                        // this.$toast(e);
                    });
            },
            back() {
                this.$router.go(-1);
            },
        },
    };
</script>

<style scoped>
    .BoardTitle {
        font-weight: bold;
    }

    .PostTitle {
        margin-bottom: 35px;
        height: 32px;
        border-radius: 5px;
        padding: 10px;
    }

    .marginLeft5 {
        margin-left: 5px;
    }

    .spaceBetween {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }

    .flexStart {
        display: flex;
        justify-content: flex-start;
        margin: 10px 0;
    }

    .marginTop10 {
        margin-top: 10px;
    }
</style>