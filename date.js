// instead of module.exports we can just use exports
exports.getDate = function (){
const today = new Date();

    
    const options = {
         weekday : "long",
         year : "numeric",
         month :"long"
    };
    return today.toLocaleDateString("en-US",options);
};

exports.getDay = function (){
    const today = new Date();
    
        const options = {
             weekday : "long",
        };
        return today.toLocaleDateString("en-US",options);
    };