import * as React from "react";
import BaseTable,{TableSchemaDescr} from '../components/BaseTable' ;
import HelloTable from './HelloTable' ;
import {tableSchema,data} from './HelloTestData' ;

interface HelloStates{
    list:object[] ;
    schema:TableSchemaDescr ;
}

//查询页面代码
export class Hello extends React.Component<any, HelloStates> {
    constructor(){
        super() ;
        this.state = {
            list:[],
            schema:{
                columns:[],
                rowKeyNames:[]
            } 
        } ;
    }
    componentDidMount(){
        //先去查询表格显示的schema
        this.setState({
            schema:tableSchema
        }) ;
        setTimeout(()=>{
            this.setState({list:data}) ;
        },20) ;
    }

    render() {
        return (
            <div className="container">
                <h3>这部分时查询条件区域</h3>
                <HelloTable  code ="table163" 
                    description="大客户表信息描述" 
                    list={this.state.list}
                    schema={this.state.schema}
                />
            </div>
        ) ; 
    }
}


export default Hello ;




