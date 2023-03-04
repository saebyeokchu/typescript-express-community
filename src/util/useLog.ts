export function useLog(msg : any){
    if(msg == undefined) {
        return;
    }

    console.log(msg.toString())
}