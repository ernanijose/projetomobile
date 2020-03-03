import React, {useState, useEffect} from 'react';

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//import { makeStyles } from '@material-ui/core/styles';
//import { green } from '@material-ui/core/colors';
//import Icon from '@material-ui/core/Icon';

import './styles.css';

function DevItem({ dev, removeDev, handleUpdateDev }) {
  const [github_usernameU, setGithubUsernameU] = useState('');
  const [techsU, setTechsU] = useState('');
  const [open, setOpen] = React.useState(false);
  /*const handleClickOpen = (e) => {
    
    console.log("djj:"+e.target.value);
    setOpen(true);
  };*/
  function handleClickOpen(e){
    setGithubUsernameU(e.target.value);
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function onSubmitUpdateDev(e) {
    e.preventDefault();
    await handleUpdateDev({
      github_username: github_usernameU,
      techs: techsU,
      latitude,
      longitude
    });
    
    setTechsU('');
    setGithubUsernameU('');
    handleClose();
  }

  async function remDev(e){
    e.preventDefault();
    //console.log(e);
    const github_username = e.target.value;
    await removeDev(github_username);
  }
  
  return (
    <>
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>  
          <span>{dev.techs.join(', ')}</span>
        </div>              
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
      
      <button onClick={handleClickOpen} value={dev.github_username}><FaEdit /> {dev.name}</button>      
      <button onClick={remDev} value={dev.github_username}><MdDeleteForever />Remover</button>      
    </li>

              

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Digite Aqui os dados para alterar!
      </DialogContentText>
            
      <TextField
        autoFocus
        margin="dense"
        id={dev.github_username}
        label="Github_username"
        name={dev.github_username}
        fullWidth 
        disabled             
        defaultValue={github_usernameU}
        onChange={e => setLongitude(e.target.value)}
      />

      <TextField
        autoFocus
        margin="dense"
        name={'techs'+dev._id}
        id={'techs'+dev._id}
        label="Tecnologias"
        type="text"
        fullWidth
        value={techsU}
        onChange={e => setTechsU(e.target.value)}
      />

      <TextField
        autoFocus
        margin="dense"
        id={'latitude'+dev._id}
        label="Latitude"
        type="number"
        fullWidth              
        defaultValue={latitude}
        onChange={e => setLatitude(e.target.value)}
      />

      <TextField
        autoFocus
        margin="dense"
        id={'longitude'+dev._id}
        label="Longitude"
        type="number"
        fullWidth
        defaultValue={longitude}
        onChange={e => setLongitude(e.target.value)}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSubmitUpdateDev} color="primary">
        Editar
      </Button>
    </DialogActions>
    </Dialog>
    </>
  );
}

export default DevItem;
