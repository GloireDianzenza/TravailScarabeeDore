import './App.css';
import "./css/tablet.css";
import "./css/mobile.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PageImage from "./images/depositphotos_56121605-stock-photo-female-managing-director-in-a.jpg";
import GridImage from "./images/T_365456.jpg";
import ApprocheImage from "./images/pexels-divinetechygirl-1181533.jpg";
import HeadphoneImage from "./images/Helpdesk Office 3 1872x1053.jpg";
import {Icon} from "./components/index.ts";

import ApiCalendar from "react-google-calendar-api";
import {gapi} from "gapi-script";
import { useEffect } from 'react';

const config = {
  clientId: "965666486369-9deuckjj3h7g4vr0f73mrk1vfv0trd4e.apps.googleusercontent.com",
  apiKey: "AIzaSyALuiSB6MSQsCdHLC75R5w-ZIi34QFX88E",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

const apiCalendar = new ApiCalendar(config);

function MeetingSubmit(event){
  event.preventDefault();
  apiCalendar.handleAuthClick();
}

const getEvents = (id,key,docs) =>{
  function initiate(){
    gapi.client.init({apiKey:key,discoveryDocs:docs}).then(()=>{
      console.log("success")
    }).catch(error=>{
      console.log("error");
    })
  }

  gapi.load("client",initiate);
}

function MeetingForm(){
  return (
    <Form className='meeting-form' onSubmit={MeetingSubmit}>
      <Form.Group controlId='nom2'>
        <Form.Label>Nom</Form.Label>
        <Form.Control type='text' placeholder='Nom...' required name='nom2'></Form.Control>
      </Form.Group>
      <Form.Group controlId='prenom'>
        <Form.Label>Prénom</Form.Label>
        <Form.Control type='text' placeholder='Prénom...' required name='prenom'></Form.Control>
      </Form.Group>
      <Form.Group controlId='mail2'>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type='email' placeholder='Adresse email...' required name='mail2'></Form.Control>
      </Form.Group>
      <Button type='button' variant='link'>Pas de compte ?</Button>
      <Button type='submit' variant='primary'>Se connecter</Button>
    </Form>
  )
}

function MeetingModalFunction(){
  document.querySelector(".modal").classList.add("show-modal");
}

function CloseModalFunction(){
  document.querySelector(".modal").classList.remove("show-modal");
}

function RendezVousModal(){
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-modal' onClick={CloseModalFunction}>
          <Icon name='bxs-x-circle' size='40px'></Icon>
        </div>
        <div>
          <h2>Pour obtenir un rendez-vous, vous devez avoir un compte</h2>
        </div>
        <MeetingForm/>
      </div>
    </div>
  )
}

function FooterComponent(){
  return (
    <footer>
      <div className='left'>
        <Button variant='link'>Entreprise</Button>
        <Button variant='link'>Enseigner</Button>
        <Button variant='link'>Télécharger app</Button>
        <Button variant='link'>A propos</Button>
      </div>
      <div className='middle'>
      <Button variant='link'>Formation</Button>
        <Button variant='link'>Blog</Button>
        <Button variant='link'>Aide</Button>
        <Button variant='link'>Partenaire</Button>
      </div>
      <div className='right'>
      <Button variant='link'>Conditions</Button>
        <Button variant='link'>Politiques</Button>
        <Button variant='link'>Paramètres de cookies</Button>
      </div>
    </footer>
  )
}

function ToggleForm(){
  document.querySelector("#formManager > div").classList.toggle("hidden-form");
  document.getElementById("formToggler").classList.toggle("show");
}

function ContactForm(){
  return (
    <Form>
      <Form.Group controlId='nom'>
        <Form.Label>Nom</Form.Label>
        <Form.Control type='text' placeholder='Insérer nom...' required name='nom'></Form.Control>
      </Form.Group>
      <Form.Group controlId='mail'>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type='email' placeholder='Insérer email...' required name='mail'></Form.Control>
      </Form.Group>
      <Form.Group controlId='sujet'>
        <Form.Label>Sujet</Form.Label>
        <Form.Control type='text' placeholder='Définir sujet...' required name='sujet'></Form.Control>
      </Form.Group>
      <Form.Group controlId='message' id='msgGroup'>
        <Form.Label>Message</Form.Label>
        <Form.Control as={"textarea"} rows={8} placeholder='...' required name='message'></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' className='buttons'>Envoyer</Button>
    </Form>
  )
}

function BootstrapJS(){
  return (
    <>
      <script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"></script>

      <script
        src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" defer={true}></script>

      <script>var Alert = ReactBootstrap.Alert;</script>
    </>
  );
}

function HeaderList(){
  return (
    <ListGroup as={"ul"}>
      <ListGroup.Item as={"li"} active={true}><Button variant='link' href='#top'>Accueil</Button></ListGroup.Item>
      <ListGroup.Item as={"li"} id='apropos'>
        <Button variant='link'>A propos...</Button>
        <ListGroup as={"ul"} className='submenu'>
          <ListGroup.Item as={"li"}><Button variant='link'>Qui sommes-nous ?</Button></ListGroup.Item>
          <ListGroup.Item as={"li"}><Button variant='link'>Nos bureaux</Button></ListGroup.Item>
          <ListGroup.Item as={"li"}><Button variant='link'>On recrute !</Button></ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item as={"li"}><Button variant='link'>Formations</Button></ListGroup.Item>
      <ListGroup.Item as={"li"}><Button variant='link' href='#formManager'>Contactez-nous</Button></ListGroup.Item>
    </ListGroup>
  )
}

function App() {
  const calendarID = "gloiredianzenza5@gmail.com",apiKey = "AIzaSyALuiSB6MSQsCdHLC75R5w-ZIi34QFX88E",accessToken = "",
  discoveryDocs = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];

  useEffect(()=>{
    getEvents(calendarID,apiKey,discoveryDocs);
  })

  return (
    <div className="App">
      <div id='top'></div>
      <header>
        <div className='HeaderTop'>
          <h1>Scarabée Doré</h1>
        </div>
        <div className='HeaderBottom'>
          <HeaderList/>
        </div>
      </header>
      <main>
        <section id='mainPart'>
          <div className='left'>
            <h2>Plus tu touches le fond, et plus tu te relèves plus fort, tu es capable de déplacer des montagnes</h2>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste fugiat ipsa voluptate placeat aspernatur quam.</span>
            <Button variant='secondary buttons' id='seanceBtn' onClick={MeetingModalFunction}>Prendre rendez-vous</Button>
          </div>
          <div className='right'>
            <img src={PageImage} alt=''></img>
          </div>
        </section>
        <section id='processes'>
          <h2>Processus du coaching</h2>
          <div className='step'>
            <div className='left'>
              <h3>Comment se passe une séance ?</h3>
              <span>Lors de la première séance, nous définiront ensemble le où les objectifs à atteindre, les besoins en coaching. <br></br>Pour cela, je poserai des questions afin de vous aider à clarifier vos pensées et à identifier vos blocages. Lors des séances, je prendrai en compte tous les paramètres (votre personnalité, situation personnelle et professionnelle, vos objectifs, vos blocages...) afin de mieux vous aider à trouver vos propres réponses et solutions.</span>
            </div>
            <div className='right'>
              <img src={GridImage} alt=''></img>
            </div>
          </div>
          <div className='step'>
            <div className='left'>
              <h3>Quelle est votre approche ?</h3>
              <span>Lors de la séance, on définira des objectifs précis ; qui seront mesurables, atteignables, réalisables, pertinents et temporellement définis, ainsi qu'une mise en place d'une planification des stratégies pour les atteindre. Un suivi régulier est essentiel pour suivre les progrès réalisés. L'identification des écarts éventuels permettra la mise en place de mesures correctives si nécessaire.</span>
            </div>
            <div className='right'>
              <img src={ApprocheImage} alt=''></img>
            </div>
          </div>
          <div className='step'>
            <div className='left'>
              <h3>En quoi puis-je vous aider?</h3>
              <span>
                <ul>
                  <li>Dans la clarification de vos objectifs ainsi que de trouver votre voie. (identifier vos valeurs, vos passions, définir des objectifs clairs et atteignables)</li>
                  <li>Trouver un équilibre entre votre vie professionnelle et personnelle. (permettant de maintenir une qualité de vie et de prévenir l'épuisement professionnel).</li>
                  <li>Développer des habitudes et des routines positives (amélioration des aptitudes sociales, les relations interpersonnelles, tans sur le plan personnel que professionnel).</li>
                </ul>
              </span>
            </div>
            <div className='right'>
              <img src={HeadphoneImage} alt=''></img>
            </div>
          </div>
        </section>
        <section id='formManager'>
          <Button variant='primary' className='buttons' id='formToggler' onClick={ToggleForm}>Formulaire de contact</Button>
          <div className='hidden-form'>
            <ContactForm/>
          </div>
        </section>
        <RendezVousModal/>
      </main>
      <FooterComponent/>
      <BootstrapJS/>
    </div>
  );
}

export default App;
