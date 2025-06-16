import Header from "./components/Header/Header";
import { ToDoList } from "./components/List/ToDoList";
import { Footer } from "./components/Footer";
import { useTasks } from "./Service";
import { QueryProvider } from "./components/Header/QueryContext";

function App() {
  const {
    tasks,
    deleteTask,
    updateTask,
    deleteProject,
    updateProject,
    addProject,
    addTask,
    addTaskToProject,
  } = useTasks();

  return (
    <QueryProvider>
      <Header />
      <ToDoList
        tasks={tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
        deleteProject={deleteProject}
        updateProject={updateProject}
        addTaskToProject={addTaskToProject}
      />
      <Footer addTask={addTask} addProject={addProject} />
    </QueryProvider>
  );
}

export default App;
