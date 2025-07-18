import "./App.css";
import { ConfirmationDialogProvider } from "./components/common/ConfirmationDialog";
import { OwnershipProvider } from "./context/OwnershipContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <UserProvider>
      <OwnershipProvider>
        <ConfirmationDialogProvider />
        <AppRouter />
      </OwnershipProvider>
    </UserProvider>
  );
}

export default App;
