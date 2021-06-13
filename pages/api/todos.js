// server-side cache, upon server restart the cache is reset to this value
let todos = [{ id: 1, text: "We need to resurrect zeh serv3r.", finished: false }]

export default (req, res) => {

    const { method } = req

    switch(method) {
        case "GET":
            res.status(200).json(todos)
            break
        case "POST":
            // overwrite server data with browser data
            todos = [...req.body.todos]
            // return data
            res.status(200).json(todos)
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}