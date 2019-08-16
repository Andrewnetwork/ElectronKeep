import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './App.css';
import { InputBase } from '@material-ui/core';
import Database from 'nedb';
import Modal from '@material-ui/core/Modal';
import Note,{NoteState} from './components/Note';

const styles = (theme: Theme) => 
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
    noteInput: {
      width:"100%"
    },
    modalContainerStyle:{
      position:"fixed",
      top:"50%",
      left:"50%",
      transform: "translate(-50%,-50%)",
      backgroundColor:"#D6EDFF",
      padding:"20px",
      fontSize:"27px",
      border:"0px"
    },
    modalStyle:{
    },
    activeNoteInput:{
      fontSize:"27px"
    }
  });

interface Props extends WithStyles<typeof styles>{
}
interface State{
  notes:NoteState[];
  note_input:string;
  active_note_modal:boolean;
  active_note_text:string;
}

class App extends Component<Props, State>{
  db: Database;
  note_id_counter:number;
  constructor(props:Props){
    super(props);
    this.state = {notes:[],note_input:"",active_note_modal:false,active_note_text:""};
    this.db = new Database({ filename: 'note_file_2', autoload: true });
    this.note_id_counter = 0;
    // Populate the notes from the database. 
    this.db.find({}, (err:any,docs:NoteState[])=>{
      this.setState({notes:docs});
    });
  }
  create_note(){
    if(this.state.note_input.length > 0){
      let newNote = {id:this.note_id_counter,isActive:false,noteText:this.state.note_input};
      this.db.insert(newNote);
      this.setState({notes:[...this.state.notes,newNote]});
      this.note_id_counter++;
    }
  }
  open_modal(note_idx:number){
    let notesCpy = [...this.state.notes];
    notesCpy[note_idx].isActive = true;
    this.setState({notes:notesCpy});
    this.setState({active_note_text:this.state.notes[note_idx].noteText});
    this.setState({active_note_modal:true});
  }
  close_modal(){
    let newNotes = this.state.notes.map((noteState:NoteState)=>{
      if(noteState.isActive){
        // Updating note. 
        let updatedNote = {id:noteState.id,noteText:this.state.active_note_text,isActive:false};
        this.db.update({id:noteState.id},updatedNote);
        return updatedNote;
      }else{
        return noteState;
      }
    });
    this.setState({active_note_modal:false,notes:newNotes});
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
        <Modal
          open={this.state.active_note_modal}
          onClose={this.close_modal.bind(this)}
          className={classes.modalStyle}
          >
          <div className={classes.modalContainerStyle}>
            <InputBase
                className={classes.activeNoteInput}
                placeholder="Naked input"
                inputProps={{ 'aria-label': 'naked' }}
                multiline
                value={this.state.active_note_text}
                onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({active_note_text:event.target.value})}
              />
          </div>
         </Modal>
         <ClickAwayListener onClickAway={()=>this.create_note()}>
          <Paper className={classes.root}>
            <InputBase
              className={classes.noteInput}
              placeholder="Naked input"
              inputProps={{ 'aria-label': 'naked' }}
              multiline
              value={this.state.note_input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>)=>this.setState({note_input:event.target.value})}
            />
          </Paper>
        </ClickAwayListener>
        {this.state.notes.map((noteState:NoteState,idx:number)=><Note isActive={noteState.isActive} onClick={()=>this.open_modal(idx)}>{noteState.noteText}</Note>)}
      </div>
    );
  }
}
export default withStyles(styles)(App);
