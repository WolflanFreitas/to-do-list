(() => {
    const todo = {
        description: 'todo',
        done: false
    };

    const reminder = {
        description: 'reminder',
        date: '2023-07-27'
    };

    const taskView = {
        render(tasks: Array<Object>) {
            const tasksList = document.querySelector('#tasksList');

            while(tasksList?.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }

            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(JSON.stringify(task));
                li.appendChild(textNode);
                tasksList?.appendChild(li);
            });
        }
    }

    const TaskController = (view: typeof taskView) => {
        const tasks: Array<Object> = [todo,reminder];

        const eventHandler = (event: Event) => {
            event.preventDefault();
            view.render(tasks);
        };

        document.querySelector('#taskForm')?.addEventListener('submit', eventHandler);
    }

    TaskController(taskView);
})();