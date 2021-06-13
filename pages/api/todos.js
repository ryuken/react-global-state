let todos = [{ id: 1, text: "We need to resurrect zeh serv3r.", finished: false }]

export default (req, res) => {

    

    res.status(200).json(todos)
}