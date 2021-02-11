<template>
  <div class="todo">
      <h1>{{header}}</h1>
      <form action="" method="post" v-on:submit.prevent="addTodo">
          <input type="text" v-model="titleTodo"/>
          <button type="submit" class="btn">Add</button>
      </form>
      <h2>My tasks:</h2>
      <ul>
          <li v-for="list in lists" :key="list.id">
              <input type="checkbox" v-on:change="completeTask(list)" v-bind:checked="list.isComplete"/>
              <span class="id">{{list.id}}.</span>

              <span v-bind:class="{done: list.isComplete}">
                  <span class="title"  contenteditable="true"
                        @click="updateTask($event, list)"
                        v-bind:class="{completed: list.isComplete}">{{list.title}}
                  </span>
              </span>

              <button class="btn del" v-on:click="Delete(list.id)">&#10006;</button>

          </li>
      </ul>
      <button @click="DelAll" class="btn">Delete all</button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data: () => {
      return {
          header: "Todo List",
          titleTodo: "",
          lists: [],
      }
  },
  methods : {
      addTodo: function () {

          this.lists.push({
             id: this.lists.length + 1,
             title: this.titleTodo,
             isComplete: false
          });
          this.titleTodo = "";

          console.log(this.lists);
      },
      completeTask: function(list){
          list.isComplete = !list.isComplete;
      },
      Delete: function (id) {
          this.lists = this.lists.filter(el => el.id !== id);
      },
      DelAll: function() {
         this.lists = [];
      },
      updateTask: function(e, list){
          list.title = e.target.innerText;
      }

  }

}

</script>

<style scoped>
.id {
    font-size: 20px;
    font-weight: 700;
    padding-left: 10px;
}
input {
    width: 300px;
    height: 25px;
    border: 2px solid #000000;
}
input[type = checkbox] {
    width: 30px;
}
.btn {
    height: 31px;
    width: 100px;
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

}
li {
  margin: 15px 0;
  width: 100%;
  max-width: 500px;
  border: 1px solid #cccccc;
  display: flex;
  align-items: center;

}
a {
  color: #42b983;
}
.title {
    font-size: 20px;
}
.done {
    text-decoration: line-through;
}
.del {
   margin-left: auto;
}

</style>
