import React, { useContext, useState } from 'react';
import { useHistory,useLocation } from 'react-router';
import './Login.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../Firebase.Config';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import {  FacebookAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import { userContext } from '../../App';


const App = initializeApp(firebaseConfig);



const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [ user, setUser] = useState({
        isSignIn : false,
        Name: "",
        Email: "",
        Password:"",
        Error:"",
        Success: false,
        Photo: "",
        displayName:""
        
    });

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || { from: { pathname: "/" } };

    // google signIn start

    const provider = new GoogleAuthProvider();
    const handleSignIn=()=>{
            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user.displayName, user.email)
                const isSignInUser ={
                    isSignIn : true,
                        Name: user.displayName,
                        Email: user.email,
                        Photo: user.photoURL
                }
                setUser(isSignInUser)
         })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            }); 
    }

    // google signIn end

    // google signOut start

    const handleSignOut=()=>{
        const auth = getAuth();
        signOut(auth).then(() => {

         const isSignoutUser={
            isSignIn: false,
            Name:'',
            Email:'',
            Photo:''
          }
          setUser(isSignoutUser);

        }).catch((error) => {
          // An error happened.
        });
     }   

  // google signOut end.
  // facebook signIn start
  const fbProvider = new FacebookAuthProvider();
   const handleFbSignIn = () =>{
    const auth = getAuth();
        signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
        
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
        
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
        
            // ...
        });
   }
  // facebook signIn end  
   //github signIn start
   const githubProvider = new GithubAuthProvider();
   const handleGithubSignIn = () =>{

    const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                setUser(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GithubAuthProvider.credentialFromError(error);
                console.log(errorCode,errorMessage,email,credential);
            });

   }
  //github signOut end
  // Own authentication start
  const handleBlur=(e)=>{
      let isFormValid = true;
      if (e.target.name === "email"){
          isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
      }
      if(e.target.name ==="password"){
          const isPasswordHasNum = e.target.value.length > 6;
          const isPasswordHasDigit = /\d{1}/.test(e.target.value);
          isFormValid = isPasswordHasNum && isPasswordHasDigit;
      }
      if (isFormValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo);
      }
  }


  const handleSubmit=(e)=>{
      if( newUser && user.email && user.password){
          
            const auth = getAuth();
            createUserWithEmailAndPassword(auth,user.email,user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUserInfo = {...user};
                newUserInfo.Error = "";
                newUserInfo.Success = true;
                setUser(newUserInfo);
                updateUserInfo(user.name);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.Error = error.message;
                newUserInfo.Success = false;
                setUser(newUserInfo);
                
            }); 

      }
      if (!newUser && user.email && user.password){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const newUserInfo = {...user};
                newUserInfo.Error = "";
                newUserInfo.Success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = {...user};
                newUserInfo.Error = error.message;
                newUserInfo.Success = false;
                setUser(newUserInfo);
            });

      }
      e.preventDefault();
  }

  const updateUserInfo = name =>{
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: name
        }).then(() => {
        console.log('user name update successfully');
        // ...
        }).catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.Error = error.message;
            newUserInfo.Success = false;
            setUser(newUserInfo);
        // ...
        });

  }

  // Own authentication end
    return (
        <section className="login-area" style={{testAlign:'center'}}>
            {
                user.isSignIn? <button onClick={handleSignOut}> Google signOut</button>:
                <button onClick={handleSignIn}>Google signIn</button>
            }<br/><br/>
            <button onClick = {handleFbSignIn}>facebook signIn</button><br/><br/>
            <button onClick = {handleGithubSignIn}>Github signIn</button>
            
            {
                user.isSignIn && <div>
                    <h1>Name is : {user.Name}</h1>
                    <h2>email is:{user.Email}</h2>
                     photo:
                     <img src={user.Photo} alt="" />
                </div>
            }
            <div className="authentic-style">
                <h1>Our Own Authentication</h1>
                <input type="checkbox" onChange ={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">NewUser signUp</label> <br/><br/>
                <form onSubmit={handleSubmit} >
                    {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder ="your name" required />} <br/><br/>
                    <input type="text" onBlur={handleBlur} name="email" placeholder=" enter your email" required /><br/><br/>
                    <input type="password" onBlur={handleBlur} name="password" placeholder="enter your password" required /><br/><br/>
                    <input type="submit" value={newUser? 'signUp' : 'signIn' } />
                    
                </form>
                <p style={{color:'white'}}>{user.Error}</p>
                {user.Success && <p style={{color:'white'}}> your { newUser?"created":"SignIn" } successfully </p>}
            </div>
            
            


        </section>
    );
};

export default Login;