import React, { Fragment } from 'react';
import axios from 'axios';
import GetPosts from './getPost';
import {
    Button, Dialog,ListItemText,
    DialogContent, DialogActions, Grid, TextField, IconButton, List, ListItem
} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle"
import { useEffect,useState } from 'react';

import Slide from "@material-ui/core/Slide"


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Header = () =>{
    const [open,setOpen] = useState(false);
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [data,setData]=useState(null);
    const handleTitle = (e)=>{
        setTitle(e.target.value);
    }  
    const handleBody = (e)=>{
        setBody(e.target.value);
    }  
    const handlePost = (e) =>{
        axios.post('http://localhost:5000/api/addpost',{
            title,
            body
        }).then(res=>{alert(res.data);setOpen(false)});
    }
    return(
        <Fragment>
          <Grid  container justify="center" alignItems="center" direction="column">
            <Grid item xs={12} md={6}>    
                <IconButton title="Add" placeholder="Create post" onClick={()=>{setOpen(true)}} value="create">
                    <AddCircle color="primary" fontSize="large" titleAccess="add"></AddCircle>
                </IconButton>
            </Grid>
            <GetPosts></GetPosts>
            <Dialog transitionDuration={3} TransitionComponent={Transition} keepMounted open={open} fullWidth>
                <DialogContent>
                    <TextField onChange={handleTitle} required label="Enter The Title Of Post" variant="outlined" fullWidth style={{marginBottom:'15px'}} />
                    <TextField onChange={handleBody} required multiline rows={4} variant="outlined" fullWidth label="Enter Body Of Post"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePost} color="primary" variant="contained">
                        Post
                    </Button>
                </DialogActions>
            </Dialog>
          </Grid>  
        </Fragment>
    )
}
export default Header; 