import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import OtpVerification from '../screens/OtpVerification';
import Onboarding from '../screens/Onboarding';
import Stepper from '../screens/Stepper';
import StoreInformation from '../screens/StoreInformation';
import StoreDocuments from '../screens/StoreDocuments';
import PartnerContract from '../screens/PartnerContract';
import StoreLocation from '../screens/StoreInformation/StoreLocation';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="Stepper" component={Stepper} />
      <Stack.Screen name="StoreInformation" component={StoreInformation} />
      <Stack.Screen name="StoreLocation" component={StoreLocation} />
      <Stack.Screen name="StoreDocuments" component={StoreDocuments} />
      <Stack.Screen name="PartnerContract" component={PartnerContract} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
