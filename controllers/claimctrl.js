let ClaimRender = async(req,res)=>{
    let {id} = req.params;
    let item = await Item.findById(id);
    res.render('claim',{item});
}

let PostClaim = async(req,res)=>{
    let { claim } = req.body;
    let { id } = req.params;
    let newClaim = new Claim({...claim});
    if (req.file && typeof req.file != undefined) {
        Claim.image = req.file.path;
    }
    let claim_done = await newClaim.save();
    console.log(claim_done);
    let item_current = await Item.findByIdAndUpdate(id,{ $push: {claims: claim_done._id}});
    console.log(item_current);
    res.redirect('/items');
}

module.exports = { ClaimRender, PostClaim }