/**
 * @class InvertedIndex
 */
class InvertedIndex {
  /**
   * @constructor
   */
  constructor() {
    this.indices = [];
    this.errorMessage = '';
  }

  /**
   * GetIndex
   * Gets the index of the files uploaded
   * @param {any} filename
   * @returns {any} void
   */
  getIndex(filename) {
    return this.indices[filename];
  }

  /**
   * validateDoc
   * Checks that the uploaded file is valid
   * @param {any} parseDoc
   * @returns {boolean} result
   * @memberOf InvertedIndex
   */
  validateDoc(parseDoc) {
    const isJSONObject = (typeof parseDoc === 'object');
    const isNotEmpty = parseDoc.length > 0;
    if (!isNotEmpty) {
      this.errorMessage = 'the file is empty';
    }
    let isValidStructure = true;
    parseDoc.map((file) => {
      if (!file.title ||
        typeof file.title !== 'string' ||
        !file.text ||
        typeof file.text !== 'string') {
        isValidStructure = false;
      }
    });
    if (!isValidStructure) {
      this.errorMessage = 'the file structure is invalid';
    }

    return isJSONObject && isNotEmpty && isValidStructure;
  }


  /**
   * Create index
   * Create index takes single document param
   * and builds an index from it
   * @param {any} filename
   * @param {any} document
   * @returns {any} result
   */
  createIndex(filename, document) {
    const index = {};
    if (this.validateDoc(document)) {
      document.map((sentence, count) => {
        `${sentence.title} ${sentence.text}`
        .replace(/[^A-Za-z0-9\s]/g, '')
          .toLowerCase()
          .split(' ')
          .map((word) => {
            if (index[word] && index[word].indexOf(count) === -1) {
              index[word].push(count);
            } else {
              index[word] = [count];
            }
          });
      });
      this.indices[filename] = index;
      return index;
    }
    return this.errorMessage;
  }

  /**
   * Search method
   * Searches key words from the files that has been uploaded
   * @param {any} filenames
   * @param {any} terms
   * @returns {object} Documents
   */
  searchIndex(filenames, ...terms) {
    filenames = filenames || Object.keys(this.indices);
    const result = {};
    const searchTerms = terms.flatten();

    // eslint-disable-next-line prefer-const
    for (let searchTerm of searchTerms) {
      result[searchTerm] = {};
      // eslint-disable-next-line prefer-const
      for (let index of filenames) {
        result[searchTerm][index] = this.search(index, searchTerm);
      }
    }
    return result;
  }

  /**
   * @param {Object} index
   * @param {String} term
   * @returns {Array} result
   * @memberOf InvertedIndex
   */
  search(index, term) {
    return this.indices[index][term] ? this.indices[index][term] : [];
  }
}

Array.prototype.flatten = function flatten() {
  let flat = [];
  for (let i = 0, l = this.length; i < l; i++) {
    const type = Object.prototype.toString
      .call(this[i]).split(' ').pop().split(']')
      .shift()
      .toLowerCase();
    if (type) {
      flat = flat.concat(/^(array|collection|arguments|object)$/
        .test(type) ? flatten.call(this[i]) : this[i]);
    }
  }
  return flat;
};

if (typeof module === 'object' && module.exports) {
  module.exports = InvertedIndex;
}
