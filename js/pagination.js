var template = `    <div style="width:800px;">
<div class="col-lg-4">
    <label class="">共<span id="totalPage">{{totalPage}}</span>页
        总共<b> {{total}} </b>条
        <select v-model="limit">
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
            <option>50</option>
            <option>100</option>
        </select>条/页</label>
</div>
<!-- <label class="control-label col-lg-2">
    </label> -->
<div class="col-lg-8" style="display:inline-block;">
    <ul class="pagination">
        <li v-if="page != 1"><a href="#" @click="firstPage">&laquo;</a></li>
        <li v-if="page != 1"><a href="#">&lt;</a></li>
        <li v-for="(pageNum,index) in pageList" :class="[{'active':currentActive == index+1}]">
            <a href="#" @click="jumpPage(pageNum)"> {{ pageNum }}</a>
        </li>
        <li v-if="page != totalPage" :class="[{'disabled':page == totalPage}]"><a v-on:click="nextPage"
                href="#">&gt;</a></li>

        <li v-if="page != totalPage"><a href="#" @click="lastPage">&raquo;</a></li>
        <li><span><input type="text"  v-model="jumpNum"
                    style="width:40px;height:20px" /></span></li>
        <li><a href="#" @click="jumpPage(jumpNum)">转到</a></li>
    </ul>
</div>

</div>`;

var pagination = Vue.component("pagination", {
    props: {
        pageModel:{
            default:{
                total:50,
                totalPage:5
            }
        }
    },
    template: template,
    data: function () {
        return {
            page: 1,
            total: 2,
            totalPage: 10,
            limit: 10,
            currentActive: 1,
            jumpNum: 1,
        }
    },
    created: function () {
        this.totalPage = this.pageModel.totalPage;
        this.total = this.pageModel.total;
        this.$emit("query", this.page, this.totalPage);
    },
    methods: {
        previousPage: function () {
            this.page--;
        },
        nextPage: function () {
            // if(this.totalPage != this.page){
            this.page++;
            // }
        },
        jumpPage: function (num) {
            if (isNaN(num)) {
                console.log("错误输入");
                return;
            }
            var page = parseInt(num);
            if (page <= this.totalPage) {
                this.page = page;
            }
        },
        firstPage: function () {
            this.page = 1;
        },
        lastPage: function () {
            this.page = this.totalPage;
        }

    },
    watch: {
        page(newPage, oldPage) {
            switch (newPage) {
                case this.pageList[0]:
                    this.currentActive = 1;
                    break;
                case this.pageList[1]:
                    this.currentActive = 2;
                    break;
                case this.pageList[2]:
                    this.currentActive = 3;
                    break;
                case this.pageList[3]:
                    this.currentActive = 4;
                    break;
                case this.pageList[4]:
                    this.currentActive = 5;
                    break;
            }
            this.$emit("query", newPage, this.totalPage);
        },
        pageModel: {
            handler(newModel, oldModel) {
                this.totalPage = newModel.totalPage;
                this.total = newModel.total;
            },
            deep: true,
        },
    },
    computed: {
        pageList: function () {
            var list = [];
            if (this.page >= 3) {
                if (this.totalPage - this.page >= 3) {
                    list = [this.page - 2, this.page - 1, this.page, this.page + 1, this.page + 2];
                }
                else {
                    list = [this.totalPage - 4, this.totalPage - 3, this.totalPage - 2, this.totalPage - 1, this.totalPage];

                }
            } else {
                list = [1, 2, 3, 4, 5];
            }
            return list;
        },
    }
});