(() => {
    interface Task {
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string;
        render(): string;
    }

    class Reminder implements Task {
        id: string = '';
        created_at: Date = new Date();
        updated_at: Date = new Date();
        description: string;

        date: Date;
        notifications: Array<string>;

        constructor(description: string, date: Date, notifications: Array<string>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }

    class Todo implements Task {
        id: string = '';
        created_at: Date = new Date();
        updated_at: Date = new Date();
        description: string;

        constructor(description: string) {
            this.description = description;
        }

        render(): string {
            return JSON.stringify(this);
        }
    }

    const todo = new Todo('TODO criado com a classe');

    const reminder = new Reminder('REMINDER criado com a classe',new Date('2023-07-27'),['EMAIL'])

    const taskView = {
        render(tasks: Array<Task>) {
            const tasksList = document.querySelector('#tasksList');

            while(tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        }
    }

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [todo,reminder];

        const eventHandler = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        };

        document.querySelector('#taskForm')?.addEventListener('submit', eventHandler);
    }

    TaskController(taskView);
})();