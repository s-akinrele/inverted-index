 //const docs = require('./books');
//A test suite to read data from books
describe('Test suite for Inverted Index', () => {
  //create an object of the Inverted Index class
    const index = new InvertedIndex();
    const emptyDoc = [];
    const sentence = "This# is@ a Sample *sentence &with some some ^dirt";
    const multSearchTerms = "An Alice man tormented market";

  //create an Inverted Index for the file
      index.createIndex(docs);
     describe('Read book data', () => {
          it('Should confirm that the file is a JSON file', () => {
            expect(index.createIndex('books.json',)).toBe('JSON file is empty');
          });

          it('Should confirm that a non-empty file is not empty', () => {
            expect(index.createIndex(docs)).not.toBe('JSON file is not empty');
          });

          it('Should have the getIndex method defined', () => {
            expect(theIndex.getIndex).toBeDefined();
          });
        });

  describe('Test for the cleaning function', () => {
    it('Should return an array of strings', () => {
      expect(InvertedIndex.clean(sentence).constructor).toBe(Array);
    });

    it('Should not contain non-alphanumeric characters', () => {
      expect(InvertedIndex.clean(sentence)).not.toContain(/[#@^&]/g);
    });

    it('Should have the correct number of words', () => {
      expect(InvertedIndex.clean(sentence).length).toBe(9);
    });

    it('Should have the clean method defined', () => {
      expect(InvertedIndex.clean).toBeDefined();
    });

    describe('Test for removing duplicates', () => {
      it('Should not contain duplicate words', () => {
        let testArray = InvertedIndex.removeDuplicates(InvertedIndex.clean(sentence));
        expect(testArray.length).toBe(new Set(testArray).size);
      });

      it('Should have the removeDuplicates method defined', () => {
        expect(InvertedIndex.removeDuplicates).toBeDefined();
      });
    });



    describe('Populate Index', () => {
      it('Should verify Index is created', () => {
        expect(theIndex.index.alice).toBeDefined();
      });

      it('Should map words to correct docs', () => {
        expect(theIndex.index.alice).toEqual([1]);
        expect(theIndex.index.a).toEqual([1, 2, 3]);
      });
    });

    describe('Search index', () => {
      it('Should have searchIndex method defined', () => {
        expect(theIndex.searchIndex).toBeDefined();
      });

      it('Should return the correct results', () => {
        expect(theIndex.searchIndex('ring', theIndex.getIndex(docs))).toEqual({'ring':[2]});
      });

      it('Should return the correct results', () => {
        expect(theIndex.searchIndex('an', theIndex.getIndex(docs))).toEqual({'an':[2, 4]});
      });

      it('Should return correct results for multiple search', () => {
        expect(theIndex.searchIndex(multSearchTerms, theIndex.getIndex(docs))).toEqual({
          'alice': [1],
          'an': [2, 4],
          'man': [2],
          'market': 'Word not found!',
          'tormented': [3]
        });
      });

      //write test for search time
    });
  });
});