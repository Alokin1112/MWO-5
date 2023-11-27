package ds.pamiw.backend.controllers;

import ds.pamiw.backend.dto.BookDTO;
import ds.pamiw.backend.models.Book;
import ds.pamiw.backend.services.BookDTOConverterService;
import ds.pamiw.backend.services.BookService;
import ds.pamiw.backend.shared.PaginableResposne;
import ds.pamiw.backend.shared.Pagination;
import ds.pamiw.backend.shared.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping(path = "api/v1/books")
public class BookController {

    private final BookService bookService;
    private final BookDTOConverterService bookDTOConverterService;

    @Autowired
    public BookController(BookService bookService, BookDTOConverterService bookDTOConverterService) {
        this.bookService = bookService;
        this.bookDTOConverterService = bookDTOConverterService;
    }

    @GetMapping
    public ServiceResponse<PaginableResposne<List<Book>>> getBooks(@RequestParam(required = true) int page, @RequestParam(required = true) int take) {
        if (!(page >= 0 && take > 0)) {
            return new ServiceResponse<>(null, false, "Request params invalid");
        }
        Pagination pagination = new Pagination(page, take);
        return bookService.getBooks(pagination);
    }

  @GetMapping(path = "{bookId}")
  public ServiceResponse<Book> getBookById(@PathVariable("bookId") Long id) {
    if (id == null) {
      return new ServiceResponse<>(null, false, "Wrong id");
    }
    return this.bookService.getBookById(id);
  }

    @PostMapping
    public ServiceResponse<Book> addBook(@RequestBody BookDTO bookDTO) {
        Book book;
        try{
            book = this.bookDTOConverterService.convert(bookDTO);
        }catch (Exception e) {
            return new ServiceResponse<Book>(null,false,"Cannot parse item");
        }
        if (book == null || book.getAuthor() == null || book.getPrice() == null || book.getTitle() == null || book.getPageCount() == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        Book bookToAdd = new Book(book.getTitle(), book.getAuthor(), book.getPageCount(), book.getPrice(), book.getPhotoUrl());
        return bookService.addBook(bookToAdd);
    }

    @DeleteMapping(path = "{bookId}")
    public ServiceResponse<Book> deleteStudent(@PathVariable("bookId") Long id) {
        if (id == null) {
            return new ServiceResponse<>(null, false, "Wrong id");
        }
        return this.bookService.deleteBook(id);
    }

    @PutMapping(path = "{bookId}")
    public ServiceResponse<Book> updateStudent(@RequestBody BookDTO bookDTO, @PathVariable("bookId") Long id) {
        if (bookDTO == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        if (id == null) {
            return new ServiceResponse<>(null, false, "Id can't be null");
        }
        Book book;
        try{
            book = this.bookDTOConverterService.convert(bookDTO);
        }catch (Exception e) {
            return new ServiceResponse<Book>(null,false,"Cannot parse item");
        }
        return bookService.updateBook(book, id);
    }

}
