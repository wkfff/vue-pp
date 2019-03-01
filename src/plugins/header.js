import {
    mapGetters,
    mapActions
} from "vuex";
import creatProjectHTML from '../views/project/creatProject'

const data = function () {
    return {
        activeIndex: "1",
        myProjectList: null,
        projectList: null
    };
}

const methods = {
    ...mapActions("projectList", ["invokePushItems", 'setIsRefresh']),
    handleCommand(command) {
        if (command == '创建新项目') {
            this.fn_dialogVisible()
        } else if (command == '项目管理') {
            this.$router.push({
                name: "projectManage"
            });
        } else {
            // this.$router.push({
            //     path: '/home/project',
            //     query: {
            //         id: command
            //     }
            // });
        }
    },
    findMyProject() {
        this.AXIOS.get("/project/findMyProject")
            .then(response => {
                this.myProjectList = response.data;
                this.projectList = response.data; //过滤
                this.invokePushItems(this.projectList);
            })

    },
    fn_dialogVisible() {
        this.$refs.creatProjectHTML.dialogVisible = true;
    },
    routeClass: function (url) {
        return this.$route.path.includes(url) ? 'menu_item_active' : ''
    }
}

export default {
    components: {
        creatProjectHTML
    },
    data() {
        return data()
    },
    computed: {
        ...mapGetters("projectList", {
            isRefresh: "getIsRefresh"
        })
    },
    mounted() {
        this.findMyProject();
    },
    methods: methods,
    watch: {
        isRefresh(newVal, oldVal) {
            if (newVal) {
                this.findMyProject();
                this.setIsRefresh(false)
            }

        }
    }
};