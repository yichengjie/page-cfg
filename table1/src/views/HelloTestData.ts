export const tableSchema ={
    columns:[//-------------定义每一列如何显示
        { 
          title: '用户名', dataItemKey: 'username', width: 100,
          render:'showUserNameColumnFnName',//用户可能需要显示高亮一点
        },
        { title: '专业', dataItemKey: 'dept',  width: 100 },
        { title: '主页', dataItemKey: 'homepage',width: 300,
           render:'showMyHomePageFnName'//主页可能需要显示成超链接
        },
        { title: '操作', dataItemKey: '',  width:100 },//dateKey为空，标识为操作列
    ],
    rowKeyNames:['username','dept'], //--定义每一行记录根据哪几个字段能确定数据库中的一条记录
    width:600,/**表格的宽度 */
}

export const data = [
    { username: '张三',dept:"软件工程",homepage:'wwww.baidu.com' ,key:'001'}, 
    //key 为查询记录不重复的一个字符串，可以不传，如果不传会根据tableSchema中定义的主键字段自动拼接字符串
    { username: '李四',dept:"英语",homepage:'www.jd.com' ,key:'002' }
];

