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
}

export interface BaseTableProps {
    list: object[]; 
    schema: TableSchemaDescr; 
    description:string ; /**表格的描述信息，暂定后期可能会使用*/
    code:string ;/**表格code ，暂定后期可能会使用 */
}

class  BaseTable extends React.Component<BaseTableProps,any>{
    constructor(props:BaseTableProps){
        super(props) ;
    }
    /**显示表头信息 */
    renderTheader(columns:TableColumnDescr[]) {
        return (
            <tr>
                {
                    columns.map(function(item,index){
                        let {width} = item ;
                        let tmpObj = {width} ;
                        return<th {...tmpObj} key={item.dataItemKey} >{item.title}</th> ;
                    }) 
                }
            </tr>
        ) ;
    }

    /**
     * 显示表格的每一行
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
                        let value = rowItem[dataItemKey] || '' ;
                        return (<td key={index} >{this.renderTdContent(value,render)}</td>) ;
                    }) 
                }
            </tr>
        ) ;
    }



    exeRenderTdFuncByName(value:string,funcName:string){
        if(funcName && (typeof funcName === 'string')){
            let fn = this[funcName] as function; 
            return fn(value) ;
        }
        return value ;
    }


    /**
     * 
     * @param value 
     * @param render 
     *  dealColumns(columns){
            let newColumns = [] ;
            for(let column of columns){
                let {render,...other} = column ;
                let obj = {...other} ;
                if(render != null){
                    obj.render = this[render] ;
                }
                newColumns.push(obj) ;
            }
            return newColumns ;
        }
     */

    renderTdContent(value:string,render:string){
       
        return this.exeRenderTdFuncByName(value,render) ;
    }

    renderTbody(list:object[] ,schema:TableSchemaDescr){
        return list.map((item) => {
            return this.renderRowItem(item,schema) ;
        }) ;
    }

    render(){
      let {schema , list , description , code} = this.props ;
      let {columns,rowKeyNames} = schema ;
      return (
          <table className="table table-bordered">
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