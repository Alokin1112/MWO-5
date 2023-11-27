package ds.pamiw.backend.services;

import ds.pamiw.backend.models.Book;
import ds.pamiw.backend.repositories.BookRepository;
import ds.pamiw.backend.shared.PaginableResposne;
import ds.pamiw.backend.shared.Pagination;
import ds.pamiw.backend.shared.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }


    public ServiceResponse<PaginableResposne<List<Book>>> getBooks(Pagination pagination) {
        try {
            Pageable pageable = PageRequest.of(pagination.page, pagination.take, Sort.by(Sort.Order.asc("id")));
            Page<Book> bookPage = bookRepository.findAll(pageable);

            List<Book> bookList = bookPage.getContent();
            int totalPages = bookPage.getTotalPages();

            return new ServiceResponse<PaginableResposne<List<Book>>>(new PaginableResposne<List<Book>>(bookList,totalPages), true, "Books got");
        } catch (Exception e) {
            return new ServiceResponse<PaginableResposne<List<Book>>>(null, false, "Error fetching books");
        }
    }

  public ServiceResponse<Book> getBookById(Long id) {
    Optional<Book> bookById = bookRepository.findById(id);
    if (!bookById.isPresent()) {
      return new ServiceResponse<Book>(null, false, "Book is not in db");
    }
    return new ServiceResponse<Book>(bookById.get(), true, "Success");
  }

    public ServiceResponse<Book> addBook(Book book) {
        if (book.getId() != null) {
            Optional<Book> bookById = bookRepository.findById(book.getId());
            if (bookById.isPresent()) {
                return new ServiceResponse<Book>(null, false, "Book is already in db");
            }
        }
        try {
            bookRepository.save(book);
            return new ServiceResponse<Book>(book, true, "Book added");
        } catch (Exception e) {
            return new ServiceResponse<Book>(null, false, "Error during adding book");
        }
    }

    public ServiceResponse<Book> deleteBook(Long id) {
        Optional<Book> bookById = bookRepository.findById(id);
        if (!bookById.isPresent()) {
            return new ServiceResponse<Book>(null, false, "Book is not in db");
        }
        try {
            bookRepository.deleteById(id);
            return new ServiceResponse<Book>(null, true, "Book deleted");
        } catch (Exception e) {
            return new ServiceResponse<Book>(null, false, "Error during deleting book");
        }
    }

    public ServiceResponse<Book> updateBook(Book book, Long id) {
        Optional<Book> bookById = bookRepository.findById(id);
        if (!bookById.isPresent()) {
            return new ServiceResponse<Book>(null, false, "Book is not in db");
        }
        book.setId(id);
        try {
            bookRepository.save(book);
            return new ServiceResponse<Book>(book, true, "Book updated");
        }catch (Exception e) {
            return new ServiceResponse<Book>(null, false, "Error while updating book");
        }
    }
}
