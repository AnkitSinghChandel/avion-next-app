const initialState = {
  addTaskRes: {},
  fetchAllTaskRes: {},
  fetchTaskByIdRes: {},
  updateTaskByIdRes: {},
  deleteTaskByIdRes: {},
  updateAllMultiTasksRes: {},
  addTaskCommentsRes: {},
  fetchCommentsByTaskIdRes: {},
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STATUS":
      return {
        ...state,
        addStatusRes: action.payload,
      };

    case "FETCH_ALL_STATUS":
      return {
        ...state,
        fetchAllStatusRes: action.payload,
      };

    case "UPDATE_STATUS_BY_ID":
      return {
        ...state,
        updateStatusByIdRes: action.payload,
      };

    case "DELETE_STATUS_BY_ID":
      return {
        ...state,
        deleteStatusByIdRes: action.payload,
      };

    case "ADD_TASK":
      return {
        ...state,
        addTaskRes: action.payload,
      };

    case "FETCH_ALL_TASK":
      return {
        ...state,
        fetchAllTaskRes: action.payload,
      };

    case "FETCH_TASK_BY_ID":
      return {
        ...state,
        fetchTaskByIdRes: action.payload,
      };

    case "UPDATE_TASK_BY_ID":
      return {
        ...state,
        updateTaskByIdRes: action.payload,
      };

    case "DELETE_TASK_BY_ID":
      return {
        ...state,
        deleteTaskByIdRes: action.payload,
      };

    case "UPDATE_ALL_MULTI_TASKS":
      return {
        ...state,
        updateAllMultiTasksRes: action.payload,
      };

    case "SEND_COMMENTS":
      return {
        ...state,
        addTaskCommentsRes: action.payload,
      };

    case "FETCH_COMMENTS_BY_TASK_ID":
      return {
        ...state,
        fetchCommentsByTaskIdRes: action.payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
