const { Item } = require('../models/items');

let ItemsList = async (req,res)=>{
    let items = {};
    items = await Item.find({});
    res.render('index', {items, owner: false});
}

let RenderReportPage = (req,res)=>{
    res.render('report');
}

let PostItems = async (req,res)=>{
    if (!req.body) throw new ExpressError (400,"send valid & complete data");
    let { item, questions } = req.body;
    let newItem = new Item ({
        ...item,
        questions: questions,
    });
    if (req.file && typeof req.file != undefined) {
        newItem.image = req.file.path;
    }
    newItem.reporter = req.user._id;
    await newItem.save();
    req.flash ('success','New Item Reported !');
    res.redirect('/dashboard');
}

let LocationFilter = async(req,res)=>{
    if (req.query.location!="anywhere") {
        console.log(req.query.location);
        let filter_location = req.query.location;
        items = await Item.find({location: filter_location});
        if (items.length === 0) {
            req.flash ('error','No Item Reported at this location');
            res.redirect('/items');
        }
        else {
            res.render('index.ejs',{items, owner: false});
        }
    }
    else {
        res.redirect('/items');
    }
}

let ItemRender = async (req,res)=>{
    let {id} = req.params;
    let item = await Item
                    .findById(id)
                    .populate('claims');
    if (!item) {
        req.flash ('error',"The Item you requested does not exist");
        res.redirect('/items');
    }                    
    res.render ('item',{item, owner: true});
}

let EditItem = async (req,res)=>{
    let {id} = req.params;
    let item = await Item.findById(id);
    if (!item) {
        req.flash ('error',"The Item you requested does not exist");
        res.redirect('/items');
    }
    res.render ('edit',{item, owner: true});
}

let UpdateItem = async (req,res)=>{             
        if (!req.body) throw new ExpressError (400,"send valid & complete data");
        let { item, questions } = req.body;
        let { id } = req.params;
        if (req.file && typeof req.file != undefined) {
            newItem.image = req.file.path;
        }
        await Item.findByIdAndUpdate (id, {...item, questions: questions});
        res.redirect('/items');
    }

let DeleteItem = async (req,res)=>{
    let { id } = req.params;
    let item = await Item.findById(id);
    if (!item) {
        req.flash ('error',"The Item you requested does not exist");
        res.redirect('/items');
    }
    let claims = await Claim.deleteMany({_id: {$in: item.claims}});
    await Item.deleteOne({ _id: id });
    req.flash ('success','Item Deleted (Owner Found) !');
    res.redirect('/items');
}

module.exports = {ItemsList,PostItems,LocationFilter,RenderReportPage,ItemRender,UpdateItem,DeleteItem,EditItem}