import React from "react";
// import { Link } from "react-router-dom";

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!password || !email) {
            return;
        }
        props.onSubmit(password, email);
        setEmail('');
        setPassword('');
    }


    return (
        <main>
            <section className="auth">
                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >
                    <h2 className="auth-form__title">Вход</h2>

                    <input
                        className="auth-form__input"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <input
                        className="auth-form__input"
                        type="password"
                        placeholder="Пароль"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    <button
                        className="auth-form__submit-button"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Войти
                </button>
                </form>
            </section>

        </main>
    );
}

export default Login;