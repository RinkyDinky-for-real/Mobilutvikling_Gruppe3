async function hash(value) {
	const encoder = new TextEncoder()
	const data = encoder.encode(value)
	const buffer = await crypto.subtle.digest("SHA-256", data)
	const hashArray = Array.from(new Uint8Array(buffer))
	function mapFunction(b) {
		return(b.toString(16).padStart(2, "0"))
	}
	return(hashArray.map(mapFunction).join(""))
}



// The database can be accessed on the following URL: https://mobile-programming.emilhesmyr.workers.dev/path/to/endpoint.



export default {
	async fetch(request: Request, env) {
		if (!request.url.toLowerCase().startsWith("https")) {
			return (new Response("unsecure connection", {"status": 403}))
		}
		const { pathname } = new URL(request.url);
		
		//console.log(pathname)
		//console.log(request.method)
		//console.log(request.method == "POST" && pathname == "/api/v1/createuser")
		let query = "";
		let value = ""
		let error = 200
		let potentialError = 200
		let shouldSend = false
		const userId = request.headers.get("userId")
		if (userId) {
			let { results } = await env.mobile_programming.prepare("select * from users where userId = ?").bind(userId).run()
			if (results.length == 0) {
				return (new Response("Invalid user id", {"status": 400}))
			}
		}
		if (pathname === "/api/v1/post/random" && request.method === "GET" && request.headers.get("limit")) {
			shouldSend = true

			query = "SELECT postId, users.userName, title, content, latitude, longitude, date from posts join users on users.userId  = posts.userId where posts.userId != ? order by random() limit ?"
			value = "0"
			const { results } = await env.mobile_programming.prepare(query).bind(value, request.headers.get("limit")).run()
			return (Response.json(results))
		}

		if (pathname === "/api/v1/user/getuserid" && request.headers.get("userName") && request.headers.get("passwordHash") && request.method === "GET") {
			const h = await  hash(request.headers.get("passwordHash"))
			const { results } = await env.mobile_programming.prepare("select userId from users where userName = ? and passwordHash = ?").bind(request.headers.get("userName"), h).run()
			if (results.length == 0) {
				return (new Response("User not found", { "status": 404 }))
			}
			else {
				return(Response.json(results))
			}
		}
		if (pathname === "/api/v1/user" && request.method === "PATCH" && request.headers.get("userId")) {
			if (request.headers.get("userName")) {
				await env.mobile_programming.prepare("update users set userName =  ? where userId = ? limit 1").bind(request.headers.get("userName"), request.headers.get("userId")).run()
			}
			if (request.headers.get("passwordHash")) {
				const h = await hash(request.headers.get("passwordHash"))
				await env.mobile_programming.prepare("update users set passwordHash = ? where userId = ? limit 1").bind(h, request.headers.get("userId")).run()
			}
			if (request.headers.get("favoriteFishingPlace") != null) {
				await env.mobile_programming.prepare("update users set favoritePlace = ? where userId = ?").bind(request.headers.get("favoriteFishingPlace"), request.headers.get("userId")).run()
			}
			if (request.headers.get("favoriteFish") != null) {
				await env.mobile_programming.prepare("update users set favoriteFish = ? where userId = ?").bind(request.headers.get("favoriteFish"), request.headers.get("userId")).run()
			}
			if (request.headers.get("favoriteFishingMethod") != null) {
				await env.mobile_programming.prepare("update users set favoriteFishingMethod = ? where userId = ?").bind(request.headers.get("favoriteFishingMethod"), request.headers.get("userId")).run()
			}

			return (new Response("User updated", { "status": 202 }))
		}
		if (pathname === "/api/v1/getpost" && request.method === "GET" && request.headers.get("postId") && request.headers.get("userId")) {
			
			const { results } = await env.mobile_programming.prepare("SELECT users.userName, title, content, latitude, longitude, date from posts join users on users.userId  = posts.userId where posts.postId = ? and users.userId = ?").bind(request.headers.get("postId",), request.headers.get("userId")).run()
			let status = 200
			if (results.length == 0) {
				status = 404
			}
			return (Response.json(results, {"status": status}))
		}
		if (!(userId || request.method === "POST" || pathname === "/api/v1/post" && request.method === "DELETE")) {
			return (new Response("userId missing", {"status": 400}))
		}

		if (pathname === "/api/v1/user" && request.method === "GET") {
			shouldSend = true
			query = "SELECT userName, favoriteFishingMethod, favoritePlace, favoriteFish FROM users where userId = ?"
			value = userId;
			potentialError = 404
		}
		else if (pathname === "/api/v1/post" && request.method === "GET") {
			shouldSend = true
			query = "SELECT users.userName, postId, title, content, latitude, longitude, date from posts join users on users.userId  = posts.userId where posts.userId = ? order by date desc"
			value = userId
		}
		else if (pathname == "/api/v1/user" && request.method == "POST") {
			if (!(request.headers.get("userName") && request.headers.get("passwordHash"))) {
				return (new Response("Missing Data", { "status": 400 }))
			}
			const { results } = await env.mobile_programming.prepare("select * from users where userName = ?").bind(request.headers.get("userName")).run();
			if (results.length > 0) {
				return (new Response("Duplicate username", { status: 409 }))
			}
			const newId = crypto.randomUUID()
			let res = null
			const h = await hash(request.headers.get("passwordHash"))
			
			
			await env.mobile_programming.prepare("insert into users (userId, userName, passwordHash, favoriteFishingMethod, favoritePlace, favoriteFish) values (?, ?, ?, '', '', '')").bind(newId, request.headers.get("userName"), h, ).run();
			return new Response(newId, { status: 201 })
		}
		else if (pathname === "/api/v1/user" && request.method === "DELETE") {
			shouldSend = true
			await env.mobile_programming.prepare("delete from posts where userId = ?").bind(userId).run()
			query = "delete from users where userId = ?"
			value = userId

		}
		else if (pathname === "/api/v1/post" && request.method === "POST") {
			const headers = request.headers
			if (!(headers.get("userId") && headers.get("title") && headers.get("content") && headers.get("latitude") && headers.get("longitude") && headers.get("date"))) {
				return (new Response("content missing", { "status": 400 }))
			}
			let newId = crypto.randomUUID()
			// dates must be sent in so the most significant data is stored first in the string, e.g, year/month/day/hour/minit, so the sorting works.
			const { results} = await env.mobile_programming.prepare("insert into posts (postId, userId, title, content, latitude, longitude, date) values (?, ?, ?, ?, ?, ?, ?)").bind(newId, headers.get("userId"), headers.get("title"), headers.get("content"), headers.get("latitude"), headers.get("longitude"), headers.get("date")).run()
			
			//const { results } = env.mobile_programming.prepare("select * from posts where postId = ?").bind(newId)
			//console.log(results)
			//return (new Response(newId));
			return (new Response(newId, {"status": 201}))

		}
		else if (pathname === "/api/v1/post" && request.method === "DELETE" && request.headers.get("postId") && userId) {
			shouldSend = true
			query = "delete from posts where postId = ? and userId = ?"
			value = request.headers.get("postId")
			await env.mobile_programming.prepare(query).bind(value, userId).run()
			return(new Response("Post deleted", {"status": 200}))
		}
		else if (pathname === "/api/v1/user/count" && request.method === "GET") {
			
			const { results} = await env.mobile_programming.prepare("select count(userId) from users").run()
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
