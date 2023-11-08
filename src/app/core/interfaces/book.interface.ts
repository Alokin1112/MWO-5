export interface BookDTO {
  id: number;
  title: string;
  author: AuthorDTO;
  pageCount: number;
  price: number;
  photoUrl?: string;
}


export interface AuthorDTO {
  id: number,
  firstName: string,
  lastName: string,
}

export type Book = Omit<BookDTO, "id">;

export interface EditableBook extends Omit<Book, "author"> {
  author_id: number,
}

export interface BookEditData {
  book: EditableBook,
  id?: number,
}

export type Author = Omit<AuthorDTO, "id">;