import * as React from "react";
import BaseTable,{BaseTableProps,TableSchemaDescr} from './BaseTable' ;

const tableSchema ={
    columns:[//-------------定义每一列如何显示
        { 
          title: '用户名', dataItemKey: 'username', width: 100,
          render:'showUserNameColumnFnName',//用户可能需要显示高亮一点
        },
        { title: '专业', dataItemKey: 'dept',  width: 100 },
        { title: '主页', dataItemKey: 'homepage',width: 200,
           dataItemColumnRender:'showMyHomePageFnName'//主页可能需要显示成超链接
        },
        //{ title: '操作', dataItemKey: '',  width:300 },//dateKey为空，标识为操作列
    ],
    rowKeyNames:['username','dept'] //--定义每一行记录根据哪几个字段能确定数据库中的一条记录
}

const data = [
    { username: '张三',dept:"软件工程",homepage:'wwww.baidu.com' ,key:'001'}, 
    //key 为查询记录不重复的一个字符串，可以不传，如果不传会根据tableSchema中定义的主键字段自动拼接字符串
    { username: '李四',dept:"英语",homepage:'www.jd.com' ,key:'002' }
];

//自定义表格本页面的表格显示
class MyTable extends BaseTable{

}

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

    showMyHomePageFnName(value:string){
        return (
            <a href="#">{value}</a>
        ) ;
    }

    render() {
        return (
            <div>
                <h1>Hello workd!</h1>
                <MyTable  code ="table163" 
                    description="大客户表信息描述" 
                    list={this.state.list}
                    schema={this.state.schema}
                    />
            </div>
        ) ; 
    }
}


export default Hello ;




