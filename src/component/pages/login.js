import { useState, createContext, useEffect, useContext } from "react";
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import background from "../images/signin.jpg";

function Login() {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logining, setLogining] = useState(false)
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setLogining(true)
    const response = await login({ account: email, password });
    if(response.status === 200){
      toast.success(response.message);
      navigate('/transfer')
    } else {
      toast.error(response.message);
      setLogining(false)
    }
    setLogining(false);
  };

  useEffect(() => {
    if (user) {
      navigate('/transfer');
  }
  }, [user, navigate]);

  return (
    <div className="d-lg-flex half">
          <div
            className="bg order-1 order-md-2"
            style={{ backgroundImage: `url(${background})` }}
          ></div>
          <div className="contents order-2 order-md-1">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7">
                  <h3>
                    Login to <strong>E-wallet</strong>
                  </h3>
                  <form className="mt-5" onSubmit={(e) => loginUser(e)} action="#" method="post">
                    <div className="form-group first">
                      <label for="username">Username or Email</label>
                      <input
                        type="text"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="example@gmail.com or username"
                        id="username"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Your Password"
                        id="password"
                      />
                    </div>

                    <div className="d-flex mb-5 align-items-center">
                      <span className="text-center">
                        <Link to="/signup" className="forgot-pass">
                          Don't have an account? Sign up here
                        </Link>
                      </span>
                    </div>
                    {
                      !logining ? (
                        <input
                          type="submit"
                          value="Log In"
                          className="btn btn-block btn-primary"
                        />
                      ):(
                        <input
                          type="submit"
                          value="Logging in..."
                          className="btn btn-block btn-primary"
                        />
                      )
                    }
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Login
