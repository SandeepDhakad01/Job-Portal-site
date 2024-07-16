import multer from "multer"


const storage=multer.diskStorage({
    //destination-> file kaha(kis folder me) save krni h (diskStorage me) 
    destination:function(req,file,cb){
        cb(null,'./public/temp')
    }                
    ,                 // filename -> file ko kis naam se save karna h...
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'_'+ Math.round(Math.random()*1E9)

       cb(null,file.fieldname+'_'+uniqueSuffix)
    }
})


export const upload =multer({
    storage
})

// const storage = multer.memoryStorage();

// export const upload = multer({ storage });