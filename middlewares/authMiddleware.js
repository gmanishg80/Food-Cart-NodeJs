const JWT =  require('jsonwebtoken');

module.exports = async (req,res,next) => {

    try{
        //get token
        const token = req.headers["authorization"].split(" ")[1];
        // console.log("here1")
        JWT.verify(token, process.env.JWT_SECRET,(err,decode) => {
            if(err){
                // console.log("here2")
                return res.status(401).send({
                    success: false,
                    message: 'Authentication failed'
                })
            }else{
                // console.log("here3")
                req.body.id = decode.id;
                next();
            }
        });

    } catch(err) {
        console.log(err);
        res.status(401).send({
            success: false,
            message: 'Un-Authorized Access denied',
            error: err
        })
    }

}