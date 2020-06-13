import produce from "immer";

import {
  ADD_PLACE_REQUEST,
  ADD_PLACE_SUCCESS,
  LOAD_MAIN_PLACES_REQUEST,
  LOAD_MAIN_PLACES_SUCCESS,
  LOAD_MAIN_PLACES_FAILURE,
  LOAD_CATEGORIZED_PLACES_REQUEST,
  LOAD_CATEGORIZED_PLACES_SUCCESS,
  LOAD_CATEGORIZED_PLACES_FAILURE,
  LOAD_PLACE_DETAIL_REQUEST,
  LOAD_PLACE_DETAIL_SUCCESS,
  LOAD_PLACE_DETAIL_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_MORE_COMMENTS_SUCCESS,
} from "../_Actions/types";

const initialState = {
  places: [],
  isAddingPost: false,
  placeDetail: {
    Comments: [],
    hasMoreComments: false,
  },
};

export default function (state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CATEGORIZED_PLACES_REQUEST:
      case LOAD_MAIN_PLACES_REQUEST: {
        return {
          ...state,
          places: [],
        };
      }
      case LOAD_CATEGORIZED_PLACES_SUCCESS:
      case LOAD_MAIN_PLACES_SUCCESS: {
        return {
          ...state,
          places: action.data,
          placeDetail: null,
        };
      }
      case LOAD_CATEGORIZED_PLACES_FAILURE:
      case LOAD_MAIN_PLACES_FAILURE: {
        return {
          ...state,
          places: [],
        };
      }
      case ADD_PLACE_REQUEST: {
        return {
          ...state,
          isAddingPost: true,
        };
      }
      case ADD_PLACE_SUCCESS: {
        return {
          ...state,
          isAddingPost: false,
          places: [action.data, ...state.places],
        };
      }
      case LOAD_PLACE_DETAIL_REQUEST: {
        return {
          ...state,
          placeDetail: null,
        };
      }
      case LOAD_PLACE_DETAIL_SUCCESS: {
        return {
          ...state,
          placeDetail: { ...action.data.place, isLiked: action.data.isLiked },
        };
      }
      case LOAD_PLACE_DETAIL_FAILURE: {
        return {
          ...state,
          placeDetail: null,
        };
      }
      case ADD_COMMENT_REQUEST: {
        return {
          ...state,
        };
      }
      case ADD_COMMENT_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: [action.data, ...state.placeDetail.Comments],
          },
        };
      }
      case ADD_COMMENT_FAILURE: {
        return {
          ...state,
        };
      }
      case LOAD_COMMENTS_REQUEST: {
        return {
          ...state,
          // placeDetail: {
          //   ...state.placeDetail,
          //   Comments: !action.offset ? [] : state.placeDetail.Comments,
          // },
        };
      }
      case LOAD_COMMENTS_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: action.data,
            hasMoreComments: action.data.length === 5,
          },
        };
      }
      case LOAD_MORE_COMMENTS_SUCCESS: {
        return {
          ...state,
          placeDetail: {
            ...state.placeDetail,
            Comments: state.placeDetail.Comments.concat(action.data),
            hasMoreComments: action.data.length === 5,
          },
        };
      }
      case LOAD_COMMENTS_FAILURE: {
        return {
          ...state,
        };
      }
      default: {
        return {
          ...state,
        };
      }
    }
  });
}
