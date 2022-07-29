import { useState, useContext, useEffect } from "react";
import { Link,useNavigate } from 'react-router-dom';
import background from "../images/transfer.jpg";
import { AuthContext } from "../context/AuthContext"
import { toast } from "react-toastify";
import { WalletContext } from "../context/walletContext";

function Transfer() {
  const { user, logout } = useContext(AuthContext);
  const { transfer, balance } = useContext(WalletContext);
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [transfering, setTransfering] = useState(false);
  const navigate = useNavigate();

  const transferMoney = async (event) => {
    event.preventDefault();
    setTransfering(true);
    const res = await transfer({ receiverWalletRef: wallet, amount });
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setTransfering(false);
    setAmount('');
    setWallet('');
  };

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
                  <div className="my-3">
                    <button className="btn btn-outline-secondary" onClick={() => {
                      logout();
                      navigate('/');
                    }}>Logout</button>
                  </div>
                  <h3>
                    Transfer Money to a <strong>Friend</strong>
                  </h3>
                  <p className="mb-4">
                    Balance: <strong>{balance} RWF</strong>
                  </p>
                  <form onSubmit={(e) => transferMoney(e)} action="#" method="post">
                    <div className="form-group first">
                      <label for="username">Wallet Name</label>
                      <input
                        type="text"
                        value={wallet}
                        required={true}
                        onChange={(e) => setWallet(e.target.value)}
                        className="form-control"
                        placeholder="wallet name"
                        id="wallet"
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Amount</label>
                      <input
                        type="text"
                        value={amount}
                        required={true}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-control"
                        placeholder="Amount"
                        id="amount"
                      />
                    </div>
                    <input
                      type="submit"
                      value={ transfering ? 'Sending...' : "Send" }
                      disabled={transfering}
                      className="btn btn-block btn-primary"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Transfer;
