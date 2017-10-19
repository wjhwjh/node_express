/**
 * Created by Administrator on 2017/9/20.
 */
'use strict';
var entries = [
    {"id":1, "title":"第一篇", "body":"正文", "published":"6/2/2013"},
    {"id":2, "title":"第二篇", "body":"正文", "published":"6/3/2013"},
    {"id":3, "title":"第三篇", "body":"正文", "published":"6/4/2013"},
    {"id":4, "title":"第四篇", "body":"正文", "published":"6/5/2013"},
    {"id":5, "title":"第五篇", "body":"正文", "published":"6/10/2013"},
    {"id":6, "title":"第六篇", "body":"正文", "published":"6/12/2013"}
];

exports.getBlogEntries = function (){  //用来返回所有的数据
    return entries;
}

exports.getBlogEntry = function (id){  //用来返回指定的某一个数据
    for(var i=0; i < entries.length; i++){
        if(entries[i].id == id) return entries[i];
    }
}


