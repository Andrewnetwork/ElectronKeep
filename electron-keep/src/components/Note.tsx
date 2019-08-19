import React,{ Component } from 'react';
import { Theme, createStyles, WithStyles, withStyles} from '@material-ui/core/styles';
import {GridItemPos} from './NoteGrid';

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
        overflow:"hidden",
        textOverflow: "ellipsis",
        whiteSpace:"pre-wrap"
    },
    inner_note:{
        padding:"10px"
    }
  });

export interface NoteState{
    id:number;
    isActive:boolean;
    noteText:string;
    gridPos:GridItemPos;
}
interface Props extends WithStyles<typeof styles>{
    onClick:Function;
    children:string;
    isActive:boolean;
    id:number;
}
class Note extends Component<Props, NoteState>{
    render(){
        const { classes } = this.props;
        return(
            <div key={this.props.id} onClick={()=>this.props.onClick()} className={classes.note}>
                <div className={classes.inner_note}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(Note);