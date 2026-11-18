import React from 'react';
import Wrapper from './src/container/context/Wrapper';
import RootNavigation from './src/container/navigation/rootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { useStore } from './src/container/store/useStore';
import BottomTabNavigation from './src/container/navigation/bottomTab';


const App = () => {
  const { isLoggedIn } = useStore();

  return (
    <Wrapper>
      <NavigationContainer>
        {isLoggedIn ? <BottomTabNavigation /> : <RootNavigation />}
      </NavigationContainer>
    </Wrapper>
  );
};

export default App;
