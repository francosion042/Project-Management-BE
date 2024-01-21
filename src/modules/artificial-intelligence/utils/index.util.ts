interface Task {
  title: string;
  description: string;
}

interface CategoryTasks {
  [category: string]: Task[];
}
function startsWithNumberOrHyphen(str: string): boolean {
  return /^[\d-]/.test(str);
}

export function extractTasks(response: string): CategoryTasks {
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
