// run script after dom load
document.addEventListener("DOMContentLoaded", function(){

    // init variable
    const students = [];
    const studentsInQueue = [];
    const STUDENT_FORM = "studentForm";
    const QUEUE_FORM = "queueForm";

    // get access to an element 
    const studentFormElem = document.getElementById(STUDENT_FORM);
    const nameListElem = document.getElementById('nameList');
    const totalElement = document.getElementById('total');
    const queueFormElem = document.getElementById(QUEUE_FORM);
    const queueListElem = document.getElementById('queueList');
    const findBtnElem = document.getElementById('find');
    const missingList = document.getElementById('missingList');

    // event monitor/listener
    studentFormElem.addEventListener('submit', addStudent);
    queueFormElem.addEventListener('submit', addStudent);
    findBtnElem.addEventListener('click', findMissingStudent);

    // add student to tour trip
    function addStudent(event){
        // on form submission, prevent default to avoid page refresh
        event.preventDefault();


        // construct a FormData object, which fires the formdata event
        const formData = new FormData(this);
        const name = formData.get('name'); 
        if(!name) return; // already html 5 validation added and only one field so additional validation message not required

        // check which form triggering event
        if(event.target.id === STUDENT_FORM) {
            // add new student in tour list
            students.push(name);
            // update total student
            updateTotal();
            
            // update UI to show name list
            updateNameList(name, nameListElem);
        }else {
            // there is only two possibilities not removed else if(event.target.id === QUEUE_FORM) 
            // add new student in tour list
            studentsInQueue.push(name);

            // update UI to show name list
            updateNameList(name, queueListElem);
        }

        // reset form - clear form data
        resetForm(this);
    }

    // show students name list - reusing same function for addtoqueue function
    function updateNameList(name, ulElement){
        // create li tag
        const li = document.createElement("li");
        // create text node for name
        li.appendChild(document.createTextNode(name));
        // append with unorder list
        ulElement.appendChild(li);
    }

    // update total students
    function updateTotal(){
        totalElement.innerText = students.length;
    }


    // reset form - clear form data
    function resetForm(form){
        form.reset();
    }

    // find missing list by comparing two array
    function findMissingStudent(){
        // remove old result - empty ul
        missingList.innerHTML = "";

        // make it unique
        const studentsSet = new Set(studentsInQueue);
        // get missing student
        const missingStudents = students.filter(student => !studentsSet.has(student));

        console.log(missingStudents)
        // show missing student list
        missingStudents.forEach(function(student){
            updateNameList(student, missingList);
        })
    }

});