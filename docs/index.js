// component todo-item
LSDom.Component.create('todo-item', {
    props: ['todo', 'remove'],
    tmpl:  `<li classname="props.todo.done ? 'completed' : ''"><div class="view">
        <input class="toggle" type="checkbox" click="(e) => toggle(props.todo)" ls-checked="{props.todo.done}">
        <label>{props.todo.name}</label>
        <button class="destroy" click="(e) => props.remove(props.todo)"></button>
        </div></li>`,
    toggle(todo){
        todo.done = !todo.done;
    }
});

LSDom.Component.create('add-todo', {
    props: ['addItem'],
    tmpl: `<input type="text" class="new-todo" placeholder="What needs to be done?" model="scope.newItemName" keypress='(e) => add(e)'>`,
    scope: () => {
        return {
            newItemName: ''
        }
    },

    add(e){
        // add when enter key is pressed
        if (e.which === 13){
            if (this.scope.newItemName){
                this.props.addItem({
                    name: this.scope.newItemName,
                    done: false
                });

                this.scope.newItemName = '';
            }
        }
    }
});

LSDom.Component.create('todo-app', {
    tmpl: `<div class="todoapp">
        <header>
            <h1>todos</h1>
            <add-todo todos="scope.todos" addItem="add"></add-todo>
        </header>
        <section class="main">
            <ul class="todo-list">
                <todo-item for="item in todosFiltered" todo="item" remove="remove"></todo-item>
            </ul>
        </section>
        <footer class="footer" style="display: block;">
            <span class="todo-count"><strong>{{scope.todos.length}}</strong> items left</span>
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
        </footer>
        </div>`,

    scope: () => {
        return {
            todos: [{name: 'a', done: true}, {name: 'b', done: false}],
            tab: 'completed'
        }
    },

    computed: {
        todosFiltered(){
            return this.scope.todos.filter(item => this.scope.tab === 'all'
                || (this.scope.tab === 'active' && item.done === false)
                || (this.scope.tab === 'completed' && item.done === true)
            );
        },
    },

    remove(item){
        console.log('TodoApp: remove', item.name);
        let index = this.scope.todos.indexOf(item);
        this.scope.todos.splice(index, 1);
    },

    add(item){
        this.scope.todos.push(item);
    }
});

// init
LSDom.Component.render('todo-app', document.getElementById('app'));
