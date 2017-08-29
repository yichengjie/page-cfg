import * as React from "react";

export interface BaseTableProps {
    compiler: string; framework: string; 
}

class  BaseTable extends React.Component<BaseTableProps,any>{
    constructor(props:BaseTableProps){
        super(props) ;
    }
    render(){
      return (
          <table>
              <thead>
                  <tr>
                      <th>用户名</th>
                      <th>电话</th>  
                      <th>邮箱</th>          
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>yicj</td>
                      <td>133</td>
                      <td>62@qq.com</td>    
                  </tr>
                  <tr>
                      <td>{this.props.compiler}</td>
                      <td>{this.props.framework}</td>
                      <td>62@qq.com</td>    
                  </tr>
              </tbody>
          </table>
      ) ;  
    }
}

export default BaseTable ;