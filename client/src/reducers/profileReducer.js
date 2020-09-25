import {
  ADD_EXPERIENCE,
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_EDUCATION,
} from '../actions/types';

const initialState = {
  profile: null,
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload.data.docs[0],
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        profile: action.payload,
        loading: false,
      };

    case ADD_EXPERIENCE: {
      return {
        ...state,

        profile: {
          ...state.profile,
          experience: [...state.profile.experience, action.payload],
        },
        loading: false,
      };
    }

    case ADD_EDUCATION: {
      return {
        ...state,

        profile: {
          ...state.profile,
          education: [...state.profile.education, action.payload],
        },
        loading: false,
      };
    }

    default:
      return state;
  }
}
