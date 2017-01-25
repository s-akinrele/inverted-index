if (typeof InvertedIndex === 'undefined') {
  // eslint-disable-next-line global-require
  InvertedIndex = require('../src/inverted-index.js');
}

const books = {
  correct: [{
    title: 'Alice in Wonderland',
    text: 'Alice falls into a rabbit hole and enters a world full of imagination.'
  }, {
    title: 'The Lord of the Rings: The Fellowship of the Ring.',
    text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }],
  wrong: [{
    name: 'Alice in Nigeria',
    text: 'Alice went to Ikeja City Mall.'
  }, {
    name: 'The Lord of the Rings: The Fellowship of the Ring.',
    text: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
  }],
  newdoc: [{
    title: 'Simisola Akinrele',
    text: 'Lives in Nigeira.'
  }, {
    title: 'Andela',
    text: 'Become a world class developer at Andela.'
  }]
};

describe('Test suite for Inverted Index', () => {
  const index = new InvertedIndex();
  const myIndex = index.createIndex('books.json', books.correct);
  index.createIndex('newfile.json', books.newdoc);
  describe('Read book data', () => {
    it('Should confirm that the file is a JSON file', () => {
      expect(index.validateDoc(books.correct)).toBe(true);
      expect(index.validateDoc(books.wrong)).toBe(false);
    });
    it('Should confirm that the JSON file is not Empty', () => {
      expect(index.validateDoc(books.correct)).toBe(true);
      expect(index.validateDoc(books.wrong)).toBe(false);
    });
    it(`Should ensure each object in JSON array
        contains a property whose value is a string.
        `, () => {
      expect(index.validateDoc(books.correct)).toBe(true);
    });
  });

  describe('Populate Index', () => {
    const mykeys = Object.keys(myIndex);

    it('Should ensure index is created once JSON file has been read', () => {
      expect(typeof myIndex).toBe('object');
      expect(Array.isArray(myIndex)).toBe(false);
    });
    it('Should ensure index is correct.', () => {
      expect(myIndex.alice).toEqual([0]);
      expect(myIndex.a).toEqual([0, 1]);
      expect(myIndex.a).not.toEqual([2]);
    });
    it(`Should ensure each object in JSON array 
    contains a property whose value is a string.`, () => {
      for (let i = 0; i < mykeys.length; i++) {
        expect(typeof mykeys[i]).toBe('string');
      }
    });
    it('Should ensure index is not overwritten by a new JSON file.', () => {
      expect(Array.isArray(index.indices['books.json'])).toBe(false);
      expect(Array.isArray(index.indices['newfile.json'])).toBe(false);
      expect(typeof index.indices['books.json']).toBe('object');
      expect(typeof index.indices['newfile.json']).toBe('object');
    });
  });

  describe('Search Index', () => {
    const searchResult = index.searchIndex(['books.json'], 'a');
    it('Should ensure index returns the correct results when searched.', () => {
      expect(searchResult.a['books.json']).toEqual([0, 1]);
    });
    const arrayResult = index.searchIndex(['books.json'], ['unusual', 'alice']);
    it('Should ensure searchIndex can handle an array of search terms.', () => {
      expect(arrayResult.unusual['books.json']).toEqual([1]);
      expect(arrayResult.alice['books.json']).toEqual([0]);
    });

    const variedResult = index
      .searchIndex(['books.json'], 'the', 'lord', 'man');
    it(`Should ensure searchIndex can handle 
        a varied number of search terms as arguments.`, () => {
      expect(variedResult.the['books.json']).toEqual([1]);
      expect(variedResult.lord['books.json']).toEqual([1]);
      expect(variedResult.man['books.json']).toEqual([1]);
    });

    it('Should ensure search does not take too long to execute.', () => {
      const start = Date.now();
      index.searchIndex(['books.json'], 'alice', 'the', 'man');
      const end = Date.now();
      const final = end - start;
      expect(final).toBeLessThan(0.5);
    });
    it(`Should ensure searchIndex goes through all indexed files if a filename 
        is not passed, i.e filename argument should be made optional`, () => {
      const searchall = index.searchIndex(null, 'the', 'lord', 'man');
      expect(searchall.the['books.json']).toEqual([1]);
      expect(searchall.lord['books.json']).toEqual([1]);
      expect(searchall.man['books.json']).toEqual([1]);
    });
  });

  describe('Get Index', () => {
    it(`Should ensure getIndex method takes a string
     argument that specifies the location of the JSON data.`, () => {
      const search = index.getIndex('books.json');
      expect(Array.isArray(search)).toBe(false);
      expect(typeof search).toBe('object');
    });
  });
});
