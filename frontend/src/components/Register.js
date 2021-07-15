import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onSubmit(password, email);
        setPassword('');
    }

    return (
        <main>
            <section className="auth">
                <form 
                className="auth-form"
                onSubmit={handleSubmit}
                >
                    <h2 className="auth-form__title">Регистрация</h2>

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
                    >
                        Зарегистрироваться
                </button>
                </form>
                <p className="auth__registered">Уже зарегистрированы? {<Link
                        to="/sign-in"
                        className="link"
                    >
                        Войти
                </Link>}
                </p>
            </section>

        </main>
    );
}

export default Register;