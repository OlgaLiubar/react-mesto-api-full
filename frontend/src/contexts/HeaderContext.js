import React from "react";

export const HeaderContext = React.createContext();

export const headers = {
  register: {
    text: 'Зарегистрироваться',
    redirectPath: '/sign-up'
  },
  login: {
    text: 'Войти',
    redirectPath: '/sign-in'
  }
}