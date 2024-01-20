interface Task {
  title: string;
  description: string;
}

interface CategoryTasks {
  [category: string]: Task[];
}
function startsWithNumberOrHyphen(str: string): boolean {
  // Use a regular expression to check if the string starts with a number or hyphen
  return /^[\d-]/.test(str);
}

export function extractTasks(response: string): CategoryTasks {
  const tasks: CategoryTasks = {};
  let currentCategory: string = '';

  // Split the response into lines
  const lines = response.split('\n');

  // Iterate through each line
  for (const line of lines) {
    // Check if line starts with Category
    if (line.startsWith('Category')) {
      currentCategory = line.split(':')[1].trim();

      if (!tasks[currentCategory]) {
        tasks[currentCategory] = [];
      }
    }
    // Check if the line starts with a -
    if (startsWithNumberOrHyphen(line)) {
      tasks[currentCategory].push({
        title: line.split(':')[0].substring(2).trim(),
        description: line.split(':')[1].trim(),
      });
    }
  }

  return tasks;
}
