import background from "../images/signup.jpg";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

function SignUp() {
  const { signup, user } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signingUp, setSigningUp] = useState(false)
  const navigate = useNavigate();


  const signUpUser = async (event) =>{
    event.preventDefault();
    setSigningUp(true)
    const response = await signup({ fullname, email, username, phone, password });
    console.log(await response);
    if(response.status === 201){
      toast.success(response.message);
      navigate('/');
      setSigningUp(false);
    } else {
      toast.error(response.message);
      setSigningUp(false);
    }
  }

  useEffect(() => {
    if (user) {
      toast.error('you are not logged in');
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
                    SignUp to <strong>E-wallet</strong>
                  </h3>
                  <form className="mt-5" onSubmit={(e) => signUpUser(e)} action="#" method="post">
                    <div className="form-group first">
                      <label for="fullname">Full Name</label>
                      <input
                        type="text"
                        required={true}
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="form-control"
                        placeholder="Mary Jane"
                        id="fullname"
                      />
                    </div>
                    <div className="form-group first">
                      <label for="email">Email</label>
                      <input
                        type="text"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="your-email@gmail.com"
                        id="email"
                      />
                    </div>
                    <div className="form-group first">
                      <label for="username">Username</label>
                      <input
                        type="text"
                        required={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        placeholder="MaryJ"
                        id="username"
                      />
                    </div>
                    <div className="form-group first">
                      <label for="phone">Phone Number</label>
                      <input
                        type="text"
                        required={true}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        placeholder="Phone Number"
                        id="phone"
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
                        <Link to='/' className="forgot-pass">
                          have an account? Sign In here
                        </Link>
                      </span>
                    </div>
                    {
                      !signingUp ? (
                        <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-block btn-primary"
                      />
                      ) : 
                      (
                      <input
                      type="submit"
                      value="Signing Up..."
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

export default SignUp
