import { useContext } from "react"
import { useRegister } from "../../api/authApi.js"
import { UserContext } from "../../contexts/userContext"
import { useNavigate } from "react-router"


export default function Register() {
  const navigate= useNavigate()
  const {register} = useRegister()
  const {userLoginHandler} = useContext(UserContext)

 const registerHandler =async (formdata)=>{
    const {username, email, password, confirm} = Object.fromEntries(formdata)

    const confirmPassword = formdata.get('confirm-password')
        if(password !== confirmPassword){
            alert('Passwords do not match')
            return
        }

      const authData=  await register(username, email, password)

      userLoginHandler(authData)
      navigate('/')
 }


  return (
    <section id="register-page" className="auth">
      <form id="register" action={registerHandler}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Sign Up</h1>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Maria"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@gmail.com"
          />
          <label htmlFor="pass">Password:</label>
          <input type="password" name="password" id="register-password" />
          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
          />
          <input className="btn submit" type="submit" value="Register" />
          <p className="field">
            <span>
              If you already have profile click <a href="/login">here</a>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
