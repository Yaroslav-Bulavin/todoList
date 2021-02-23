<template>
    <div class="todo">
        <h1>{{header}}</h1>
        <form action="" method="post" v-on:submit.prevent="addTodo" class="form">
            <label for="inputTitle">Title of task:</label>
            <input type="text" id="inputTitle" v-model="titleTodo" required maxlength="25"/>
            <label for="descr">Description of task:</label>
            <textarea name="description" id="descr" cols="30" rows="10" v-model="descrTodo" required></textarea>
            <button type="submit" class="btn">Add</button>
        </form>
        <h2>My tasks:</h2>
        <ul>
            <li v-for="(list, index) in allLists" :key="list.id">
                <div class="menu">
                    <input type="checkbox" v-on:change="completeTask(list)" v-bind:checked="list.isComplete"/>
                    <span class="id">{{list.id}}.</span>

                    <span class="title"
                          @click="contentShow(list)"
                          v-bind:class="{done: list.isComplete}">{{list.title}}
                    </span>

                    <button class="btn del" v-on:click="Delete(list.id)">&#10006;</button>
                </div>
                <div class="content" v-bind:class="{done: list.isComplete}" v-if="list.isShow">
                    <p>{{list.description}}</p>
                </div>
                <div class="">{{index}}</div>
            </li>
        </ul>
        <button @click="DelAll" class="btn">Delete all</button>
    </div>
</template>

<script>

    import { mapGetters, mapMutations, mapState} from "vuex";
    import axios from "axios";

    export default {
        name: 'HelloWorld',
        data: function () {
            return {
                header: "Todo List",
                titleTodo: "",
                descrTodo: "",
            }
        },
        computed: {
            ...mapGetters(["allLists"]),
            ...mapState([
                'lists'
            ])
        },
        methods: {
            ...mapMutations(["createList", "deleteList", "deleteAllLists", "addListsData"]),
            addTodo() {

                this.$store.dispatch('addList', {
                    title: this.titleTodo,
                    isComplete: false,
                    isShow: false,
                    description: this.descrTodo
                    }
                );

                this.titleTodo = "";
                this.descrTodo = "";
            },
            completeTask: function (list) {
                list.isComplete = !list.isComplete;
            },
            Delete: function(id) {
                this.$store.dispatch('delList', id);
            },
            DelAll() {
                this.$store.dispatch('delAllLists');
            },
            contentShow: function (list) {
                list.isShow = ! list.isShow;
            }

        },
        mounted() {
            axios.get('http://localhost:3000/lists')
                .then(response => {
                    this.$store.dispatch("addListsDataAction", response.data);
                    console.log(response.data)
                })
                .catch(error => console.log(error));

        }

    }

</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    label {
        font-size: 16px;
        font-weight: 700;
        text-align: left;
    }
    textarea {
        resize: none;
        border: 1px solid #000000;
        width: 100%;
        max-width: 300px;
        margin-bottom: 10px;
    }
    .id {
        font-size: 20px;
        font-weight: 700;
        padding-left: 10px;
    }

    input {
        width: 100%;
        max-width: 300px;
        height: 25px;
        border: 1px solid #000000;
        margin-bottom: 10px;
    }

    input[type = checkbox] {
        width: 30px;
        margin-top: 9px;
        cursor: pointer;
    }

    .btn {
        height: 31px;
        width: 306px;
        background-color: #42b983;
        color: #ffffff;
        border: 2px solid #42b983;
        font-weight: 700;
        font-size: 18px;
        outline: 0;
        cursor: pointer;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 0;
    }

    li {
        margin: 15px 0;
        width: 100%;
        max-width: 500px;
        border: 1px solid #cccccc;

    }
    .menu {
        display: flex;
        align-items: center;
        height: 31px;
        border-bottom: 1px solid #cccccc;
    }
    .content {
        display: block;
        word-wrap: break-word;
    }
    .content p {
        margin: 0;
        text-align: left;
        padding: 10px;

    }

    a {
        color: #42b983;
    }

    .title {
        font-size: 20px;
        cursor: pointer;
        user-select: none;
    }

    .done {
        text-decoration: line-through;
    }

    .del {
        margin-left: auto;
        width: 120px;
    }

</style>
