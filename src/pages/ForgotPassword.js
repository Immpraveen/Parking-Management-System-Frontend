// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";

// function ForgotPassword() {
//   const [userName, setUserName] = useState("");
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // TODO: send password reset email to the user's email address
//     history.push("/password-reset-email-sent"); // replace with the actual path
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-header bg-primary text-white">
//               <h4 className="text-center">Forgot Password</h4>
//             </div>
//             <div className="card-body">
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Username</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                   />
//                 </div>
//                 <div>
//                   <p className="text-plain">
//                     An email with instructions to reset your password will be sent to your email address.
//                   </p>
//                 </div>
//                 <button
//                   type="submit"
//                   className="btn btn-outline-primary btn-block "
//                 >
//                   Reset Password
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;


import React, { useState } from "react";
import Footer from "../components/Footer";
import RegisterNavbar from "../components/RegisterNavbar";

function ForgotPassword() {
  const [userName, setUserName] = useState("");

  return (
    <div>
        <RegisterNavbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="text-center">Forgot Password</h4>
            </div>
            <div className="card-body">
              <form
                action="/password-reset-email-sent"
                method="post"
              >
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="email"
                    className="form-control"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <p className="text-plain">
                    An email with instructions to reset your password will be sent to your email address.
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-primary btn-block "
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <Footer/>
    </div>
    </div>
  );
}

export default ForgotPassword;
