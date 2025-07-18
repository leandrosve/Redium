import "./App.css";
import { ConfirmationDialogProvider } from "./components/common/ConfirmationDialog";
import { OwnershipProvider } from "./context/OwnershipContext";
import { UserProvider } from "./context/UserContext";
import { ErrorBoundary } from "./pages/ErrorBoundary";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <OwnershipProvider>
          <ConfirmationDialogProvider />
          <AppRouter />
        </OwnershipProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
