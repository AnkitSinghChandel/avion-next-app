const initialApiState = {
  loading: false,
  data: null,
  error: null,
};

const initialState = {
  addTeamRes: { loading: false, data: null, error: null },
  fetchTeamRes: { loading: false, data: [], error: null },
  deleteTeamRes: { loading: false, data: null, error: null },
  fetchTeambyidRes: { loading: false, data: null, error: null },
  updateTeambyidRes: { loading: false, data: null, error: null },
  teamsGenratePDFRes: { loading: false, data: null, error: null },
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    // add team
    case "ADD_TEAM_REQUEST":
      return {
        ...state,
        addTeamRes: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "ADD_TEAM_SUCCESS":
      return {
        ...state,
        addTeamRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "ADD_TEAM_FAILURE":
      return {
        ...state,
        addTeamRes: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // fetch team
    case "FETCH_TEAM_REQUEST":
      return {
        ...state,
        fetchTeamRes: {
          loading: true,
          data: [],
          error: null,
        },
      };

    case "FETCH_TEAM_SUCCESS":
      return {
        ...state,
        fetchTeamRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "FETCH_TEAM_FAILURE":
      return {
        ...state,
        fetchTeamRes: {
          loading: false,
          data: [],
          error: action.payload,
        },
      };

    // delete team
    case "DELETE_TEAM_REQUEST":
      return {
        ...state,
        deleteTeamRes: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "DELETE_TEAM_SUCCESS":
      return {
        ...state,
        deleteTeamRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "DELETE_TEAM_FAILURE":
      return {
        ...state,
        deleteTeamRes: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // fetch team by id
    case "FETCH_TEAM_BY_ID_REQUEST":
      return {
        ...state,
        fetchTeambyidRes: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "FETCH_TEAM_BY_ID_SUCCESS":
      return {
        ...state,
        fetchTeambyidRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "FETCH_TEAM_BY_ID_FAILURE":
      return {
        ...state,
        fetchTeambyidRes: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // update team by id
    case "UPDATE_TEAM_BY_ID_REQUEST":
      return {
        ...state,
        updateTeambyidRes: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "UPDATE_TEAM_BY_ID_SUCCESS":
      return {
        ...state,
        updateTeambyidRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "UPDATE_TEAM_BY_ID_FAILURE":
      return {
        ...state,
        updateTeambyidRes: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // genrate pdf
    case "TEAMS_GENRATE_PDF_REQUEST":
      return {
        ...state,
        teamsGenratePDFRes: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case "TEAMS_GENRATE_PDF_SUCCESS":
      return {
        ...state,
        teamsGenratePDFRes: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };

    case "TEAMS_GENRATE_PDF_FAILURE":
      return {
        ...state,
        teamsGenratePDFRes: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };

    // RESET
    case "RESET_API_STATE":
      return {
        ...state,
        [action.payload]: { ...initialApiState },
      };

    default:
      return state;
  }
};

export default teamReducer;
