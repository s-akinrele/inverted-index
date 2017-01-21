class InvertedIndex {
  constructor() {
   this.indices = [];
   this.errorMessage= "";
  }

  getIndex(filename){
    return this.indices[filename];
  }

  validateDoc(parseDoc){
    let isJSONObject = (typeof parseDoc === "object");
    let isNotEmpty = parseDoc.length > 0;
    if(!isNotEmpty){
     this.errorMessage = 'the file is empty';
    }

    let isValidStructure = true;
    parseDoc.map(file => {
      if (!file.title ||
          typeof file.title !== 'string' ||
          !file.text ||
          typeof file.text !== 'string'){
        isValidStructure = false;
      }
    });
    if(!isValidStructure){
      this.errorMessage = 'the file structure is invalid';
    }

    return isJSONObject && isNotEmpty && isValidStructure;
  }

  createIndex(filename, document){
    let index = {};
    if(this.validateDoc(document)){
      document.map((sentence, count)=>{
       `${sentence.title} ${sentence.text}`
       .replace(/[^A-Za-z0-9\s]/g,'')
       .toLowerCase()
       .split(" ")
       .map(word=>{
         if(index[word] && index[word].indexOf(count) === -1){
           index[word].push(count);
         }else{
           index[word] = [count];
         }
       });
     });
      this.indices[filename] = index;
     return index;
      }
    return this.errorMessage;
  }

  searchIndex(indicesParam,...args){
  indicesParam = indicesParam ? indicesParam : Object.keys(this.indices);
  const result = {};
  const searchTerms = args.flatten();
  //console.log(indicesParam, searchTerms);
  for(let searchTerm of searchTerms){
    result[searchTerm] = {};
    for(let index of indicesParam){
      // console.log(index,searchTerm);
      result[searchTerm][index] = this.search(index,searchTerm);
    }
  }
  return result;
}

search(index,term){
  return this.indices[index][term] ? this.indices[index][term] : [];
}
}

// extends the array object
Array.prototype.flatten = function flatten(){
   let flat = [];
   for (let i = 0, l = this.length; i < l; i++){
       const type = Object.prototype.toString.call(this[i]).split(' ').pop().split(']').shift().toLowerCase();
       if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten.call(this[i]) : this[i]); }
   }
   return flat;
};

//
if(typeof module === "object" && module.exports) {
  module.exports = InvertedIndex;
}

