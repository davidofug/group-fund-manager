import MyRouter from "./components/MyRouter";
import { AuthProvider } from './components/helpers/AuthProvider'
function App() {
  return (
    <AuthProvider>
      <MyRouter />
    </AuthProvider>
  );
}

export default App;

