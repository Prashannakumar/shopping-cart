const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongodb = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();

app.use(cors());

app.use(bodyparser.json());

var db;
// var dbUri = gopi:gopi@mycluster.csmbn.mongodb.net/shoppingcartjuly8am?retryWrites=true&w=majority
mongodb.connect("mongodb+srv:"+dbUri, (error, database)=>{

    if(!error)
    {
      db = database.db("shoppingcartjuly8am");
      console.log("DB Connected");
    }
    else {
        console.log("DB Not Connected");
    }
})

var products = [{pdtName:"Knorr Instant Soup (100 Gm)", pdtPrice:78, pdtImgPath:"http://localhost:4200/assets/images/5.png"},
{pdtName:"Chings Noodles (75 Gm)", pdtPrice:100, pdtImgPath:"http://localhost:4200/assets/images/6.png"},
{pdtName:"Lahsun Sev (150 Gm)", pdtPrice:50, pdtImgPath:"http://localhost:4200/assets/images/7.png"},
{pdtName:"Premium Bake Rusk (300 Gm)", pdtPrice:56, pdtImgPath:"http://localhost:4200/assets/images/8.png"}];

app.use((req, res, next)=>{         // common for all the path

    console.log("Middleware 1");
    next();
});

app.use("/home", (req, res, next)=>{

    console.log("Middleware 2");
    next();
});

function verifyUser(req, res, next){

    console.log("User Verified");

    next();
}


app.get("/", (req, res)=>{

    var data = {name:"gopi", age:77};

    console.log("Index Page");
   // res.send("<h1>Welcome to Expresss</h1>");

  // res.send(data);

  res.json(data);

});

app.get("/home", verifyUser, (req, res)=>{

    console.log("Home Page");
    res.json("Welcome to Homepage");
});

app.get("/listproducts", (req, res)=>{

   // res.json(products);

   db.collection("products").find().toArray((error, data)=>{

    res.json(data);
});

});

app.get("/getcategories", (req, res)=>{

    db.collection("categories").find().toArray((error, data)=>{

        res.json(data);
    });
});

app.post("/register", (req, res)=>{

    console.log(req.body);

    req.body._id = new Date().getTime();

    db.collection("users").insert(req.body, (error, data)=>{

        if(error)
        {
            console.log(error);
            res.status(403).json("Error in Insert query");
        }
        else {
            res.json("User Registered Successfully");
        }


    });

    

});

app.post("/login", (req, res)=>{

    console.log(req.body);

    db.collection("users").find(req.body, {projection : {_id : 1, Username : 1}}).toArray((error, data)=>{

        var token = '';

        if(data.length > 0)
        {
            token = jwt.sign(data[0], "myseckey");
        }

        res.json(token);
    });

    //res.json("User Loggedin");

});

var loggeduser;

function verifyToken(req, res, next)
{
    var token = req.headers.myauthtoken;

    if(!token)
    {
      return  res.status(401).json("No token found");
    }

    jwt.verify(token, "myseckey", (error, data)=>{

        if(error)
        {
            console.log(error);

            return res.status(401).json("Token Mismatch");
        }

        loggeduser = data;

    });

    next();
}

app.get("/mycart", verifyToken, (req, res)=>{

    db.collection("cart").aggregate([
        { $match: { cartUserId: loggeduser._id } },
            { $lookup:
               {
                 from: 'products',
                 localField: 'cartPdtId',
                 foreignField: '_id',
                 as: 'orderdetails'
               }
             }
            ]).toArray((err, data)=> {
           
                res.json(data);
          });
        
        
});

const myStorage = multer.diskStorage({
    destination : (req, file, cb)=>{

        cb(null, "src/assets/product_images");
    },
    filename : (req, file, cb)=>{

        cb(null, file.originalname+"-"+new Date().getTime()+".png");
    }
});

app.post("/addproducts", verifyToken, multer({storage : myStorage}).single("pdtImg"), (req, res)=>{

    req.body._id = new Date().getTime();
    req.body.pdtCatId = Number(req.body.pdtCatId);
    req.body.pdtPrice = Number(req.body.pdtPrice);
    req.body.pdtImgPath = req.file.filename;

    console.log(req.body);

    db.collection("products").insert(req.body, (error, data)=>{

        res.json("Product Added Successfully");

    });    

});

app.post("/addtocart", verifyToken, (req, res)=>{

    req.body._id = new Date().getTime();
    req.body.cartQty = 1;
    req.body.cartUserId = loggeduser._id;

    console.log(req.body);

    db.collection("cart").insert(req.body, (error, data)=>{

        res.json("Cart Item Added Successfully");

    }); 

    
});

app.get("/cartcount", verifyToken, (req, res)=>{

    db.collection("cart").count({cartUserId : loggeduser._id}, (error, data)=>{

        res.json(data);
    });

});

app.get("/getpdtcatwise/:catid", (req, res)=>{

    console.log(req.params);

    db.collection("products").find({pdtCatId : Number(req.params.catid)}).toArray((error, data)=>{
        res.json(data);
    });

});

app.put("/updatecart", verifyToken, (req, res)=>{

    var condition = {_id: req.body.cartdId};

    var newValues = {$set: {cartQty: req.body.cartQty, cartPdtPrice: req.body.cartQty*req.body.pdtPrice}};

    db.collection("cart").update(condition, newValues, (error, data)=>{

        res.json("Cart item updated Successfully");
    });

});

app.delete("/removecart/:cartid", verifyToken, (req, res)=>{

    db.collection("cart").deleteOne({_id : Number(req.params.cartid)}, (error, data)=>{

        res.json("Cart Item Removed Successfully");

    });

});

module.exports = app;