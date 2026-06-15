import neshanMap from "./neshan"


const getNavigationMap = ({type,origin,destination}) =>{
    return neshanMap.get("https://api.neshan.org/v4/direction/no-traffic"),{
        params:{
            type:type,
            destination:destination,
            origin:origin,
        }
    }
}