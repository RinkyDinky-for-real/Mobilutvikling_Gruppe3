import { request } from "http";
// The database can be accessed on the following URL: https://mobile-programming.emilhesmyr.workers.dev/path/to/endpoint.
export default {
	async fetch(request: Request, env) {
		const { pathname } = new URL(request.url);
		console.log(pathname)
		console.log(request.method)
		console.log(request.method == "POST" && pathname == "/api/v1/createuser")
		let query = "";
		let value = ""
		let error = 200
		let potentialError = 200
		let shouldSend = false
		const userId = request.headers.get("userId")
		if (pathname === "/api/v1/user/getuserid" && request.headers.get("userName") && request.headers.get("passwordHash")) {
			
			const { results } = await env.mobile_programming.prepare("select AccountId from Accounts where UserName = ? and PasswordHash = ?").bind(request.headers.get("userName"), request.headers.get("passwordHash")).run()
			if (results.length == 0) {
				return (new Response("User not found", { "status": 404 }))
			}
			else {
				return(Response.json(results))
			}
		}
		
		if (!(userId || request.method === "POST" || pathname === "/api/v1/post" && request.method === "DELETE")) {
			return (new Response("UserId missing", {"status": 400}))
		}

		if (pathname === "/api/v1/user" && request.method === "GET") {
			shouldSend = true
			query = "SELECT * FROM Accounts where AccountId = ?"
			value = userId;
			potentialError = 404
		}
		else if (pathname === "/api/v1/post" && request.method === "GET") {
			shouldSend = true
			query = "SELECT * from Posts where userId = ?"
			value = userId
		}
		else if (pathname === "/api/v1/post/random" && request.method === "GET" && request.headers.get("limit")) {
			shouldSend = true
			
			query = "select * from Posts where UserId != ? order by random() limit ?"
			value = userId
			const { results } = await env.mobile_programming.prepare(query).bind(value, request.headers.get("limit")).run()
			return(Response.json(results))
		}
		else if (pathname == "/api/v1/user" && request.method == "POST") {
			if (!(request.headers.get("userName") && request.headers.get("passwordHash"))) {
				return (new Response("Missing Data", {"status": 400}))
			}
			const { results } = await env.mobile_programming.prepare("select * from Accounts where userName = ?").bind(request.headers.get("userName")).run();
			if (results.length > 0) {
				return (new Response("Duplicate username", {status: 409}))
			}
			const newId = String(Math.floor(Math.random()* 1000000000000000) + 1000000000000000)
			let res = null
			await env.mobile_programming.prepare("insert into Accounts (AccountId, UserName, PassWordHash) values (?, ?, ?)").bind(newId, request.headers.get("userName"), request.headers.get("passwordHash")).run();
			return new Response(newId, {status: 201})
		}
		else if (pathname === "/api/v1/user" && request.method === "DELETE") {
			shouldSend = true
			await env.mobile_programming.prepare("delete from Posts where UserId = ?").bind(userId).run()
			query = "delete from Accounts where AccountId = ?"
			value = userId
			
		}
		else if (pathname === "/api/v1/post" && request.method === "POST") {
			const headers = request.headers
			if (!(headers.get("userId") && headers.get("title") && headers.get("content") && headers.get("latitude") && headers.get("longtitude"))) {
				return (new Response("Content missing", {"status": 400}))
			}
			let newId = String(Math.floor(Math.random() * 1000000000000000) + 1000000000000000)
			await env.mobile_programming.prepare("insert into Posts (PostId, UserId, Title, Content, latitude, longtitude) values (?, ?, ?, ?, ?, ?)").bind(newId, headers.get("userId"), headers.get("title"), headers.get("content"), headers.get("latitude"), headers.get("longtitude")).run()
			const { results } = env.mobile_programming.prepare("select * from Posts where PostId = ?").bind(newId)
			console.log(results)
			return(new Response(newId))

		}
		else if (pathname === "/api/v1/post" && request.method === "DELETE" && request.headers.get("postId")) {
			shouldSend = true
			query = "delete from Posts where PostId = ?"
			value = request.headers.get("postId")
			
		}
		else if (pathname === "/api/v1/user/count" && request.method === "GET") {
			
			const { results} = await env.mobile_programming.prepare("select count(AccountId) from Accounts").run()
			return(Response.json(results))
		}
		else {
			return (new Response("The requested data could not be found", {"status": 404}))
		}
		if (shouldSend) {
			const { results } = await env.mobile_programming.prepare(query).bind(value).run()
			if (results.length == 0) {
				console.log("No data fetched from database")
				error = potentialError
			}
			else {
				console.log(JSON.stringify(results))
				console.log(results.length)
				console.log(typeof(results))
			}
			let response = Response.json(results, {status: error})
			
			return (response)
		}
		return new Response()
	},
};
