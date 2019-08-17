import React from "react";
import { Responsive,WidthProvider,Layout,Layouts,ItemCallback } from "react-grid-layout";
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';
import _ from "lodash";
import Note,{NoteState} from "./Note";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface Props{
    className:string;
    rowHeight:number;
    onLayoutChange:(currentLayout: Layout[], allLayouts: Layouts) => void;
    cols:any;
    children:NoteState[];
    onClick:(idx: number) => void;
    onDrag:ItemCallback;
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
        //{{i:"n"+i,x:(i*2)%this.props.cols[this.state.currentBreakpoint],y:Infinity,w:2,h:2}}
        if(this.props.children != null && this.props.children.length > 0){
          return _.map(this.props.children, (noteState:NoteState, i)=>{
            return (
              <div key={i} data-grid={noteState.gridPos}>
                <Note id={noteState.id} isActive={noteState.isActive} key={i} onClick={()=>this.props.onClick(i)}>
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
    onLayoutChange(layout:any, layouts:any){
      this.props.onLayoutChange(layout, layouts);
    };
    render() {
      return (
        <ResponsiveReactGridLayout
          {...this.props}
          // WidthProvider option
          measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          useCSSTransforms={this.state.mounted}
          onBreakpointChange={this.onBreakpointChange.bind(this)}
          compactType="vertical"
          preventCollision={false}
          onDrag={this.props.onDrag}
          onLayoutChange={this.onLayoutChange.bind(this)}>
          {this.generateDOM()}
          
        </ResponsiveReactGridLayout>
      );
    }
  }

