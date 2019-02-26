import filterHTML from "../../views/myTask/filter";
import InfiniteLoading from "vue-infinite-loading";
import _ from "lodash";





const data = {
    title: this.$route.query.title,
    url: this.$route.query.url,
    TaskList: [],
    distance: 100, //临界值，距离底部多少距离时触发函数  infiniteHandler
    popperOptions: {
        boundariesElement: "madeByMe"
    },
    tableHeight: window.innerHeight
}





const methods = {
    onInfinite($state) {
        let that = this;
        let filter = {};
        let filterChild = that.$refs.filterChild;
        _.forEach(filterChild.filter, function (value, key) {
            if (value == 0) {
                filter[key] = "";
            } else {
                filter[key] = value;
            }
        });
        let param = {
            filter: JSON.stringify(filter)
        };
        that.AXIOS.post(that.GLOBAL.ServerUrl + "/Task/" + that.url, param)
            .then(response => {
                if ("SUCCESS" === response.result) {
                    let data = response.data;
                    if (filterChild.filter.page == 1) {
                        that.TaskList = data;
                    } else {
                        if (filterChild.filter["sortBy"] == "") {
                            that.TaskList = that.TaskList.concat(response.data);
                        } else {
                            _.forEach(data, function (value1, key1) {
                                _.forEach(that.TaskList, function (value, key) {
                                    if (value.id == value1.id) {
                                        let gList = that.TaskList[key].gList;
                                        that.TaskList[key].gList = _.concat(gList, value1.gList);
                                    } else {
                                        that.TaskList = that.TaskList.concat(response.data[key1]);
                                    }
                                });
                            });
                        }
                    }

                    let recordsTotal =
                        response.recordsTotal >=
                        filterChild.filter["page"] * filterChild.filter["pageSize"] ?
                        true :
                        false;
                    if (recordsTotal) {
                        filterChild.filter.page++;
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                }
            })
            .catch(error => {
                // $state.complete();
                this.$message({
                    showClose: true,
                    message: error,
                    type: "error"
                });
            });
    },
    filterSortBy() {
        let sortBy;
        try {
            sortBy = this.$refs.filterChild.filter.sortBy;
        } catch (error) {
            sortBy = "";
        }
        return sortBy;
    },
    tableRowClassName({
        row,
        rowIndex
    }) {
        return "expanded-row";
    }
}




export default {
    components: {
        filterHTML,
        InfiniteLoading
    },
    data() {
        return data;
    },
    mounted() {},
    created() {},
    methods: methods,
    watch: {
        $route(to, from) { 
            this.title = this.$route.query.title;
            this.url = this.$route.query.url;
            this.init();
        }
    }
};