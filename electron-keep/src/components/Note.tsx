import React,{ Component } from 'react';
import { Theme, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';

const styles = (theme: Theme) => 
  createStyles({
    note:{
        "&:hover":{
            backgroundColor:"#b8d0e3",
            cursor:"pointer"
        },
        border:"thin solid black",
        float:"left",
        fontSize:"20px",
        backgroundColor:"#D6EDFF",
        borderRadius:"3px",
        boxShadow:"0.5px 0.5px 3px",
        fontFamily:"Sans-serif",
        width:"100%",
        height:"100%",
        userSelect:"none",
    },
    note_active:{
        margin:"10px",
        border:"thin solid black",
        padding:"10px",
        float:"left",
        fontSize:"20px",
        borderRadius:"3px",
        visibility:"hidden",
        width:"200px"
      },
      inner_note:{
        padding:"10px"
      }
  });

interface Props extends WithStyles<typeof styles>{
    onClick:Function;
    children:string;
    isActive:boolean;
    id:number;
}

export interface NoteState{
    id:number;
    isActive:boolean;
    noteText:string;
}
class Note extends Component<Props, NoteState>{
    didDrag:boolean = false;
    render(){
        const { classes } = this.props;
        let note_style = classes.note
        if(this.props.isActive){
            note_style = classes.note_active;
        }
        return(
            <div onClick={()=>this.props.onClick()} className={note_style}>
                <div className={classes.inner_note}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Note);