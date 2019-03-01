import filterHTML from "../../views/myTask/filter";
import InfiniteLoading from "vue-infinite-loading";
import _ from "lodash";

const data = function (that) {
    return {
        title: that.$route.query.title,
        url: that.$route.query.url,
        TaskList: [],
        infiniteId: +new Date(),
        popperOptions: {
            boundariesElement: "madeByMe"
        },
        tableHeight: window.innerHeight - 108,

    }
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
        that.AXIOS.post("/Task/" + that.url, param)
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

    },
    filterSortBy() {
        let sortBy;
        try {
            sortBy = this.$refs.filterChild.filter.sortBy;
        } catch (error) {
            sortBy = "";
        }
        console.log(sortBy)
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
        return data(this)
    },
    mounted() {},
    created() {},
    methods: methods,
    watch: {
        $route(to, from) {
            this.title = this.$route.query.title;
            this.url = this.$route.query.url;
            this.$refs.filterChild.filter.page = 1;
            this.TaskList = [];
            this.infiniteId += 1;
        },
        infiniteId(newValue, oldValue) {
            // console.log(newValue)
            // console.log(oldValue)
            // console.log(this)
            // this.infiniteId = newValue;
        }
    }
};