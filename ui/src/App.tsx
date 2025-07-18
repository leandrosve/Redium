import "./App.css";
import { ConfirmationDialogProvider } from "./components/common/ConfirmationDialog";
import { ToastProvider } from "./components/common/Toast";
import { OwnershipProvider } from "./context/OwnershipContext";
import { UserProvider } from "./context/UserContext";
import { ErrorBoundary } from "./pages/ErrorBoundary";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <OwnershipProvider>
          <ToastProvider>
            <ConfirmationDialogProvider>
              <AppRouter />
            </ConfirmationDialogProvider>
          </ToastProvider>
        </OwnershipProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
