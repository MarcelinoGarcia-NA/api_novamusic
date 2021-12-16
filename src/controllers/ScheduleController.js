
Schelude = require("../models/Schedule");
module.exports = {
    async store(req, res) {
        if ((await Schelude.findOne({ name_city: req.body.name_city}))&&(await Schelude.findOne({ date: req.body.date}))&&((await Schelude.findOne({ hour: req.body.hour})))(await Schelude.findOne({ locate: req.body.locate}))) {
            return res.status(400).json({ error: "Agenda já se encontra na base de dados!" });
        }
        const schelude = await Schelude.create(req.body);
        return res.json(schelude);
    },
    async update(req, res) {
        const schelude = await Schelude.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(schelude);
    }, 
    async list(req, res){
        const schelude= await Schelude.find();
        return res.json(schelude);
    },
    async destroy(req, res){
        const schelude= await Schelude.deleteOne({_id: req.params.id});
        return res.json({message:"Agenda removido do banco de dados!"});
    },
    async findschedule(req,res){
        const schelude= await Schelude.findOne({_id: req.params.id});
        return res.json(schelude);
    },

}