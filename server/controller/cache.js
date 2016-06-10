var cache = require('node-cache');
var awayDayCache = new cache({checkperiod :1,stdTTL :10});
var createNewCacheValue = function(key,obj){
awayDayCache.set(key,obj,function(err,success){

	if(!err && success)
	{
		console.log("value cached");
		awayDayCache.getStats();
	}
});

}

var getCacheValue =function(key,callback)
{

var result=	awayDayCache.get(key,function(err,value){

		if(value== undefined)
		{
			console.log("null cache value");
		}
		else
		{
			console.log("get cache value");
			console.log(value.length);
		}

	});
return callback(result);
}
var methods={};
methods.createNewCacheValue=createNewCacheValue;
methods.getCacheValue=getCacheValue;
module.exports=methods;

