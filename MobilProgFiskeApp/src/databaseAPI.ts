const url = "https://mobile-programming.emilhesmyr.workers.dev/api/v1/"
async function sendRequest(endPoint: String, method: String, headers: any) {
    
    try {
        let r = await fetch(url + endPoint, {"method": method, "headers": headers})
        return(r)

    }
    catch {
        return(null)
    }
    
}