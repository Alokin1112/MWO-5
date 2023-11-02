package ds.pamiw.backend.services;

import ds.pamiw.backend.dto.BookDTO;
import ds.pamiw.backend.models.Author;
import ds.pamiw.backend.models.Book;
import ds.pamiw.backend.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookDTOConverterService {

    private final AuthorRepository authorRepository;

    @Autowired
    public BookDTOConverterService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Book convert(BookDTO bookDTO) {
        if(bookDTO.getAuthor_id()==null) {
            throw new IllegalArgumentException("Missing author ID");
        }
        Optional<Author> author = authorRepository.findById(bookDTO.getAuthor_id());
        if(author.isEmpty()){
            throw new IllegalArgumentException("Wrong author ID");
        }
        Book book = new Book(bookDTO.getTitle(),author.get(),bookDTO.getPageCount(),bookDTO.getPrice(), bookDTO.getPhotoUrl());
        return book;
    }
}
