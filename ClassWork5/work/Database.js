"use strict";
class Course{
	constructor(name,hour, date , classes ){
	this.name = name;
	this.hour = hour;
	this.date = date;
	this.classes = classes
	
	}
	
	toString(){
	return this.name + " " + this.hour + " " + this.date + " "  + this.classes  
	}
}

class Student{
	constructor(id,name, gpa , courses ){
	this.id = id;
	this.name = name;
	this.gpa = gpa;
	this.courses = courses;
	
	}
	
	
	toString(){
	return this.id + " " + this.name + " " + this.gpa + " " + this.courses 
	}
}

class Point {
    constructor(x, y) {
        this.x = x;
		this.y = y;
    }
    toString() {
       return this.x + " , " + this.y
    }
}

class Point3D extends Point{
    constructor(x,y,z) {
		super(x,y); 
        this.z = z
    }
    toString() { 
        return this.x+" , "+this.y  + " , " + this.z
    }
}

class CW5 extends Menu {
  constructor() {
    super();
    this.point = new Point(5,3)
    this.point3D = new Point3D(5,4,3)
    this.Course = (new Course("ADP 101","08:00- 10:00","03-11-2019",  ["BGM 501","BGM 502","BGM 539","BGM 551"]))
    this.Student = (new Student(315001071,"ÇAĞRI", 1.84 , ["BGM 501","BGM 502","BGM 539","BGM 551"]))
  }
}
