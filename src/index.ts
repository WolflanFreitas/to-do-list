(() => {
    enum NotificationPlatform {
        SMS = 'SMS',
        EMAIL = 'EMAIL',
        PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
    }

    enum ViewMode {
        TODO = 'TODO',
        REMINDER = 'REMINDER'
    }

    const generateUUID = (): string => {
        return Math.random().toString(32).substring(2 ,9);
    }

    const DateUtils = {
        tomorrow(): Date {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today(): Date {
            return new Date();
        },
        formatDate(date: Date): string {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }
    }
    interface Task {
        id: string;
        created_at: Date;
        updated_at: Date;
        description: string;
        render(): string;
    }
    class Reminder implements Task {
        id: string = generateUUID();
        created_at: Date = DateUtils.today();
        updated_at: Date = DateUtils.today();
        description: string;

        date: Date;
        notifications: Array<NotificationPlatform>;

        constructor(description: string, date: Date, notifications: Array<NotificationPlatform>) {
            this.description = description;
            this.date = date;
            this.notifications = notifications;
        }

        render(): string {
            return `---->Reminder<----
            description: ${this.description}
            date: ${DateUtils.formatDate(this.date)}
            platform: ${this.notifications.join(',')}

            `
        }
    }
    class Todo implements Task {
        id: string = generateUUID();
        created_at: Date = DateUtils.today();
        updated_at: Date = DateUtils.today();
        description: string;
        done: boolean = false;

        constructor(description: string) {
            this.description = description;
        }

        render(): string {
            return `---->TODO<----
            description: ${this.description}
            done: ${this.done}

            `
        }
    }

    const todo = new Todo('TODO criado com a classe');

    const reminder = new Reminder('REMINDER criado com a classe',DateUtils.tomorrow(),[NotificationPlatform.EMAIL])

    const taskView = {
        getTodo(form: HTMLFormElement): Todo {
            const todoDescription = form.todoDescription.value;
            form.reset();
            return new Todo(todoDescription);
        },
        getReminder(form: HTMLFormElement): Reminder {
            const reminderNotifications = [
                form.notification?.value as NotificationPlatform
            ];
            const reminderDate = new Date(form.scheduleDate?.value);
            const reminderDescription = form.reminderDescription.value;
            form.reset();
            return new Reminder(
                reminderDescription,
                reminderDate,
                reminderNotifications
            );
        },
        render(tasks: Array<Task>, mode: ViewMode) {
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

            const todoSet = document.querySelector('#todoSet');
            const reminderSet = document.querySelector('#reminderSet');

            if(mode === ViewMode.TODO){
                todoSet?.setAttribute('style', 'display: block');
                todoSet?.removeAttribute('disabled');
                reminderSet?.setAttribute('style', 'display: none');
                reminderSet?.setAttribute('disabled', 'true');
            } else {
                reminderSet?.setAttribute('style', 'display: block');
                reminderSet?.removeAttribute('disabled');
                todoSet?.setAttribute('style', 'display: none');
                todoSet?.setAttribute('disabled','true');
            }
        }
    }

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Task> = [];
        let mode: ViewMode = ViewMode.TODO;

        const eventHandler = (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            switch(mode as ViewMode) {
                case ViewMode.TODO:
                    tasks.push(view.getTodo(form))
                break;
                case ViewMode.REMINDER:
                    tasks.push(view.getReminder(form))
                break;
            }
            view.render(tasks, mode);
        };

        const handleToggleMode = () => {
            switch(mode as ViewMode) {
                case ViewMode.TODO:
                    mode = ViewMode.REMINDER
                    break;
                case ViewMode.REMINDER:
                    mode = ViewMode.TODO
                    break;
            }
            view.render(tasks, mode);
        }

        document.querySelector('#toggleMode')?.addEventListener('click', handleToggleMode);
        document.querySelector('#taskForm')?.addEventListener('submit', eventHandler);
    }

    TaskController(taskView);
})();