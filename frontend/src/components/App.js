import React from "react";
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from 'react-router-dom';
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "../utils/auth";

function App() {
  //управление попапами
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [infoTooltip, setInfoTooltip] = React.useState({ caption: '', icon: '', isOpen: false });

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState("");
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [isCardsLoading, setIsCardsLoading] = React.useState(false);
  const [isCardsLoadError, setIsCardsLoadError] = React.useState();

  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem('token');
      if (jwt) {
        auth
          .getContent(jwt)
          .then(res => {
            // console.log(res);
            if (res) {
              setEmail(res.email);
              history.push('/');
              handleLogin();
            }
          })
          .catch(err => console.log(err))
      }
    }

    tokenCheck();
  }, [loggedIn, history])

  // React.useEffect(() => {
  //   api.getInitialData()
  //     .then(([userData, cardsData]) => {
  //       // console.log(userData);
  //       setCurrentUser(userData);
  //       setCards(cardsData);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch(err => console.log(`Загрузка информации о пользователе: ${err}`));

      setIsCardsLoading(true);
      setIsCardsLoadError();
      api.getInitialCards()
        .then((cardData) => {
          setCards(cardData);
        })
        .catch(err => setIsCardsLoadError(err))
        .finally(() => setIsCardsLoading(false));
    }
  }, [loggedIn]);

  function handleCardClick(card) {
    // console.log(card);
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltip({ ...infoTooltip, isOpen: false });
    setIsDeleteCardPopupOpen(false);
    setCardForDelete(undefined);
  }

  //Обработчик лайка
  function handleCardLike(card) {

    const isLiked = card.likes.some((like) => like === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // console.log(newCard);
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  }

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  //Обработчик удаления карточки
  function handleCardDelete(evt) {
    evt.preventDefault();
    api
      .deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id));
        setIsDeleteCardPopupOpen(false);
      })
      .catch(err => console.log(`При удалении карточки: ${err}`))
  }

  //Обработчик добавления карточки
  const [isCardSending, setIsCardSending] = React.useState(false);
  function handleAddPlaceSubmit(newCard) {
    setIsCardSending(true);
    api.uploadCard(newCard)
    // console.log(newCard)
      .then((newCardFull) => {
        console.log(newCardFull);
        setCards((state) => [
          newCardFull,
          ...state,
        ]);
        console.log(cards);
        closeAllPopups();
      })
      .catch(err => console.log(`Добавление карточки: ${err}`))
      .finally(() => setIsCardSending(false));
  }

  //Обработчик изменения информации пользователя
  function handleUpdateUser(user) {
    api
      .uploadUserInfo(user)
      .then((res) => {
        console.log(res)
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  //Обработчик изменения аватара
  function handleUpdateAvatar(link) {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => closeAllPopups());
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    history.push('/sign-in');
    setLoggedIn(false);
  }

  //Обработчик сабмита формы регистрации
  function handleRegisterFormSubmit(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        history.push('/sign-in');
        setInfoTooltip({ caption: 'Вы успешно зарегистрировались!', icon: 'success', isOpen: true });
        // console.log(res);
      })
      .catch((err) => {
        setInfoTooltip({ caption: 'Что-то пошло не так! Попробуйте еще раз.', icon: 'error', isOpen: true });
        // console.log(err);
      })
  }

  //Обработчик сабмита формы входа
  function handleLoginFormSubmit(password, email) {
    auth.signIn(password, email)
      .then((res) => {
        // console.log(data)
          handleLogin();
          history.push('/');
      })
      .catch((err) => {
        setInfoTooltip({ caption: 'Что-то пошло не так! Попробуйте еще раз.', icon: 'error', isOpen: true });
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <div className="page">

          <Header loggedIn={loggedIn}
            email={email}
            handleLogout={handleLogout}
          />

          <Switch>
            <Route path="/sign-up" >
              <Register
                onSubmit={handleRegisterFormSubmit}
              />
            </Route>

            <Route path="/sign-in" >
              <Login
                onSubmit={handleLoginFormSubmit}
              />
            </Route>


            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteClick={handleCardDeleteRequest}
              onEditProfileClick={handleEditProfileClick}
              onEditAvatarClick={handleEditAvatarClick}
              onAddPlaceClick={handleAddPlaceClick}
              cards={cards}
              isCardsLoading={isCardsLoading}
              isCardsError={isCardsLoadError}
            />
          </Switch>


          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          >
          </EditProfilePopup>

          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            isSending={isCardSending}
          >
          </AddPlacePopup>

          <PopupWithForm
            isOpen={isDeleteCardPopupOpen}
            title="Вы уверены?"
            name="confirm-delete"
            button="Да"
            onSubmit={handleCardDelete}
            onClose={closeAllPopups}
          />

          <ImagePopup
            name="view-image"
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />

          {/* <PopupWithForm
            name="confirm-delete"
            onClose={closeAllPopups}
            title="Вы уверены?"
            button="Да" /> */}

          <EditAvatarPopup
            onClose={closeAllPopups}
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          >
          </EditAvatarPopup>

          <InfoTooltip
            caption={infoTooltip.caption}
            icon={infoTooltip.icon}
            isOpen={infoTooltip.isOpen}
            onClose={closeAllPopups}
          />

        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
