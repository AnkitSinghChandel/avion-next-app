const initialState = {
  singleUploadToS3Res: {},
  multipleUploadToS3Res: {},
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SINGLE_UPLOAD_TO_S3":
      return {
        ...state,
        singleUploadToS3Res: action.payload,
      };

    case "MULTIPLE_UPLOAD_TO_S3":
      return {
        ...state,
        multipleUploadToS3Res: action.payload,
      };

    default:
      return state;
  }
};

export default commonReducer;
