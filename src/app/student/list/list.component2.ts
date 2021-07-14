
import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import { Student} from "../student";
import {Product} from "../product";
import {StudentService } from "../student.service";

@Component({
  selector: 'app-list2',
  templateUrl: './list.component2.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent2 implements OnInit {

  students!: Student[];
  products!: Product[];

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getStudents()
      .subscribe( data => {
        //console.log('data:', data)
        //console.log('data.result:', data.result)
        this.students = data;
      });
  }

  deleteProduct(student: Student): void {
    this.studentService.deleteStudent(student.id)
      .subscribe( data => {
        this.students = this.students.filter(u => u !== student);
      })
  };

  editProduct(student: Student): void {
    window.localStorage.removeItem("editStudentId");
    window.localStorage.setItem("editStudentId", student.id.toString());
    this.router.navigate(['edit']);
  };

  addProduct(): void {
    this.router.navigate(['add']);
  };

}