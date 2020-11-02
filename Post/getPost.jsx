import React, { Fragment, useEffect } from 'react';
import axios from 'axios';
import {List,ListItem,TextField,DialogActions,Typography,Dialog,ListItemIcon,ListItemText,Button, IconButton, DialogContent, DialogContentText, Paper} from '@material-ui/core'
import { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Update from '@material-ui/icons/Update';

const GetPost = ()=> {
    const [posts,setPosts] = useState([]);
    const [open,setOpen] = useState(false);
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [oldTitle,setOldTitle] = useState('');
    const [oldBody,setOldBody] = useState('');
    const [id,setId] = useState('');
    useEffect(()=>{
        axios.get('http://localhost:5000/api/getposts').then(res=>setPosts(res.data))
    },[posts]);

    const handleEdit=(id)=>{
        let updated = posts.filter(post=>post._id===id)
        setOpen(true)
        setOldTitle(updated[0].title);
        setOldBody(updated[0].body)
        setId(id)
    }
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:5000/api/deletepost/${id}`).then(res=>
        alert(res.data)
        );
    }

    const handleTitle=(e)=>{
        setOldTitle(e.target.value)
    }
    const handleBody=(e)=>{
        setOldBody(e.target.value)
    }
    const updatePost=()=>{
        axios.put(`http://localhost:5000/api/updatepost/${id}`,{
            title:oldTitle,
            body:oldBody
        }).then(res=>{
            alert(res.data);
            setOpen(false)
        })
    }
    return (
        <Fragment>
            <Dialog open={open}> 
                <DialogContent>
                    <DialogContentText>
                        <TextField onChange={handleTitle} value={oldTitle}  type="text" label="Title" style={{marginBottom:'20px'}}  variant="outlined" fullWidth />
                        <TextField onChange={handleBody}  value={oldBody} type="text" label="body" variant="outlined" fullWidth />
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={updatePost} variant="contained" color="primary">
                            <Typography>Update</Typography>
                            <Update></Update>
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Paper>
                <List>    
                    {posts.map(post=>(
                        <ListItem style={{borderTop:'1px solid grey'}} key={post._id}>
                            <ListItemText>
                                <Typography variant="h6">{post.title}</Typography>
                            </ListItemText>
                            <ListItemText>
                                <Typography variant="h6">{post.body}</Typography>
                            </ListItemText>
                            <ListItemIcon>
                                <IconButton onClick={()=>handleEdit(post._id)} color="primary">
                                    <Edit></Edit>
                                </IconButton>
                                <IconButton onClick={()=>handleDelete(post._id)} color="secondary">
                                    <Delete></Delete>
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>                   
                    ))}
                </List>
            </Paper>
        </Fragment>

        );
}
export default GetPost;