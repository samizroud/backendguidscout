const express = require("express")
const router = express.Router()
const { Notification } = require("../model/NotificationModel")
const { User } = require("../model/userModel")


router.post("/new", async (req, res) => {

        tabU = []

      let cre = await User.find({ _id: req.body.createur })
        let users = await User.find()
        users.filter(x => {
             x.category.find(r => {

                if (req.body.dest.includes("" + r + "")) {
                    // console.log(x)
                    tabU.push(x)
                }
            })

        })
        tabU.forEach(element => {

          if(req.body.createur != element._id){
            const notif = new Notification({
                idUser: element._id,
                titre: req.body.titre,
                description: req.body.description,
                createur: cre[0],
                source: req.body.source,
                etat: false,
                created_at: new Date(),
            })
            notif.save()
          }
        })
        let n={
            
            titre: req.body.titre,
            description: req.body.description,
            createur: cre[0],
            source: req.body.source,
            etat: false,
            created_at: new Date()
        }
        return res.status(200).send({ status: true, resultat:n , dest: tabU})
 });

router.get('/get/:idUser', async (req, res) => {

    try {
        var result = await Notification.find({ idUser: req.params.idUser })
        .sort({ created_at: -1 })
        res.send(result)
} catch (error) {
        return res.status(400).send({ status: false, message: error._message });

    }
})


router.put("/update/:id", async (req, res) => {

    const result = await Notification.findByIdAndUpdate(req.params.id, {
        $set: { etat: true }
    }, { new: true }
    )
    return res.send({ status: true, resultat: result })
})
module.exports.notifRoute = router