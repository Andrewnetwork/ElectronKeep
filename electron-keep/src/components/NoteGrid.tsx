import React from "react";
import GridLayout, { Responsive,WidthProvider,Layout,Layouts,ItemCallback} from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import _ from "lodash";
import Note,{NoteState} from "./Note";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Props{
    className:string;
    rowHeight:number;
    cols:any;
    children:NoteState[];
    onClick:(idx: number) => void;
    onDrag:ItemCallback;
    onResizeStop:ItemCallback;
}
export interface GridItemPos{
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
}

export default class NoteGrid extends React.Component<Props,any>{
    static defaultProps = {
      className: "layout",
      rowHeight: 30,
      onLayoutChange: function() {},
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };
    constructor(props:any){
        super(props)
        this.state = {
            currentBreakpoint: "lg",
            compactType: "horizontal",
            mounted: false,
        };
    }
    componentDidMount(){
      this.setState({ mounted: true });
    }
    generateDOM() {
        if(this.props.children != null && this.props.children.length > 0){
          return _.map(this.props.children, (noteState:NoteState, i)=>{
            return (
              <div key={noteState.id} style={noteState.isActive?({visibility:"hidden"}):({visibility:"visible"})} data-grid={noteState.gridPos}>
                <Note id={noteState.id} isActive={noteState.isActive} key={i} onClick={()=>this.props.onClick(i)} >
                    {noteState.noteText}
                </Note>
              </div>
            )
          });
        }else{
            return <div>Hi</div>;
        }
    }
    onBreakpointChange(breakpoint:any){
      this.setState({
        currentBreakpoint: breakpoint
      });
    };
    render() {
      return (
        <GridLayout
          {...this.props}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          compactType="vertical"
          preventCollision={false}
          onDrag={this.props.onDrag}
          width={window.innerWidth-20}
          cols={12}
          rowHeight={30}
          onDragStop={this.props.onResizeStop.bind(this)}
        >
          {this.generateDOM()}
        </GridLayout>
      );
    }
  }

