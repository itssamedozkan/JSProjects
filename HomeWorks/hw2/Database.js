
class Course{
	constructor(name,hour, date , classes ){
	this.name = name;
	this.hour = hour;
	this.date = date;
	this.classes = classes
	
	}
	
	toString(){
	
	return this.name + "," + this.hour +"," + this.date +","+ Array.from(this.classes.keys())
	}


}

class Student{
	constructor(id,name, gpa , courses ){
	this.id = id;
	this.name = name;
	this.gpa = gpa;
	this.courses = courses;
	
	}


}


class Database{
	constructor(){
	this.courses = new Map();
	this.studentList = new Map();
	}
	
	addStudents(txt) {
		let lines = txt.split("\n");
		for (let line of lines) {
		  let [id, name, gpa, ...courses] = line.split("\t");
		  
		  let coursesTaken = new Map()
		  for ( let cours of courses)
			coursesTaken.set(cours,data.courses.get(cours))
		  
		  let student =  new Student(id,name,Number(gpa),coursesTaken);
		  data.studentList.set(student.id , student);
		}
		console.log('Ögrenci Oluşturma Başarılı.')
		}
		
	addCourse(txt) {
		let lines = txt.split("\n");
		for (let line of lines) {
		  let [name, date, hour, ...classes] = line.split("\t");
			
			let classTaken = new Map()
			for (let cls of classes) 
				classTaken.set(cls)

		  let course =  new Course(name,date,hour,classTaken);
		  data.courses.set(course.name , course);
		}
		console.log('Kurs oluşturma Başarılı.')
		}

}


function createDatabase(database, students,courses){
 fetch(courses)
	.then(r => r.text())
	.then(database.addCourse);

 fetch(students)
	.then(r => r.text())
	.then(database.addStudents);



}
function randomStudent(collection){
let keys = Array.from(collection.keys());

let student = data.studentList.get(keys[Math.floor(Math.random() * keys.length)])

report("Random: "+student.name, student.id);

}

function getAboveGPA(value){

let studentList = []
for ([key,val] of data.studentList)
	if (val.gpa >= value){
	studentList.push(val.id + " " +  val.name);
	}
	
report("Above " + value +" Gpa students Found :" , studentList.length + " Students" , studentList)


}	

function showCoursesOf(value){
	let coursesTake = data.studentList.get(value).courses
	
		report("Courses of " + value , Array.from(coursesTake.keys()).length + " courses "  , Array.from(coursesTake.keys()) )
}

function findExamSchedule(cours){

	let values = data.courses.get(cours).toString().split(",")
	report("Exam Schedule for :" , cours ,values)
}

function findStudentsTakeCourse(cours){
cours = cours.toUpperCase()
let students = []
for ([key,val] of data.studentList){
	if (val.courses.has(cours))
		students.push(key +'  '+ val.name)
}

report("Students of " + cours , students.length +" students." , students)

}
 
function coursListByRoom(room){
room = room.toUpperCase();
let rooms = []
for (let [key,val] of data.courses){
	if(val.classes.has(room))
	rooms.push(key) }

report("Cours List of Room" +room , rooms.length + ". Courses", rooms)
}

function findStudent(id){
let ogrenci = data.studentList.get(id)
let t = id + " " + ogrenci.name + " " + ogrenci.gpa
report(t, Array.from(ogrenci.courses.keys()).length+" courses", Array.from(ogrenci.courses.keys()));

}

function findCourseCode(id){
let values = data.courses.get(id).toString().split(",")
	report("Cours :" , id ,values)

}





function report(msg, id, list) {
    cTxt.innerHTML += "<br>"; msg += " ";
    cTxt.appendChild(document.createTextNode(msg));
    let n1;
    if (id) {
        n1 = document.createElement("span");
        n1.appendChild(document.createTextNode(id));
        n1.classList.add("link");
        cTxt.appendChild(n1); msg += id;
        //n1.addEventListener("click", doClick);
    }
    if (list) {
        let n2 = document.createElement("span");
        n2.appendChild(document.createTextNode(""));
        n2.innerHTML += list.join("<br>");
        n2.classList.add("course");
        if (n1) n1.appendChild(n2);
    }
    console.log(msg);
}

function doClick(evt) {
    //console.log(evt);
    let t = evt.target;
    let s = t.innerText;
    if (/^\d+$/.test(s)){findStudent(String(s))
	} //s contains digits
    else if (t = t.firstElementChild) {
        t.style.visibility = "";
        let hide = function () {
            t.style.visibility = "hidden";
        };
        setTimeout(hide, 5000);
    }
}

function GpaCourse(){
var gpa = document.getElementById('a1').value;
    var course = document.getElementById('a2').value; 
	
	let studentList = []
	for ([key,val] of data.studentList)
	if (val.gpa >= Number(gpa) && val.courses.has(course.toUpperCase().trim())){
	studentList.push(val.id + " " +  val.name);
	}

report("Above " + gpa +" Gpa " + "with course " + course +"students Found :" , studentList.length + " Students" , studentList)
}

let data = new Database();
createDatabase(data,"https://maeyler.github.io/JS/data/Students.txt","https://maeyler.github.io/JS/data/Courses.txt")
