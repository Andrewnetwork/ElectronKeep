import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './App.css';
import { InputBase } from '@material-ui/core';

const styles = (theme: Theme) => 
  createStyles({
    root: {
      padding: theme.spacing(3, 2),
    },
    noteInput: {
      width:"100%"
    },
    note:{
      margin:"10px",
      border:"thin solid black",
      padding:"10px",
      float:"left"
    }
  });

interface Props extends WithStyles<typeof styles>{
}
interface State{
  notes:string[];
  note_input:string;
}

class App extends Component<Props, State>{
  constructor(props:Props){
    super(props);
    this.state = {notes:["Hello electron world!","Hello Twitch!"],note_input:""};
  }
  render(){
    const { classes } = this.props;
    return (
      <div>
         <ClickAwayListener onClickAway={()=>this.setState({notes:[...this.state.notes,this.state.note_input],note_input:""})}>
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
        {this.state.notes.map((noteStr:string)=><div className={classes.note}>{noteStr}</div>)}
      </div>
    );
  }
}
export default withStyles(styles)(App);
