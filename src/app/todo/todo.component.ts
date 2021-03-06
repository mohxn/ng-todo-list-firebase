import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todoListArray: any[];
  constructor(private todoservice: TodoService) { }

  ngOnInit() {
      this.todoservice.getTodoList().snapshotChanges()
      .subscribe(item => {
        this.todoListArray = [];
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.todoListArray.push(x);
        });

        this.todoListArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
        });
      });

  }

  onAdd(itemTitle) {
    if (itemTitle.value === '') {
      return itemTitle.value = null;
    }
    this.todoservice.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string , isChecked) {
    this.todoservice.checkOrUncheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.todoservice.removeTitle($key);
  }

}
