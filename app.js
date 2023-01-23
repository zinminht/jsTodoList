var getform = document.getElementById('form');
var gettextbox = document.getElementById('textbox');
var getul = document.getElementById('list-group');

getform.addEventListener('submit',function(e){

    addnew();
    e.preventDefault();

})

function addnew(todo){

    var todotext = gettextbox.value;
    // console.log(todotext);

    if(todo){
        todotext = todo.text;
    }

    if(todotext){
        const li = document.createElement('li');

        if(todo && todo.done){
            li.classList.add('done');
        }

        li.innerHTML = `${todotext} <a href="#" id="delete-item1" class="delete-item delete-me"><i class="fas fa-trash-can"></i></a>`;
        getul.appendChild(li);
        gettextbox.value = '';
    
        updatelocalstorage();

        li.addEventListener('click',function(){
            this.classList.toggle('done');

            updatelocalstorage();
        })

        document.addEventListener('click',function(e){
            console.log(e.target);

            if(e.target.parentElement.classList.contains('delete-item')){
                e.target.parentElement.parentElement.remove();

                updatelocalstorage();
            }
        })
    }
}

function updatelocalstorage(){

    var getalllis = document.querySelectorAll('li');

    const todos = [];

    getalllis.forEach(function(getallli){
        todos.push({
            text: getallli.textContent,
            done: getallli.classList.contains('done')
        });
    })

    // console.log(todos);

    localStorage.setItem('todos',JSON.stringify(todos));

}

var getlstodos = JSON.parse(localStorage.getItem('todos'));

if(getlstodos){
    getlstodos.forEach(function(getlstodo){
        // console.log(getlstodo);
        addnew(getlstodo);
    })
}