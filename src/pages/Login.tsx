import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, isMockEnv } from '@/config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/Card';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('demo@caresync.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isMockEnv) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (email && password) {
          setUser({ uid: 'mock-123', email });
          navigate('/');
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        let userCredential;
        if (isSignUp) {
          userCredential = await createUserWithEmailAndPassword(auth, email, password);
          toast.success('Account created successfully!');
        } else {
          userCredential = await signInWithEmailAndPassword(auth, email, password);
          toast.success('Welcome back!');
        }
        setUser(userCredential.user);
        navigate('/');
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
         toast.error('Invalid email or password. Please try again or Sign Up.');
      } else if (err.code === 'auth/email-already-in-use') {
         toast.error('An account with this email already exists. Please Log In.');
      } else {
         toast.error(err.message || 'Authentication failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-white/50 bg-white/80 backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center pt-8">
          <div className="mx-auto bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 mb-2">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            {isSignUp ? 'Create an Account' : 'Welcome to CareSync'}
          </CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            {isSignUp ? 'Sign up to access the provider portal' : 'Enter your credentials to access the provider portal'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@hospital.com"
              required
            />
            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              {isMockEnv && (
                <p className="text-xs text-slate-400 mt-1">
                  Using mock auth. Any email/password will work.
                </p>
              )}
            </div>
            
            <Button type="submit" className="w-full text-base h-11" isLoading={isLoading}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 justify-center pb-8">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isSignUp ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
