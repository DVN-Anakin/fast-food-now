export default function dateTime(firebaseTimestamp) {
    const dateTime = firebaseTimestamp.toDate();
    const dd = dateTime.getDay().toString();
    const mm = dateTime.getMonth().toString();
    const yyyy = dateTime.getFullYear().toString();
    const hr = dateTime.getHours().toString();
    const min = dateTime.getMinutes().toString();
    const sec = dateTime.getSeconds().toString();
    
    return (`${dd}/${mm}/${yyyy} ${hr}:${min}:${sec}`);
}