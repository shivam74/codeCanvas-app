import { SignIn } from "@clerk/clerk-react";

 const LoginPage = () => {
   return (
     <div className='flex-1 flex items-center justify-center'>
       <SignIn signUpUrl="/register"></SignIn>
     </div>
   );
 };
 
 export default LoginPage;