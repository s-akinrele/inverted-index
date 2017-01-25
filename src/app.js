/* eslint-disable func-names */
((function () {
  const app = angular.module('inverted-index', [])
    .run(($rootScope) => {
      $rootScope.Utils = {
        keys: Object.keys
      };
    });

  app.directive('uploadfile', () => {
    const obj = {
      restrict: 'A',
      require: '?ngModel',
      link: (scope, elem, attrs, ngModel) => {
        if (!ngModel) { return; }
        elem.bind('change', (event) => {
          const isValid = event.target.files[0].name.indexOf('.json') > 0;
          if (!isValid) {
            Materialize.toast('Please upload a valid json file', 4000);
            return;
          }

          const reader = new FileReader();
          reader.onload = (loadEvent) => {
            scope.$apply(() => {
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
    return obj;
  });

  app.controller('UploadFileController', ['$timeout', '$scope', function ($timeout, $scope) {
    this.fileObject = null;
    this.files = [];
    this.fileNames = [];
    this.indices = {};
    this.myIndex = new InvertedIndex();
    this.selectedFiles = [];
    this.searchTerms = '';
    this.found = {};

    this.createIndex = function (fileIndex) {
      const fileName = this.fileNames[fileIndex];
      const file = this.files[fileIndex];
      const result = this.myIndex.createIndex(fileName, file);
      if (typeof result === 'object') {
        this.indices[fileName] = result;
      } else {
        Materialize.toast(result);
      }
    };

    this.search = function () {
      const indices = this.selectedFiles.length ?
        this.selectedFiles : Object.keys(this.indices);
      this.searchTerms = this.searchTerms
        .replace(/[^A-Za-z0-9\s]/g, '')
        .toLowerCase()
        .split(' ');
      const result = this.myIndex.searchIndex(indices, this.searchTerms);
      this.found = result;
      this.searchTerms = '';
    };

    $scope.$watch('files.fileObject', (newVal) => {
      if (newVal) {
        try {
          const parsedFile = JSON.parse(newVal.document);
          parsedFile.map((file) => {
            if (!file.title || !file.text) {
              throw new Error('format');
            }
          });
          this.files.push(parsedFile);
          this.fileNames.push(newVal.fileName);
        } catch (err) {
          if (err.message === 'format') {
            Materialize.toast('Please upload a properly formatted file', 4000);
          } else {
            Materialize.toast('Please upload a valid json file', 4000);
          }
        }
        this.fileObject = null;
      }
    });
  }]);
})());
