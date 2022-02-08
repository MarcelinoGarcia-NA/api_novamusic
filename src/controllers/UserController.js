User = require("../models/User");
const jwt = require('jsonwebtoken');
const authconfig= require("../config/auth.json");
const Category = require("../models/Category");
const nodemailer= require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bcrypt = require("bcryptjs");

function generateToken(params={}){
    return jwt.sign(params, authconfig.secret,{
        expiresIn:86400,
    });
}
module.exports = {
    
    async store(req, res) {
        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).json({ error: "Usuário já encontrado na base de dados!" });
        }
        
        /*const client = require('twilio')(accountSid, authToken);
        const numbersent="+55-"+ req.body.link_whats;
        client.messages.create({
        to: numbersent,
        from: "+19282125624",
        body: 'AGORA VOCÊ É USUÁRIO NOVAMUSIC! BORA MOSTRAR SEU TALENTO!'
        }).catch(err => console.log(err));*/

        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
              user: 'novamusicna@gmail.com',
              pass: 'novamusicifms'
            }
          }));
          
          var mailOptions = {
            from: 'novamusicna@gmail.com',
            to:  req.body.email ,
            subject: 'NOVA MUSIC',
            html: '<img src="https://lh3.googleusercontent.com/a-/AOh14GhoVJCc7Joh5HHxaHCBP57zRAyg_9OHVul2FhCK=s288-p-rw-no"></img><h1>Agora você é usuário NOVA MUSIC! Bora mostrar seu talento!</h1><p>Qualquer dúvida basta responder este e-mail e será dado todo suporte! </p>'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });  
        const user = await User.create(req.body);
        const category = await Category.updateMany( { _id:req.body.category},{$push:{s: user._id }});
        return res.json({user, token: generateToken({id: user.id})});
    },
    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json(user);
    }, 
    async updateViews(req, res) {
      const userViews = await User.findOne({_id: req.params.id});
      req.body.views= parseInt(userViews.views)+1;

      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(user);
  }, 
    async reaginAccess(req, res) {
      const user = await User.findOne({email: req.params.email});
      const hash = await bcrypt.hash(req.body.password,10);
      req.body.password = hash;
      const userUpdate = await User.findByIdAndUpdate(user._id, req.body, { new: true });
      return res.json({userUpdate, token: generateToken({id: user.id})});
    }, 
    async list(req, res){
        const user= await User.find();
        return res.json(user);
    },
    async destroy(req, res){
        const user= await User.deleteOne({_id: req.params.id});
        return res.json({message:"Usuário removido do banco de dados!"});
    },
    async finduser(req,res){
        const user= await User.find({_id: req.params.id});
        return res.json(user);
    },
    async findusercategory(req,res){
        const user= await User.find({category: req.params.category}).populate("users");
        return res.json(user);

    },
    async submitEmailRegainAccess(req,res){
      const codigo = Math.round(Math.random() * 4000);
      const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: 'novamusicna@gmail.com',
          pass: 'novamusicifms'
        }
      }));
      
      const mailOptions = {
        from: 'novamusicna@gmail.com',
        to:  req.body.email ,
        subject: 'NOVA MUSIC',
        html: '<img src="https://lh3.googleusercontent.com/a-/AOh14GhoVJCc7Joh5HHxaHCBP57zRAyg_9OHVul2FhCK=s288-p-rw-no"></img><h1>SEU CÓDIGO DE RECUPERAR ACESSO NO NOVAMUSIC É :</h1>'+codigo
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });  

      return res.json(codigo);

      
    },
    async finduserstylemusic(req,res){
        const user= await User.find({style_music: req.params.style_music}).populate("users");
        return res.json(user);

    },
}
