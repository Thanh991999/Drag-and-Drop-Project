class app {
  constructor() {
    this.taskCards            = document.querySelectorAll('.task .task__item');
    this.taskStatusList       = document.querySelectorAll('.task .task__list');
    this.cardlist             = document.querySelectorAll('.card');

    this.addIndexItems();
    this.handleEvents();
  }

  handleEvents() {

    this.taskCards.forEach((task) => {
      // kich hoat tren the co thuoc tinh draggable
      task.ondragstart = (e) => {
        this.dragStart(e, task);
      }

      task.ondragend = (e) => {
        this.dragEnd(e, task);
      }
    })

    this.taskStatusList.forEach((taskStatus) => {
      // kich hoat khi the duoc tha vao
      taskStatus.ondragover = (e) => {
        this.dragOver(e, taskStatus);
      }

      taskStatus.ondrop = (e) => {
        this.drop(e, taskStatus);
      }
    })

    this.cardlist.forEach((card) => {
      card.setAttribute('draggable', true);
    })
  }

  dragStart(e, task) {
    // e.target.style.cursor = "move";
    // console.log(e.target.closest('.card').style.backgroundColor = 'red');
    task.classList.add('dragging');
    // console.log('dragStart');
  }

  dragEnd(e, task) {
    this.changeStyleStatus(task);
    task.classList.remove('dragging');
    this.checkTaskListEmpty();
    // console.log('dragEnd');
  }

  dragOver(e, taskStatus) {
    e.preventDefault();
    const afterElement = this.getDragAfterElement(taskStatus, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      taskStatus.appendChild(draggable);
    }
    else {
      taskStatus.insertBefore(draggable, afterElement);
    }
    // console.log('dragOver');
  }

  drop(e, taskStatus) {
    // e.preventDefault();
    console.log(taskStatus.querySelector('.card__status'));
  }

  checkTaskListEmpty() {
    this.taskStatusList.forEach((taskStatus) => {
      if (taskStatus.querySelectorAll('.task__item').length <= 0) {
        taskStatus.classList.add('empty');
      }
      else {
        taskStatus.classList.remove('empty');
      }
    })
  }

  changeStyleStatus(task) {
    if (task.closest('.task--completed')) {
      task.querySelector('.card__status').classList.remove('card__status--progress');
      task.querySelector('.card__status').classList.add('card__status--completed');
      task.querySelector('.card__status h3').innerHTML = 'Done';
    }
    else {
      task.querySelector('.card__status').classList.remove('card__status--completed');
      task.querySelector('.card__status').classList.add('card__status--progress');
      task.querySelector('.card__status h3').innerHTML = 'InProgress';
    }
  }

  getDragAfterElement(taskStatus, y) {
    const draggableElements = [...taskStatus.querySelectorAll('.task__item:not(.dragging)')];
    console.log(draggableElements);
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset){
        return {
          offset: offset, element: child
        }
      }
      else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  addIndexItems() {
    this.taskCards.forEach((item, index) => {
      item.setAttribute('data-index', index);
    });
  }
}

const appObj = new app();
// console.log(document.querySelector('.offsetY').getBoundingClientRect());
// function myFunction(e) {
//   console.log(e.offsetY);
//  }
