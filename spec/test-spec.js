const InvertedIndex = require('../src/inverted-index.js');
console.log(InvertedIndex, 'here');
const docs =[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];
describe('Test suite for Inverted Index', () => {
 const index = new InvertedIndex();

    describe('Read book data', ()=>{
       it('Should confirm that the file is a JSON file', () => {
          expect(index.validateDoc(docs)).toBe(true);
       });
       it('Should confirm that the JSON file is not Empty', ()=>{
          expect(index.validateDoc(docs)).toBe(true);
       });
        it('Should ensure each object in JSON array contains a property whose value is a string.', ()=>{
          expect(index.validateDoc(docs)).toBe(true);
       });
    });

    describe('Populate Index',()=>{
       it('Should ensure index is created once JSON file has been read',()=>{
          expect(index.createIndex('books.json',docs)).toBeDefined();
       });

    });
});