const url = "https://mobile-programming.emilhesmyr.workers.dev/api/v1/"

export async function sendRequest(endPoint: string, method: string, headers: any) {
    
    try {
        console.log('testing...')
        let r = await fetch(url + endPoint, {"method": method, "headers": headers})
        return(r)

    }
    catch {
        throw Error ('Failed request')
    }
    
}