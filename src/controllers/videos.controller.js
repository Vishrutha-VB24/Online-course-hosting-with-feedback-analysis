function handleList(req,res){
    let arr = ['Apple','Manago'];
    return res.json({arr});
}



export { handleList }