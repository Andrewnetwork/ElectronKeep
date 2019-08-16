import React,{ Component } from 'react';
import { Theme, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';

const styles = (theme: Theme) => 
  createStyles({
    note:{
      margin:"10px",
      border:"thin solid black",
      padding:"10px",
      float:"left",
      fontSize:"27px",
      backgroundColor:"#D6EDFF",
      borderRadius:"3px",
      boxShadow:"0.5px 0.5px 3px",
      fontFamily:"Sans-serif",
      width:"200px"
    },
    note_active:{
        margin:"10px",
        border:"thin solid black",
        padding:"10px",
        float:"left",
        fontSize:"27px",
        borderRadius:"3px",
        visibility:"hidden",
        width:"200px"
      }
  });

interface Props extends WithStyles<typeof styles>{
    onClick:Function;
    children:string;
    isActive:boolean;
}

export interface NoteState{
    id:number;
    isActive:boolean;
    noteText:string;
}
class Note extends Component<Props, NoteState>{
    render(){
        const { classes } = this.props;
        let note_style = classes.note
        if(this.props.isActive){
            note_style = classes.note_active;
        }
        return(
            <div onClick={()=>this.props.onClick()} className={note_style}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(styles)(Note);