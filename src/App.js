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
import { useEffect, useState } from 'react';

import { jwtDecode } from 'jwt-decode';

/**
 * 
 * @param {string} email 
 * @returns {RegExpMatchArray | null}
 */
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/**
 * 
 * @param {string} token 
 * @returns 
 */
const tokenExpired = (token) =>{
  if(!token)return true;
  try{
    const decodeTk = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodeTk.exp < currentTime;
  }catch(error){
    console.error(error);
    return true;
  }
}


function MeetingForm(){

  const [lastName,setLastName] = useState("");
  const [firstName,setFirstName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");

  /**
   * 
   * @param {Event} evt 
   */
  const lastNameChange = (evt) => {
    setLastName(evt.target.value)
  }
  
  const firstNameChange = (evt) => {
    setFirstName(evt.target.value)
  }
  
  const emailChange = (evt) => {
    if(validateEmail(evt.target.value) !== null){
      setEmail(evt.target.value)
    }
  }
  
  const phoneChange = (evt) => {
    if([10,12].includes(evt.target.value.length)){
      setPhone(evt.target.value)
    }
  }

  function MeetingSubmit(event){
    event.preventDefault();
    if(lastName.trim() !== "" && firstName.trim() !== "" && email.trim() !== "" && phone.trim() !== ""){
        const user = {nom:lastName,prenom:firstName,email:email,telephone:phone};
        try{
          fetch("http://localhost:8080/api/users/user/login",{
            method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(user)
          })
          .then(response=>response.json())
          .then(async data=>{
              let currentUser = await fetch("http://localhost:8080/api/users/"+data.id);
              currentUser = await currentUser.json();

              let request = await fetch("http://localhost:8080/api/users",{
                method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(currentUser)
              });
              const tokenObj = await request.json();
              sessionStorage.setItem("user",JSON.stringify(tokenObj.user));
              sessionStorage.setItem("token",tokenObj.token);
              console.log(sessionStorage);
          })
        }catch(error){
          console.error(error);
        }
    }
  }

  return (
    <Form className='meeting-form' onSubmit={MeetingSubmit}>
      <Form.Group controlId='nom2'>
        <Form.Label>Nom</Form.Label>
        <Form.Control type='text' placeholder='Nom...' required name='nom2' onChange={lastNameChange}></Form.Control>
      </Form.Group>
      <Form.Group controlId='prenom'>
        <Form.Label>Prénom</Form.Label>
        <Form.Control type='text' placeholder='Prénom...' required name='prenom' onChange={firstNameChange}></Form.Control>
      </Form.Group>
      <Form.Group controlId='mail2'>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type='email' placeholder='Adresse email...' required name='mail2' onChange={emailChange}></Form.Control>
      </Form.Group>
      <Form.Group controlId='phone'>
        <Form.Label>Téléphone</Form.Label>
        <Form.Control type='tel' placeholder='Numéro...' name='mail2' minLength={0} maxLength={12} onChange={phoneChange}></Form.Control>
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
  useEffect(()=>{
    console.log(sessionStorage);
    sessionStorage.clear();
    console.log(sessionStorage);
  },[])

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
