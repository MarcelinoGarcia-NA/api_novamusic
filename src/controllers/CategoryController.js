
Category = require("../models/Category");
module.exports = {
    async store(req, res) {
        if (await Category.findOne({ name_category: req.body.name_category })) {
            return res.status(400).json({ error: "Categoria já se encontra na base de dados!" });
        }
        const category = await Category.create(req.body);
        return res.json(category);
    },
    async update(req, res) {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(category);
    }, 
    async list(req, res){
        const category= await Category.find();
        return res.json(category);
    },
    async destroy(req, res){
        const category= await Category.deleteOne({_id: req.params.id});
        return res.json({message:"Categoria removido do banco de dados!"});
    },
    async findcategory(req,res){
        const category= await Category.findOne({_id: req.params.id});
        return res.json(category);
    },

}