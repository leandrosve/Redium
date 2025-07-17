import "./App.css";
import { OwnershipProvider } from "./context/OwnershipContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <UserProvider>
      <OwnershipProvider>
        <AppRouter />
      </OwnershipProvider>
    </UserProvider>
  );
}

export default App;
