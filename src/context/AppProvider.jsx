import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Đi học võ",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Đi học bơi",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
    {
      id: "4",
      name: "Đi mua bánh mì",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "idea",
    },
  ]);

  const [selectedCategoryId, setSelectedCategoryId] = useState();
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState();

  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemId(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const handleCompleteCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <AppContext.Provider
      value={{
        todoList,
        setTodoList,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        setActiveTodoItemId,
        handleTodoItemClick,
        handleTodoItemChange,
        handleCompleteCheckboxChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propsType = {
  children: PropTypes.element,
};
export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
