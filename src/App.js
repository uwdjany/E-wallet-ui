import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './component/context/AuthContext';
import WalletProvider from './component/context/walletContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/pages/login'
import SignUp from './component/pages/signUp'
import Transfer from './component/pages/transfer'
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/transfer" element={
        <WalletProvider>
          <Transfer />
        </WalletProvider>
      } />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={2}
      />
    </Router>
    </AuthProvider>
  );
}

export default App;
