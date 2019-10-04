var getDate = function(){
    var date = new Date();

    formattedDate += (date.getMonth()+1)+"_";
    formattedDate += date.getDate()+"_";
    formattedDate +=date.getFullYear();
    return formattedDate
}
module.exports = getDate;