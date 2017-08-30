import * as React from "react";

interface TableColumnDescr{
    title:string ;
    dataItemKey:string ;
    width?:number ;
    render?:string ;
}

export interface TableSchemaDescr{
    columns:TableColumnDescr[] ;
    rowKeyNames:string [] ;
    width?:number ;/**表格宽度 */
}

export interface BaseTableProps {
    list: object[]; 
    schema: TableSchemaDescr; 
    description:string ; /**表格的描述信息，暂定后期可能会使用*/
    code:string ;/**表格code ，暂定后期可能会使用 */
}

class BaseTable extends React.Component<BaseTableProps,any>{
    constructor(props:BaseTableProps){
        super(props) ;
    }
    /**
     * 显示表头信息
     * @param columns 
     */
    renderTheader(columns:TableColumnDescr[]) {
        return (
            <tr>
                {
                    columns.map(function(item,index){
                        let {width} = item ;
                        let tmpObj = {width} ;
                        return (
                            <th {...tmpObj} 
                                key={item.dataItemKey} >
                                {item.title}
                            </th>
                        ) ;
                    }) 
                }
            </tr>
        ) ;
    }
    /**
     * 显示表格的每一行
     * @param rowItem 
     * @param schema 
     */
    renderRowItem(rowItem:{[index:string]:any} ,schema:TableSchemaDescr){
        let {columns,rowKeyNames} = schema ;
        let rowKeyValues = rowKeyNames.map(function(rowKeyName){
            return (rowItem[rowKeyName] || 'null') ; 
        }) ;
        let rowKeyStr = rowKeyValues.join('_') ; ;
        return (
            <tr key={rowKeyStr}>
                {
                    columns.map((column,index) => {
                        let {dataItemKey,render} = column ;
                        if(dataItemKey && dataItemKey.length > 0){
                            let value = rowItem[dataItemKey] || '' ;
                            return (<td key={index} >{this.renderTdContent(value,render)}</td>) ;
                        }
                        return (<td key={index}>{this.renderOperTdContend(rowItem,rowKeyNames)}</td>) ;
                    }) 
                }
            </tr>
        ) ;
    }

    /**
     * 显示操作列
     */
    renderOperTdContend(rowItem:{[index:string]:any},rowKeyNames :string[]){
        let keyObj = {} as {[index:string]:any};
        for(let rowKeyName of rowKeyNames){
            keyObj[rowKeyName] = rowItem[rowKeyName] ;
        }

        return (
            <span>
                <i className="glyphicon glyphicon-search hand" 
                    onClick={this.handleDetailOperFactory(keyObj)}></i>
                &nbsp;&nbsp;
                <i className="glyphicon glyphicon-pencil hand" 
                    onClick={this.handleModifyOperFactory(keyObj)}></i>
                &nbsp;&nbsp;
                <i className="glyphicon glyphicon-trash hand" 
                    onClick={this.handleDeleteOperFactory(keyObj)}></i>
            </span>
        ) ;
    }

    handleDetailOperFactory (keyObj:{[index:string]:any}) {
        return (event:any) =>{
            console.info('detail : ' ,keyObj ) ;
            console.info('跳转到明细页面 .... ') ;
            //跳转到明细页面
        }
    }

    handleModifyOperFactory (keyObj:{[index:string]:any}) {
        return (event:any) =>{
            console.info('modify : ' ,keyObj ) ;
            console.info('跳转到明细页面 ... ') ;
            //跳转到明细页面
        }
    }

    handleDeleteOperFactory(keyObj:{[index:string]:any}){
        return (event:any) =>{
            console.info('delete : ' ,keyObj ) ;
            console.info('ajax执行删除操作') ;
            //ajax执行删除操作
        }
    }

    /**
     * 通过指定td展示需要的函数名称执行函数
     * @param this 
     * @param value 
     * @param funcName 
     */
    exeRenderTdFuncByName(this:{[index:string]:any},value:string,funcName:string){
        //console.info(`value : ${value} , funcName :${funcName} `) ;
        if(funcName && (typeof funcName === 'string')){
            let fn = this[funcName] ; 
            if(fn){
                return fn(value) ;
            }
        }
        return value ;
    }
   
    /**
     * 表格单元格内容显示
     * @param value 
     * @param render 
     */
    renderTdContent(value:string,render:string){
        return this.exeRenderTdFuncByName(value,render) ;
    }
    /**
     * 显示表格的body
     * @param list 
     * @param schema 
     */
    renderTbody(list:object[] ,schema:TableSchemaDescr){
        return list.map((item) => {
            return this.renderRowItem(item,schema) ;
        }) ;
    }

    render(){
      let {schema , list , description , code} = this.props ;
      let {columns,rowKeyNames,width} = schema ;
      let styleObj = {width} ;
      return (
          <table className="table table-bordered" style={{...styleObj}} >
              <thead>
                {this.renderTheader(columns)}  
              </thead>
              <tbody>
                  {this.renderTbody(list,schema)}
              </tbody>
          </table>
      ) ;  
    }
}

export default BaseTable ;