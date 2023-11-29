import { BookDTO } from "@core/interfaces/book.interface";
import { AUTHORS_MOCK } from "@core/mocks/authors.mock";

export const BOOKS_MOCK: BookDTO[] = [
  { id: 1, title: 'The Shining', author: AUTHORS_MOCK[0], pageCount: 450, price: 29.99, photoUrl: 'url1' },
  { id: 2, title: 'To Kill a Mockingbird', author: AUTHORS_MOCK[1], pageCount: 320, price: 19.99, photoUrl: 'url2' },
  { id: 3, title: '1984', author: AUTHORS_MOCK[1], pageCount: 280, price: 15.99, photoUrl: 'url3' },
  { id: 4, title: 'Pride and Prejudice', author: AUTHORS_MOCK[3], pageCount: 380, price: 24.99, photoUrl: 'url4' },
  { id: 5, title: 'The Catcher in the Rye', author: AUTHORS_MOCK[4], pageCount: 240, price: 17.99, photoUrl: 'url5' },
  { id: 6, title: 'The Hobbit', author: AUTHORS_MOCK[5], pageCount: 320, price: 21.99, photoUrl: 'url6' },
  { id: 7, title: 'The Lord of the Rings', author: AUTHORS_MOCK[6], pageCount: 600, price: 39.99, photoUrl: 'url7' },
  { id: 8, title: 'Harry Potter and the Sorcerers Stone', author: AUTHORS_MOCK[7], pageCount: 400, price: 29.99, photoUrl: 'url8' },
  { id: 9, title: 'The Hunger Games', author: AUTHORS_MOCK[8], pageCount: 320, price: 22.99, photoUrl: 'url9' },
  { id: 10, title: 'The Da Vinci Code', author: AUTHORS_MOCK[9], pageCount: 450, price: 27.99, photoUrl: 'url10' },
  { id: 31, title: 'The Hitchhikers Guide to the Galaxy', author: AUTHORS_MOCK[10], pageCount: 280, price: 18.99, photoUrl: 'url31' },
  { id: 32, title: 'The Great Gatsby', author: AUTHORS_MOCK[11], pageCount: 320, price: 22.99, photoUrl: 'url32' },
  { id: 33, title: 'Brave New World', author: AUTHORS_MOCK[12], pageCount: 400, price: 26.99, photoUrl: 'url33' },
  { id: 34, title: 'Moby Dick', author: AUTHORS_MOCK[13], pageCount: 550, price: 30.99, photoUrl: 'url34' },
  { id: 35, title: 'The Alchemist', author: AUTHORS_MOCK[14], pageCount: 200, price: 14.99, photoUrl: 'url35' },
  { id: 36, title: 'One Hundred Years of Solitude', author: AUTHORS_MOCK[15], pageCount: 420, price: 28.99, photoUrl: 'url36' },
  { id: 37, title: 'The Odyssey', author: AUTHORS_MOCK[16], pageCount: 350, price: 23.99, photoUrl: 'url37' },
  { id: 38, title: 'The Road', author: AUTHORS_MOCK[17], pageCount: 300, price: 20.99, photoUrl: 'url38' },
  { id: 39, title: 'The Chronicles of Narnia', author: AUTHORS_MOCK[18], pageCount: 480, price: 32.99, photoUrl: 'url39' },
  { id: 40, title: 'The Princess Bride', author: AUTHORS_MOCK[19], pageCount: 240, price: 17.99, photoUrl: 'url40' },
];