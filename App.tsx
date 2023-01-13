import { AuthContextProvider } from "./src/contexts/AuthContext";
import { RootNavigator } from "./src/screens/RootNavigator";

export default function App() {
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}
