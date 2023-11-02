package ds.pamiw.backend.controllers;

import ds.pamiw.backend.models.Author;
import ds.pamiw.backend.services.AuthorService;
import ds.pamiw.backend.shared.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/authors")
public class AuthorController {

    private final AuthorService authorService;

    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping()
    public ServiceResponse<List<Author>> getAuthors() {
        return authorService.getAuthors();
    }

    @PostMapping
    public ServiceResponse<Author> addAuthor(@RequestBody Author author) {
        if (author == null || author.getFirstName() == null || author.getLastName() == null) {
            return new ServiceResponse<>(null, false, "Body is missing or invalid");
        }
        return authorService.addAuthor(author);
    }

    @PutMapping(path = "{authorId}")
    public ServiceResponse<Author> updateAuthor(@RequestBody Author author, @PathVariable("authorId") Long id) {
        if (author == null) {
            return new ServiceResponse<>(null, false, "Body is missing");
        }
        if (id == null) {
            return new ServiceResponse<>(null, false, "Author id cannot be null");
        }
        return authorService.updateAuthor(author, id);
    }

    @DeleteMapping(path = "{authorId}")
    public ServiceResponse<Author> deleteAuthor(@PathVariable("authorId") Long id) {
        if (id == null) {
            return new ServiceResponse<>(null, false, "Invalid author id");
        }
        return authorService.deleteAuthor(id);
    }
}
