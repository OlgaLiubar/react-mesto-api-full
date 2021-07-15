class Auth {
    constructor() {
        this._baseUrl = 'https://api.olgaliubar.students.nomoredomains.monster'
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    register(password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResponse)
    }

    signIn(password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResponse)
            .then((data) => {
                // сохраняем токен
                localStorage.setItem('token', data.token);
                return data;
            })
    }

    getContent(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this._checkResponse)
    }
}

export const auth = new Auth();