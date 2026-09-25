import Service from "../models/laundryService.model.js";
const createService = async (req, res, next) => {
    try{
        const{name, description, price, unit} = req.body;
        if(!name || !description || price === undefined || unit === undefined) {
            return res.status(400).json({message: "Please provide the name, description and price"})
        }

        const service = await Service.create({
            name,
            description,
            price,
            unit
        })

        return res.status(201).json({
            success: true,
            message: "Service created successfully"
        })
    }catch(err){
        next(err);
    }
}


// get all services
const getServices = async (req, res, next) => {
    try{
        const services = await Service.find();
        if(services.length === 0) {
            return res.status(404).json({message: "Services not found"})
        }
        return res.status(200).json({
            success: true,
            message: "Services fetched successfully",
            count: services.length,
            services
        })
    }catch(err){
        next(err)
    }
}

// get one service
const getService = async (req, res, next) => {
    try{
        const { id } = req.params;
        const service = await Service.findOne({ _id: id });
        if(!service){
            return res.status(404).json({message: "Service not found"})
        }
        return res.status(200).json({
            success: true,
            message: "Service fetched successfully",
            service
        })
    }catch(err){
        next(err) 
    }
}

// update service
const updateService = async (req, res, next) => {
    try{
        const {id} = req.params;
        const {name, description, price, unit} = req.body;
        const service = await Service.findByIdAndUpdate(
            id, 
            {name, description, price, unit},
            {returnDocument: "after", runValidators: true}
        )
        if(!service){
            return res.status(404).json({message: "Service not found"});
        }
        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            service
        })
    }catch(err){
        next(err)
    }
}

const deleteService = async (req, res, next) => {
    try{
        const {id} = req.params;
        const service = await Service.findByIdAndDelete({_id: req.params.id})
        if(!service) {
            return res.status(404).json({message: "Service not found"})
        }
        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
            service
        })
    }catch(err){
        next(err)
    }
}

export {
    createService,
    getServices,
    getService,
    updateService,
    deleteService
};