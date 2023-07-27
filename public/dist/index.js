"use strict";
(function () {
    var Reminder = /** @class */ (function () {
        function Reminder(description, date, notifications) {
            this.id = '';
            this.created_at = new Date();
            this.updated_at = new Date();
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }
        Reminder.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Reminder;
    }());
    var Todo = /** @class */ (function () {
        function Todo(description) {
            this.id = '';
            this.created_at = new Date();
            this.updated_at = new Date();
            this.description = description;
        }
        Todo.prototype.render = function () {
            return JSON.stringify(this);
        };
        return Todo;
    }());
    var todo = new Todo('TODO criado com a classe');
    var reminder = new Reminder('REMINDER criado com a classe', new Date('2023-07-27'), ['EMAIL']);
    var taskView = {
        render: function (tasks) {
            var tasksList = document.querySelector('#tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach(function (task) {
                var li = document.createElement('li');
                var textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        }
    };
    var TaskController = function (view) {
        var _a;
        var tasks = [todo, reminder];
        var eventHandler = function (event) {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document.querySelector('#taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', eventHandler);
    };
    TaskController(taskView);
})();
