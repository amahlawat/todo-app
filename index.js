// this is a Todo class for integrating data with root element
class Todo{
    constructor(){
        this.rootElement = document.getElementById('root');
        this.todoData = [
            'i am learning object oriented javascript',
            'This is a beautiful day'
        ];
    }

    mainComponent(){
        this.rootElement.innerHTML = `
        <h1 class="centered main-heading">Todo App</h1>
        <h5 class="heading-msg">this app is developed in object-oriented javascript</h5>
        <div class="todo--app">
            <div class="input--section">
                <textarea cols="100" rows="3" id="todo-input" class="form--text"></textarea>              
                <button class="form--btn" id="save-btn">Save</button>
            </div>
            <div class="todo--data">
                <ul id="todo-display-data" class="todo--display--data" />
            </div>
        </div>
        `;
        // bind click listener to save-btn
        document.getElementById('save-btn').addEventListener('click', () => {
            // save the submitted task in todoData array
            let task = document.getElementById("todo-input").value;
            this.todoData.push(task);
            document.getElementById("todo-input").value = "";
            this.bindTodoData();
            this.removeTask();
            this.editTask();
            // console.log(this.todoData)
        });
    }

    bindTodoData(){
        // if there is data in todoData array then bind to id="todo-display-data"
        let dataComp = [];
        if(this.todoData.length > 0){
            this.todoData.forEach((task, index) => {
                dataComp.push(`
                    <li id="task-${index}">
                        ${task}&nbsp; 
                        <button class="func-btn">
                            <i class="fa fa-edit task-edit" id="task-edit-${index}"></i>
                        </button>&nbsp;
                        <button class="func-btn">
                            <i class="fa fa-remove task-remove" id="task-remove-${index}"></i>
                        </button>
                    </li>`
                )
            })
        }else{
            dataComp.push(`<li>Please add task</li>`);
        }
        document.querySelector("#todo-display-data").innerHTML = dataComp;        
    }

    removeTask(){
        const removeButtons = document.querySelectorAll(".task-remove")
        for(let button of removeButtons){
            button.addEventListener("click", (event) => {
                let index = (event.target.id).replace("task-remove-", "");
                let updatedTask = this.todoData;
                updatedTask.splice(index, 1);
                this.todoData = updatedTask;
                this.bindTodoData();
            })    
        }
    }

    // this is for editing task
    editTask(){
        const editButtons = document.querySelectorAll(".task-edit")
        for(let button of editButtons){
            button.addEventListener("click", (event) => {
                let index = (event.target.id).replace("task-edit-", "");
                // console.log("index ", index);
                let value = this.todoData[index];
                // console.log("value ", value);
                document.getElementById("task-"+index).innerHTML = `
                    <textarea cols="70" rows="2" id="task-update-text-${index}">${value}</textarea>
                    <button class="func-btn">
                        <i class="fa fa-check-circle task-update" id="task-update-${index}"></i>
                    </button>
                `;
                // now update a task
                const taskUpdateButton = document.querySelector("#task-update-"+index)
                    taskUpdateButton.addEventListener("click", (event) => {
                        console.log("clicked");
                        let index = (event.target.id).replace("task-update-", "");
                        console.log("index ", index);
                        let value = document.getElementById("task-update-text-"+index).value;
                        console.log("value ", value);
                        this.todoData[index] = value;
                        this.bindTodoData();
                    })
            })
        }
    }
}

var todo = new Todo();
todo.mainComponent();
todo.bindTodoData();
todo.removeTask();
todo.editTask();

var todoData = todo.todoData;