import * as React from "react";
import BaseTable,{BaseTableProps} from './BaseTable' ;

export interface HelloProps { compiler: string; framework: string; }

// // 'HelloProps' describes the shape of props.
// // State is never set so we use the 'undefined' type.
// export class Hello extends React.Component<HelloProps, undefined> {
    
//     render() {
//         return <h1>Hello from  {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }

//自定义表格本页面的表格显示
class MyTable extends BaseTable{

}

//查询页面代码
export class Hello extends React.Component<HelloProps, undefined> {
    render() {
        let props = this.props ;
        return (
            <div>
                <h1>Hello from  {this.props.compiler} and {this.props.framework}!</h1>
                <MyTable {...props} />
            </div>
        ) ; 
    }
}


export default Hello ;




