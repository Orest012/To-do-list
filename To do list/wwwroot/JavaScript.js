function UpdateFields(obj) {
    console.log(JSON.stringify(obj));
    console.log(obj.Name);
    let task_name = document.getElementById("text_" + obj.Id);
    task_name.value = obj.Name;
    
}

function SendNewData() {
    let task_name = document.getElementById("edit_task_name");
    let tack_description = document.getElementById("edit_task_description");
    let task_type = document.getElementById("edit_task_type");
    let task_date = document.getElementById("edit_task_date");
    let task_id = document.getElementById("edit_task_id");

    console.log("edit_task_name = " + task_name.value);
    console.log("edit_task_description = " + tack_description.value);
    console.log("edit_task_type = " + task_type.value);
    console.log("task_id = " + task_id.value);

    var dataToSend = {
        Id: task_id.value,
        Name: task_name.value,
        Description: tack_description.value,
        Type: task_type.value,
        IsCompleted: false,
        dateTime: task_date.value

    };

    fetch('/UpdateData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
         
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Помилка відповіді від сервера');
        }
        return response.json(); // Парсимо відповідь в формат JSON
    })
    .then(data => {
        // Обробка результату, який прийшов з сервера
        console.log(data); // Виводимо весь об'єкт JSON в консоль
        UpdateFields(dataToSend);
    })
    .catch(error => {
        console.error('Помилка при відправці даних:', error);
    });
}


function OpenEdit(num) {
    console.log("dasda " + num);
    MinusWidth();
    let close = document.getElementsByClassName("EditWindow")[0];

    if (close.style.display == "none") {
        close.style.display = "block";
    }
        var dataToSend = {
            Id: num
        };

        // Відправка даних на сервер
        fetch('/ProcessDataToEdit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Помилка відповіді від сервера');
                }
                return response.json(); // Парсимо відповідь в формат JSON
            })
            .then(data => {
                // Обробка результату, який прийшов з сервера
                console.log(data); // Виводимо весь об'єкт JSON в консоль
                console.log(data.name); // Виводимо конкретне поле name з об'єкта JSON в консоль

                let name = document.getElementById("edit_task_name");
                name.value = data.name;

                let description = document.getElementById("edit_task_description");
                description.value = data.description;

                let type = document.getElementById("edit_task_type");
                type.value = data.type;

                let dateTime = data.dateTime;
                let dateOnly = dateTime.split("T")[0];

                let dateInput = document.getElementById("edit_task_date");
                dateInput.value = dateOnly;

                let Id = document.getElementById("edit_task_id");
                Id.value = data.id;
            })

            .catch(error => {
                // Обробка помилки
                console.error('Помилка при відправці даних:', error);
            });
    
}



function OpenSchedule() {
    let close = document.getElementsByClassName("schedule")[0];
    if (close.style.display != "none") {
        CloseSchedule();
    }
    else {
        close.style.display = "block";
        MinusWidth();
    }
}

function CloseEdit() {
    let close = document.getElementsByClassName("EditWindow")[0];
    if (close.style.display != "none") {
        // CloseSchedule();
        let close = document.getElementsByClassName("EditWindow")[0];
        close.style.display = "none";
        AddWidth();
    }
    else {
        close.style.display = "block";
        MinusWidth();

    }
}

function AddWidth() {
    var taskDivs = document.getElementsByClassName("task_div");
    var add_task_divs = document.getElementsByClassName("add_task_div");
    var header_task_div = document.getElementsByClassName("task_div_header");

    if (taskDivs.length > 0) {
        for (var i = 0; i < taskDivs.length; i++) {
            taskDivs[i].style.width = "95%";
        }
    }

    if (add_task_divs.length > 0) {
        for (var i = 0; i < add_task_divs.length; i++) {
            add_task_divs[i].style.width = "95%";
        }
    }

    if (header_task_div.length > 0) {
        for (var i = 0; i < header_task_div.length; i++) {
            header_task_div[i].style.width = "95%";
        }
    }
}

function MinusWidth() {
    var taskDivs = document.getElementsByClassName("task_div");
    var add_task_divs = document.getElementsByClassName("add_task_div");
    var header_task_div = document.getElementsByClassName("task_div_header");


    if (taskDivs.length > 0) {
        for (var i = 0; i < taskDivs.length; i++) {
            taskDivs[i].style.width = "70%";
        }
    }

    if (add_task_divs.length > 0) {
        for (var i = 0; i < add_task_divs.length; i++) {
            add_task_divs[i].style.width = "70%";
        }
    }

    if (header_task_div.length > 0) {
        for (var i = 0; i < header_task_div.length; i++) {
            header_task_div[i].style.width = "70%";
        }
    }
}

function CloseSchedule() {
    let close = document.getElementsByClassName("schedule")[0];
    close.style.display = "none";
    AddWidth();
}
window.onload = function () {
    // Ваш код дії, який потрібно виконати при завантаженні сторінки
    console.log('Сторінка була завантажена');
    let close = document.getElementsByClassName("schedule")[0];
    if (close.style.display != "none") {
        MinusWidth();
    }
    else {
        AddWidth();
    }
};


function MarkTask(Id, routeType) {
    let particular_star = "mark_" + Id;
    let my_img = document.getElementById(particular_star);

    var styles = window.getComputedStyle(my_img); 
    var backgroundImage = styles.getPropertyValue('background-image');
    /*console.log('Шлях до зображення:', backgroundImage);*/


    var parts = backgroundImage.split('/');
    var filename = parts[parts.length - 1];
    var filenameWithoutExtension = filename.split('.')[0];
    console.log(filenameWithoutExtension);

    let type = "";
    if (filenameWithoutExtension == "yellow_star") {
        console.log("yes");
        console.log(my_img.style.backgroundImage);

        my_img.style.backgroundImage = "url('/icons/white_star.png')";
        if (routeType == 1) {

            type = 'Exclude';

        } if (routeType == 2) {

            type = 'ExcludeFromDay';
        } if (routeType == 3) {

            type = 'ExcludeImportant';
        }
    }
    else {
        console.log("no");
        console.log(my_img.style.backgroundImage);

        my_img.style.backgroundImage = "url('/icons/yellow_star.png')";
        if (routeType == 1) {

            type = 'MarkIndex';

        } if (routeType == 2) {

            type = 'MarkMyDay';
        } if (routeType == 3) {

            type = 'MarkImportant';
        }
    } 


    fetch("/MarkIndex", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id: Id,
            type: type
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
        })
        .catch(error => {
            // Обробка помилки
            console.error('There has been a problem with your fetch operation:', error);
        });


}

function AddTask() {
    let newTask = document.getElementById("Window_for_add");
    newTask.style.display = "block";

    let error_name = document.getElementById("error_name");
    error_name.innerText = "";

    let error_description = document.getElementById("error_description");
    error_description.innerText = "";

    let error_type = document.getElementById("error_type");
    error_type.innerText = "";
    //let error_priority = document.getElementById("error_priority");
    //error_priority.innerText = "";
}

function Cancel() {
    let newTask = document.getElementById("Window_for_add");
    newTask.style.display = "none";
    
}

function Cancel_date() {
    let newTask = document.getElementById("date_window");
    newTask.style.display = "none";
}

function Swap(id) {
    var taskDiv = document.getElementById('task_div_' + id);
    var destination = document.getElementById('deleted_tasks');

    if (taskDiv.parentNode == destination) {
        document.body.appendChild(taskDiv);
    } else {
        destination.appendChild(taskDiv);
    }

}

function return_to_normal(checkboxId, inputId) {
    var checkbox = document.getElementById(checkboxId);
    var input = document.getElementById(inputId);
    var container = document.getElementById('task_div');

    if (checkbox.checked) {
        container.appendChild(checkbox);
        container.appendChild(input);
    } else {
        var originalParent = document.querySelector('.task_div');
        originalParent.appendChild(input); 
    }
}

function AddNewTask(id, page) {
    
}

function checkTask(id, page, additional) {

    let close = document.getElementsByClassName("EditWindow")[0];
    if (close.style.display != "none") {

        let text_check = "done_" + id;
        var checkbox = document.getElementById(text_check);
        let text_id = "text_" + id;
        let task_block = "task_div_" + id;
        var text = document.getElementById(text_id);

        var route = '';
        if (page == 2) {
            route = '/DeleteMyDay'

            var sourceDiv = document.querySelector('.source');
            var deleted_tasks = document.querySelector('.deleted_tasks');
            // Перевіряємо, чи в елементі "sourceDiv" є дочірні елементи
            if (sourceDiv.childElementCount > 0) {
                console.log('В блоці є дочірні об\'єкти.');
                let source = document.getElementById('remain_tasks');
                source.style.display = "none";
            } else {
                let source = document.getElementById('remain_tasks');
                source.style.display = "block";
                console.log('В блоці немає дочірніх об\'єктів.');
            }

            if (deleted_tasks.childElementCount > 0) {
                console.log('В блоці є дочірні об\'єкти.');
                let source = document.getElementById('completed_tasks');
                source.style.display = "none";
            } else {
                let source = document.getElementById('completed_tasks');
                source.style.display = "block";
                console.log('В блоці немає дочірніх об\'єктів.');
            }
        }
        if (page == 1) {
            route = '/Delete';
        }




        if (checkbox.checked) {

            console.log("Вибране значення: true");
            text.style.textDecoration = "line-through";

            fetch(route, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id, // Використовуємо змінну id, яку передаємо у функцію
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    // Обробка успішної відповіді від сервера
                    console.log(response);
                })
                .catch(error => {
                    // Обробка помилки
                    console.error('There has been a problem with your fetch operation:', error);
                });
        } else {


            console.log("Вибране значення: false");
            text.style.textDecoration = "none";
            fetch('/Restore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: id,
                    type: additional
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log(response);
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    }

    var taskLists = document.querySelectorAll('.task_list');
    // Перевіряємо кожен елемент .task_list
    taskLists.forEach(function (taskList) {
        // Отримуємо всі елементи .task_div у поточному блоку .task_list
        var taskDiv = document.getElementById(taskList.id.replace("list", "div"));

        // Якщо елемент .task_div не знайдено
        if (!taskDiv) {
            var dateTimeParagraphs = taskList.querySelectorAll('p');

            dateTimeParagraphs.forEach(function (dateTimeParagraph) {
                dateTimeParagraph.remove();
            });
        }
    });
}

function open_select_date() {
    console.log("1!!");
    let open = document.getElementById("date_window");
    open.style.display = "block";
    console.log("222");
}


document.addEventListener("DOMContentLoaded", function () {
    const moveCheckboxes = document.querySelectorAll('.task_ch');
    const blockToMoves = document.querySelectorAll('.task_div');
    const destination = document.querySelector('.deleted_tasks');

    moveCheckboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                destination.appendChild(blockToMoves[index]);
            } else {
                document.querySelector('.source').appendChild(blockToMoves[index]);
            }
        });
    });
});



