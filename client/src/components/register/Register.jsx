// import { useRegister } from "../../api/authApi.js";
// import { useUserContext } from "../../contexts/userContext";
// import { Link, useNavigate } from "react-router";

// export default function Register() {
//   const navigate = useNavigate();
//   const { register } = useRegister();
//   const { userLoginHandler } = useUserContext();

//   const registerHandler = async (_, formdata) => {
//     const { username, email, password } = Object.fromEntries(formdata);

//     const confirmPassword = formdata.get("confirm-password");
//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     const authData = await register(username, email, password);

//     userLoginHandler(authData);
//     navigate("/");
//   };

//   return (
//     <section id="register-page" className="auth">
//       <form id="register" action={registerHandler}>
//         <div className="container">
//           <div className="brand-logo"></div>
//           <h1>Sign Up</h1>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="username"
//             id="username"
//             name="username"
//             placeholder="Maria"
//           />
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="maria@gmail.com"
//           />
//           <label htmlFor="pass">Password:</label>
//           <input type="password" name="password" id="register-password" />
//           <label htmlFor="con-pass">Confirm Password:</label>
//           <input
//             type="password"
//             name="confirm-password"
//             id="confirm-password"
//           />
//           <input className="btn submit" type="submit" value="Register" />
//           <p className="field">
//             <span>
//               If you already have profile click <Link to="/login">here</Link>
//             </span>
//           </p>
//         </div>
//       </form>
//     </section>
//   );
// }

import { useActionState } from "react";
import { useRegister } from "../../api/authApi.js";
import { useUserContext } from "../../contexts/userContext";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useRegister();
  const { userLoginHandler } = useUserContext();

  const registerHandler = async (_, formData) => {
    try {
      const values = Object.fromEntries(formData);
      const authData = await register(
        values.username,
        values.email,
        values.password,
        values["confirm-password"]
      );

      userLoginHandler(authData);
      navigate("/");
      return values;
    } catch {
      return {
        username: "",
        email: "",
        password: "",
        "confirm-password": "",
      };
    }
  };

  const [formState, registerAction, isPending] = useActionState(
    registerHandler,
    {
      username: "",
      email: "",
      password: "",
      "confirm-password": "",
    }
  );

  return (
    <section id="register-page" className="auth">
      <form id="register" action={registerAction}>
        <div className="container">
          <div className="brand-logo"></div>
          <h1>Sign Up</h1>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Maria"
            defaultValue={formState.username}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="maria@gmail.com"
            defaultValue={formState.email}
          />

          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="password"
            id="register-password"
            defaultValue={formState.password}
          />

          <label htmlFor="con-pass">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            defaultValue={formState["confirm-password"]}
          />

          <input
            className="btn submit"
            type="submit"
            value="Register"
            disabled={isPending}
          />

          <p className="field">
            <span>
              If you already have profile click <Link to="/login">here</Link>
            </span>
          </p>
        </div>
      </form>
    </section>
  );
}
