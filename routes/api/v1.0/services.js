var express = require('express');
var router = express.Router();
var _ = require("underscore");
var Ingred = require("../../../database/collections/ingredients");


//----Metodo POST------ok
router.post("/ingredients", (req, res) => {
  if (req.body.name == "" && req.body.peso == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
  var ingredients = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  var ingredData = new User(ingredients);

  ingredData.save().then( () => {
    res.status(200).json({
      "msn" : "Ingrediente insertado exitosamente "
    });
  });
});

//-----Metodo GET-----ok

router.get("/ingredients", (req, res, next) => {
  Ingred.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});
router.get(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingred.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
});
//-----Metodo de DELETE------ok
router.delete(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  Ingred.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});
//-----Metodo De ACTUALIZACION-----

router.put(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys  = Object.keys(req.body);
  var oficialkeys = ['name', 'kcal', 'peso'];
  var result = _.difference(oficialkeys, keys);
  if (result.length > 0) {
    res.status(400).json({
      "msn" : "Error de Formato.."
    });
    return;
  }

  var ingredients = {
    name : req.body.name,
    kcal : req.body.kcal,
    peso : req.body.peso
  };
  Ingred.findOneAndUpdate({_id: id}, ingredients, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error al actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});
//Metodo PATCH ---> https://tools.ietf.org/html/rfc5789
router.patch(/ingredients\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  var keys = Object.keys(req.body);
  var user = {};
  for (var i = 0; i < keys.length; i++) {
    user[keys[i]] = req.body[keys[i]];
  }
  console.log(ingredients);
  Ingred.findOneAndUpdate({_id: id}, ingredients, (err, params) => {
      if(err) {
        res.status(500).json({
          "msn": "Error al actualizar los datos"
        });
        return;
      }
      res.status(200).json(params);
      return;
  });
});


module.exports = router;
