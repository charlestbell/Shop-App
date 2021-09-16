import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import AppNavigator from './navigation/AppNavigator';

let composedMiddleWare = compose(applyMiddleware(ReduxThunk));
if (__DEV__) {
  composedMiddleWare = composeWithDevTools(applyMiddleware(ReduxThunk));
}

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, composedMiddleWare);

export default App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  let [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
};
