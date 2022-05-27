import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from './../LoadingError/Toast'
import Message from './../LoadingError/Error'
import Loading from './../LoadingError/Loading'
import { toast } from "react-toastify"
import { updateProfile } from "../../redux/actions/userAction";
const ProfileTabs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const dispatch = useDispatch()
  const userDetail1 = useSelector(state => state.userDetail)
  const { loading, error, user } = userDetail1
  const ToastId = React.useRef(null)
  const ToastOject = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)

    }
  }, [dispatch, user])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === confirm) {
      dispatch(updateProfile({ id: user._id, name, email, password }))
      if (!toast.isActive(ToastId.current)) {
        ToastId.current = toast.success("Profile Updated", ToastOject)
      }
    } else {

      if (!toast.isActive(ToastId.current)) {
        ToastId.current = toast.error("Password dose not match", ToastOject)
      }
    }
  }
  return (
    <>
      <Toast /> {error && <Message variant="alert-danger">{error}</Message>}{loading && <Loading />}
      <form className="row  form-container" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">UserName</label>
            <input className="form-control" value={name} required onChange={(e) => setName(e.target.value)} type="text" />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">E-mail Address</label>
            <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">New Password</label>
            <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Confirm Password</label>
            <input className="form-control" value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
