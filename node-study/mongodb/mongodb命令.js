db.user.update(
	{username: 'pengzhan'},
	{
		$set: {password: 'aaa'}
	}
)


db.user.updateOne(
	{password: '111'},
	{
		$set: {username: 'dddd'}
	}
)

db.user.updateMany(
	{password: '111'},
	{
		$set: {username: 'dddd'}
	}
)

db.user.deleteOne(
    {password: '111'}
)

db.user.remove({password: 'aaa'})

db.user.remove({}) // delete all

db.user.deleteMany([{password: 'aaa'},{username: 'dddd'}])

db.movies.insertMany([
	{
		"menu": {
			"id": "file1",
			"value": "File:1",
			"popup": {
				"menuitem": [
					{"value": "New", "onclick": "CreateNewDoc()"},
					{"value": "Open", "onclick": "OpenDoc()"},
					{"value": "Close", "onclick": "CloseDoc()"}
				]
			}
		},
		"title": "book1"
	},
	{
		"menu": {
			"id": "file2",
			"value": "File:2",
			"popup": {
				"menuitem": [
					{"value": "New", "onclick": "CreateNewDoc()"},
					{"value": "Open", "onclick": "OpenDoc()"},
					{"value": "Close", "onclick": "CloseDoc()"}
				]
			}
		},
		"title": "book2"
	},
	{
		"menu": {
			"id": "file3",
			"value": "File:3",
			"popup": {
				"menuitem": [
					{"value": "New", "onclick": "CreateNewDoc()"},
					{"value": "Open", "onclick": "OpenDoc()"},
					{"value": "Close", "onclick": "CloseDoc()"}
				]
			}
		},
		"title": "book3"
	}
])

db.movies.find({title: 'book3'}, {title: 1, menu: 1, _id: 0}) //1: display

db.movies.find({title: 'book3'}, {title: 1, menu: 1, _id: 0}).size()   //1: display

db.movies.find({}, {title: 1, menu: 1, _id: 0}).skip(10)  display from 11 

db.movies.find({}, {title: 1, menu: 1, _id: 0}).limit(3)  显示前3条

db.movies.find({}, {title: 1, menu: 1, _id: 0}).sort({year: 1})   1: 升序排序 -1：降序排序

db.movies.find({}, {title: 1, menu: 1, _id: 0}).sort({year: -1})   -1：降序排序

db.movies.find({}, {title: 1, 'menu.id': 1, _id: 0}).sort({'rating.average': 1})   

“$lt”、“$lte”、“$gt”、“$gte” 就是所有的范围比较操作符，分别对应<、<=、>、>=

db.people.find({"age":{"$gte":18,"$lte":30}}); 

db.user.find({"name":{"$ne":"tom"}}); !=

db.raffle.find({"ticket_no":{"$in":[10,20,30]}}, {"name":1})  包含

db.raffle.find({"$or":[{"ticket_no":{"$in":[10,20,30]}},{"name":"tim"}]});  条件组合： {"ticket_no":{"$in":[10,20,30]}} or {"name":"tim"}


$mod操作符，使用格式为 {"键"：{"$mod"：[num1, num2]}}，查询“键”的值对num1取余，如果这个值等于num2，则整条文档符合条件。
查询所有在其本命年的用户（年龄是12的整数倍）：
db.people.find({"age":{"$mod":[12,0]}});

$not是元条件符，即可以用于任何其他条件之上的，表明取反，
还是上面的例子，我们这次要查所有不在其本命年的用户文档信息：
db.people.find({"age":{"$not":{"$mod":[12,0]}}});

没有这个键的文档同样匹配值为null这种条件，
如果我们需要过滤掉这种文档，需要另外一个条件操作符$exists，指明这个键必须存在：
db.cc.find({"y":{"$in":[null],$exists:true}}); 

