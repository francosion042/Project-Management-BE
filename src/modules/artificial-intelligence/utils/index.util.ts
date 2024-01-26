interface Task {
  title: string;
  description: string;
}

interface TaskRequirement {
  description: string;
}

interface CategoryTasks {
  [category: string]: Task[];
}
function startsWithNumberOrHyphen(str: string): boolean {
  return /^[\d-]/.test(str);
}

export function extractColumnsAndTasks(response: string): CategoryTasks {
  const tasks: CategoryTasks = {};
  let currentCategory: string = '';

  const lines = response.split('\n');

  for (const line of lines) {
    if (line.startsWith('Category')) {
      currentCategory = line.split(':')[1].trim();

      if (!tasks[currentCategory]) {
        tasks[currentCategory] = [];
      }
    }
    if (startsWithNumberOrHyphen(line)) {
      tasks[currentCategory].push({
        title: line.split(':')[0].substring(2).trim(),
        description: line.split(':')[1].trim(),
      });
    }
  }

  return tasks;
}

export function extractTasks(response: string): Task[] {
  const tasks: Task[] = [];

  const lines = response.split('\n');

  for (const line of lines) {
    if (startsWithNumberOrHyphen(line)) {
      tasks.push({
        title: line.split(':')[0].substring(2).trim(),
        description: line.split(':')[1].trim(),
      });
    }
  }

  return tasks;
}

export function extractTaskDescription(response: string): string {
  const lines = response.split('\n');

  for (const line of lines) {
    if (
      line.startsWith('Task Description:') ||
      line.startsWith('Description:')
    ) {
      return line.split(':')[1].trim();
    }
  }

  return '';
}

export function extractTaskRequirements(response: string): TaskRequirement[] {
  const taskRequirements: TaskRequirement[] = [];
  const lines = response.split('\n');

  for (const line of lines) {
    if (startsWithNumberOrHyphen(line)) {
      taskRequirements.push({
        description: line.substring(2).trim(),
      });
    }
  }

  return taskRequirements;
}
