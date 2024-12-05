function currentDate()
{
    //2024-10-08T17:17:12.357Z
    var now = new Date();
    const month = (now.getMonth()+1).toLocaleString('en-US',{
        minimumIntegerDigits: 2
    });
    const day = now.getDate().toLocaleString('en-US',{
        minimumIntegerDigits: 2
    });
    const year = now.getFullYear();
    const result = `${month}/${day}/${year}`;
    //console.log(result);
    return result;

}
function currentDateAndTime()
{
    //October 8, 2024 8:26 PM
    var now = new Date();
    var options = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: 'true' };
    const timeVar = now.toLocaleDateString('en-US', options).replace('at ','');
    return timeVar;
}

export { currentDate, currentDateAndTime }