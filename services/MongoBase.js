class MongoBase {
    BaseModel = null;
  
    constructor(model) {
      this.BaseModel = model;
    }
  
    create = (data) => {
      return this.BaseModel.create(data);
    };
  
    find = ({ filter = {}, skip = 0, limit = 0, sort = '', select = '', populate = '' }) => {
      return this.BaseModel.find(filter).sort(sort).skip(skip).limit(limit).select(select).populate(populate);
    };

    findById = ({ id, select = '', populate = '' }) => {
        return this.BaseModel.findById(id).select(select).populate(populate);
    };
  
    findOne = ({ filter, select = '', populate = '', sort = {} }) => {
      return this.BaseModel.findOne(filter).sort(sort).select(select).populate(populate);
    };

    findOneById = ({ id, select = '', populate = '' }) => {
        return this.BaseModel.findOneById(id).select(select).populate(populate);
    };
  
    // rerun a document
    findOneAndUpdate = ({ filter, update, select = '', populate = '', sort = {}, isNew = true, upsert = false }) => {
      return this.BaseModel.findOneAndUpdate(filter, update, {
        new: isNew ? true : false,
        upsert: upsert ? true: false
      }).sort(sort).populate(populate).select(select);
    };

    deleteOne = ({ filter }) => {
        return this.BaseModel.deleteOne(filter);
    };
  
    deleteOneById = ({ id }) => {
        return this.BaseModel.findByIdAndDelete(id).exec();
    };

    deleteMany = ({ filter }) => {
        return this.BaseModel.deleteMany(filter);
    };

    distinct = ({ filter, key }) => {
        return this.BaseModel.distinct(key, filter);
    };

    // return a info
    updateOne = ({ filter, update }) => {
      return this.BaseModel.updateOne(filter, update, {
        upsert: true,
        runValidators: true,
      });
    };

    updateOneById = ({ id, update }) => {
      
        return this.BaseModel.findByIdAndUpdate(id, update);
    };
  
    updateMany = ({ filter, update }) => {
      return this.BaseModel.updateMany(filter, update);
    };
  
    get modelKeys() {
      return Object.keys(this.BaseModel.schema.obj);
    }
  
    get model() {
      return this.BaseModel;
    }
}
  
module.exports = MongoBase;