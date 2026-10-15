<script>
    import ToDoItem from "#lib/todoList/toDoItem.svelte";
    const username = "Ethan";
    let count = $state(0);
    let todoList = $state(['breakfast', 'dinner']);
    let todoListCount = $derived(todoList.length);
    function incrementCount() {
        count++;
    }
    function decrementCount() {
        count--;
    }
    function addToTodoList(){
        todoList.push("brush your teeth");
    }

    

</script>
{#if todoListCount === 0}
<p>Add a todo item!</p>
{:else if todoListCount < 10}
<p>that's a good todo list</p>
{:else}
<p>thats too many todo items!</p>
{/if}
<h1>Hello welcome to my website</h1>
<button onclick={incrementCount}>Increment</button>
<button onclick={decrementCount}>decrement</button>
<button onclick={decrementCount}>decrement</button>
<div>Count {count}</div>
<div>todoList count {todoListCount}</div>
<button onclick={addToTodoList}>Add to todo list</button>
<ul>
    {#each todoList as todoItem, idx}
    <li>
        {todoItem}
    </li>
    {/each}
</ul>






<div>I hope you're having a good day :)</div>
<style>
    div {
        color: blue;
    }
    h2{
        color:green;
    }
</style>