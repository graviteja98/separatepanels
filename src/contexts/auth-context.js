import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    // if (isAuthenticated) {
    //   const user = {
    //     id: '5e86809283e28b96d2d38537',
    //     avatar: '/assets/avatars/avatar-anika-visser.png',
    //     name: 'Anika Visser',
    //     email: 'anika.visser@devias.io'
    //   };

    //   dispatch({
    //     type: HANDLERS.INITIALIZE,
    //     payload: user
    //   });
    // } else
     {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // const skip = () => {
  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }

  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: '/assets/avatars/avatar-anika-visser.png',
  //     name: 'Anika Visser',
  //     email: 'anika.visser@devias.io'
  //   };

  //   dispatch({
  //     type: HANDLERS.SIGN_IN,
  //     payload: user
  //   });
  // };

  const signIn = async (email, password) => {
     //console.log('Received Credentials Are',email, " and ", password)
   
    // if (email !== 'demo@devias.io' || password !== 'Password123!') {
    //   throw new Error('Please check your email and password');
    // }

  //   try {
  //     window.sessionStorage.setItem('authenticated', 'true');
  //   } catch (err) {
  //     console.error(err);
  //   }
  //  //const response = await axios.post()
  //   const user = {
  //     id: '5e86809283e28b96d2d38537',
  //     avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
  //     name: 'Anika Visser',
  //     email: 'anika.visser@devias.io'
  //   };
    let userdetails;
    const apiInstance = axios.create({
      baseURL: 'https://10.244.2.230:5001/api/v1',
      timeout: 5000, // Adjust the timeout value as needed
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token_here',
    };
    try{
    const response = await apiInstance.post('/auth/login', {username : email,password}, { headers });
    console.log(response.data);
    userdetails = response.data.payload
  } catch (error) {
    console.error(error);
  }
    const user = {
      id : userdetails.id,
      email : userdetails.email,
      name : userdetails.username,
      avatar : 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
      roles : userdetails.roles
    }
   
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password) => {
    const apiInstance = axios.create({
      baseURL: 'https://10.244.2.230:5001/api/v1',
      timeout: 5000, // Adjust the timeout value as needed
    });
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer your_token_here',
    };
    try{
    const response = await apiInstance.post('/auth/register', {email,name,password}, { headers });
  } catch (error) {
    console.error(error);
  }
   
    // dispatch({
    //   type : HANDLERS.INITIALIZE,
    //   payload : user
    // })
    //throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
       // skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
