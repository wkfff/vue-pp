const state = {
    projectList: [], //初始化一个colects数组
    isRefresh: false
};
const getters = {
    renderCollects(state) { //承载变化的collects
        return state.projectList;
    },
    getIsRefresh(state) { //承载变化的collects
        return state.isRefresh;
    }
};
const mutations = {
    pushCollects(state, items) { //如何变化collects,插入items
        state.projectList = items;
    },
    setIsRefresh(state, is) {
        state.isRefresh = is
    }
};
const actions = {
    invokePushItems(context, item) { //触发mutations里面的pushCollects ,传入数据形参item 对应到items
        context.commit('pushCollects', item);
    },
    setIsRefresh(context, is) {
        context.commit('setIsRefresh', is);
    }
};
export default {
    namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名
    state,
    getters,
    mutations,
    actions
}