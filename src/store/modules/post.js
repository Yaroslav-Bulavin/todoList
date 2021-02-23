import axios from 'axios'

export default {
    state : {
        lists: [],
    },
    mutations : {
        createList(state, newList) {
            console.log(state.lists.length);
            state.lists.push(newList);
        },
        deleteList(state, id) {
            state.lists.splice(id-1, 1);
        },
        deleteAllLists(state) {
            console.log(state.lists.length);
            state.lists = [];
        },
        addListsData(state, data) {
            state.lists = data;
        }

    },
    actions : {
        addList({commit, state}, newList) {
            const id = state.lists.length + 1;

            axios.post("http://localhost:3000/lists", newList)
                .then(response => {
                    commit("createList", {
                        id,
                        ...newList
                    });
                    console.log(response.data);
                });
        },
        delList({commit}, id) {
            // commit("deleteList", index);
            axios.delete("http://localhost:3000/lists/" + id)
                .then(response => {
                    commit("deleteList", id);
                    console.log(response.data);
                });
        },
        delAllLists({commit, state}) {
            state.lists.forEach(el => {
                axios.delete("http://localhost:3000/lists/" + el.id)
                    .then(response => {
                        commit("deleteAllLists");
                        console.log(response.data);
                    })
            });

        },
        addListsDataAction({commit}, data) {
            commit("addListsData", data);
        }

    },
    getters: {
        allLists(state) {
            return state.lists;
        }

    },
}