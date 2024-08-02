import AuthForm from "@/components/forms/AuthForm";

function Login() {
    return (
        <section className="w-full h-screen flex items-center justify-center">
            <AuthForm type="Login" />
        </section>
    );
}

export default Login;
