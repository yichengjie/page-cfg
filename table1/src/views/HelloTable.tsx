import * as React from "react";
import BaseTable,{BaseTableProps,TableSchemaDescr} from '../components/BaseTable' ;

//自定义表格本页面的表格显示
class MyTable extends BaseTable{
    //用户名列特殊显示的样式
    showUserNameColumnFnName = (value:string) => {
        return (
            <span>
                <i className="glyphicon glyphicon-user"></i>&nbsp;&nbsp;
                <span className="text-danger">{value}</span>
            </span>
        ) ;
    }
    //主页列特殊显示的样式
    showMyHomePageFnName = (value:string) =>{
        return (
            <a href="#">点击:{value}</a>
        ) ;
    }
}

export default MyTable ;
