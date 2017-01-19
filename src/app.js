(function(){
const app = angular.module('inverted-index',['angularjs-dropdown-multiselect']);
//console.log(InvertedIndex);

app.filter('getLength', function(){
return function(input){
  console.dir(input);
  // return input.length;
};
});



app.directive('uploadfile', () => {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: (scope, elem, attrs, ngModel) => {
      if (!ngModel){ return; }
      elem.bind('change', (event)=>{
        const isValid = event.target.files[0].name.indexOf(".json") > 0;
        if(!isValid){
          alert("Please upload a valid json file");
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          scope.$apply(()=>{
            const file = loadEvent.target.result;
            ngModel.$setViewValue({
              fileName: event.target.files[0].name,
              document: file
            });
          });
        };
        reader.readAsText(event.target.files[0]);
      });
    }
  };
});

app.controller('UploadFileController', ['$timeout', '$scope', function($timeout, $scope) {
  this.fileObject = null;
  this.files = [];
  this.fileNames = [];
  this.indices = {};
  this.myIndex = new InvertedIndex();
  this.selectedFiles = [];
  this.searchTerms = "";

  this.createIndex = function(fileIndex){
    const fileName = this.fileNames[fileIndex];
    const file = this.files[fileIndex];
    const result = this.myIndex.createIndex(fileName,file);
    if(typeof result === "object"){
      this.indices[fileName] = result;
    }else{
      alert(result);
    }
    console.log(this.indices);
  };

  this.search = function(){
    const indices = this.selectedFiles;
    this.searchTerms = this.searchTerms.split(" ");
    const result = this.myIndex.searchIndex(indices,this.searchTerms);
    console.log(result);
  }

  $scope.$watch('files.fileObject', (newVal, oldVal) => {
    if(newVal){
      try{
        const parsedFile = JSON.parse(newVal.document);
        parsedFile.map(file=>{
          if(!file.title || !file.text){
            alert('Please upload a properly formatted file');
            return;
          }
        });
        this.files.push(parsedFile);
      this.fileNames.push(newVal.fileName);
      }catch(err){
        alert("Please upload a valid json file");
          return;
      }
      this.fileObject = null;
    }
  });

    $scope.getFileNamesSizeAsArray = function($index){
      const arr = [];
      for(i = 0; i < $scope.files[$index].length; i++){
        arr.push(i);
      }
      return arr;
    };
}]);

})();
