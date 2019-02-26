import {
    mapGetters
} from "vuex"; //先要引入
import _ from "lodash";

const data = {
    popperOptions: {
        boundariesElement: "madeByMe"
    },
    workList: [],
    lev1List: [],
    lev2List: [],
    lev2Name: "全部",
    pipelineList: [],
    filter: {
        projectID: "",
        workID: "",
        lev1ID: "",
        lev2ID: "",
        pipelineID: "",
        status: "",
        startDate: "",
        endDate: "",
        key: "",
        sortBy: "projectName#asc",
        orderBy: "startDate#desc",
        isAssetOrShot: "",
        groupSortBy: "",
        groupBy: "",
        page: "1",
        pageSize: "50"
    },
    defaultProps: {
        children: "child",
        label: "fname"
    },
    radio1: "asc",
    radio: "startDate",
    radio2: "取消分组",
    radio3: ""
}




const methods = {
    fn_filter() {
        this.filter.page = 1;
        this.$parent.$refs.infiniteLoading.$emit("$onInfinite:resetreset");
    },
    // 业务列表
    WorkFindMyCharge() {
        let that = this;
        if (that.filter.projectID == 0) return false;

        that.workList = [];
        that.filter.workID = "全部";
        that.lev1List = [];
        that.filter.lev1ID = "全部";
        that.lev2List = [];
        that.lev2Name = "全部";
        that.pipelineList = [];
        that.pipelineID = "全部";

        that.AXIOS.get(
                that.GLOBAL.ServerUrl +
                "/Work/findAll?projectID=" +
                that.filter.projectID
            )
            .then(response => {
                if ("SUCCESS" === response.result) {
                    let data = response.data;
                    that.workList = data;
                }
            })
            .catch(error => {
                this.$message({
                    showClose: true,
                    message: error,
                    type: "error"
                });
            });
    },

    // 工序列表
    findPipelineByWork() {
        let that = this;
        this.pipelineList = [];
        that.filter.pipelineID = "全部";
        that.AXIOS.get(
                that.GLOBAL.ServerUrl +
                "/WorkflowNode/findPipelineByWork?workID=" +
                that.filter.workID
            )
            .then(response => {
                if ("SUCCESS" === response.result) {
                    let data = response.data;
                    that.pipelineList = data;
                }
            })
            .catch(error => {
                this.$message({
                    showClose: true,
                    message: error,
                    type: "error"
                });
            });
    },

    // lev1 列表
    findByParent(pid) {
        let that = this;
        let dataModel = null;
        _.forEach(that.workList, function (v) {
            if (v.id == that.filter.workID) {
                dataModel = v.dataModel;
                return false;
            }
        });

        that.lev1List = [];
        that.filter.lev1ID = "全部";
        that.lev2List = [];
        that.lev2Name = "全部";

        let url = "";
        if (dataModel == 2) {
            url = "AssetType";
        } else if (dataModel == 4) {
            url = "ShotType";
        } else if (dataModel == 6) {
            url = "OriginalType";
        } else if (!dataModel) {
            return false;
        }

        that.AXIOS.get(
                that.GLOBAL.ServerUrl +
                "/" +
                url +
                "/findByParent?pID=" +
                pid +
                "&projectID=" +
                that.filter.projectID
            )
            .then(response => {
                if ("SUCCESS" === response.result) {
                    let data = response.data;
                    that.lev1List = data;
                }
            })
            .catch(error => {
                this.$message({
                    showClose: true,
                    message: error,
                    type: "error"
                });
            });
    },

    // lev1 列表
    lev2ListTree() {
        let that = this;
        let pid = that.filter.lev1ID;
        let dataModel = null;
        _.forEach(that.workList, function (v) {
            if (v.id == that.filter.workID) {
                dataModel = v.dataModel;
                return false;
            }
        });
        let url = "";
        if (dataModel == 2 && pid != 0) {
            url = "AssetType";
        } else if (dataModel == 4 && pid != 0) {
            url = "ShotType";
        } else if (dataModel == 6 && pid != 0) {
            url = "OriginalType";
        } else if (pid == 0) {
            that.filter.lev2ID = '';
            that.lev2Name = "全部";
            return false;
        }
        that.AXIOS.get(
                that.GLOBAL.ServerUrl +
                "/" +
                url +
                "/tree?pID=" +
                pid +
                "&projectID=" +
                that.filter.projectID
            )
            .then(response => {
                if ("SUCCESS" === response.result) {
                    let data = response.data;
                    that.lev2List = data;
                }
            })
            .catch(error => {
                this.$message({
                    showClose: true,
                    message: error,
                    type: "error"
                });
            });
    },
    handleNodeClick(data) {
        this.filter.lev2ID = data.fid;
        this.lev2Name = data.fname;
    }
}





export default {
    components: {},
    name: "filterHTML",
    data() {
        return data;
    },
    computed: {
        ...mapGetters("projectList", {
            projectList: "renderCollects"
        })
    },
    mounted() {},
    created() {},
    methods: methods,
    watch: {
        renderCollects: function (newVal, oldVal) {
            console.log(newVal);
            console.log(oldVal);
            //其他业务代码
        }
    }
};