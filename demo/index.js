// component todo-item
class TodoItem extends Component {
    constructor() {
        super();
        this.props = ['todo'];
        this.tmpl = '<li>{todo.name}<button click="props.remove(props.todo)">x</button></li>'
    }
}


class AddTodo extends Component {
    constructor() {
        super();

        this.props = ['addItem'];
        this.tmpl = `<input type="text" model="scope.newItemName"><button click="add()">add</button>`;
        this.scope = {
            newItemName: ''
        }
    }

    add(){
        this.addItem({
            name: this.scope.newItemName
        });

        this.scope.newItemName = '';
    }
};

class TodoApp extends Component {
    constructor(){
        super();

        this.tmpl = `<div>
                <h1>{'To' + 'DO'}: {scope.todos.length}</h1>
                <ul>
                    <li style="{display: scope.todos.length > 0 ? 'none' : 'inherit'}">no item</li>
                    <todo-item for="item in scope.todos" todo="item"></todo-item>
                </ul>
                <p><add-todo todos="scope.todos" addItem="addItem"></add-todo></p>
            </div>`,
        this.scope = {
            todos: [],
        }
    }

    remove(item){
        let index = this.scope.todos.indexOf(item);
        this.scope.todos.splice(index, 1);
    }

    add(item){
        this.scope.todos.push(item);
    }
}

Component.list = {
    'todo-item': TodoItem,
    'add-todo': AddTodo,
    'todo-app': TodoApp
}

// init
Component.render(TodoApp, document.getElementById('app'));
