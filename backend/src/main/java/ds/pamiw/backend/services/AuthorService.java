package ds.pamiw.backend.services;

import ds.pamiw.backend.models.Author;
import ds.pamiw.backend.models.Book;
import ds.pamiw.backend.repositories.AuthorRepository;
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
public class AuthorService {

    private final AuthorRepository authorRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public ServiceResponse<List<Author>> getAuthors() {
        try {
            List<Author> authorList = authorRepository.findAll().stream().toList();
            return new ServiceResponse<List<Author>>(authorList, true, "Books got");
        } catch (Exception e) {
            return new ServiceResponse<List<Author>>(null, false, "Error fetching books");
        }
    }

    public ServiceResponse<Author> addAuthor(Author author) {
        if (author.getId() != null) {
            Optional<Author> authorById = authorRepository.findById(author.getId());
            if (authorById.isPresent()) {
                return new ServiceResponse<>(null, false, "Author is already in the database");
            }
        }

        try {
            authorRepository.save(author);
            return new ServiceResponse<>(author, true, "Author added");
        } catch (Exception e) {
            return new ServiceResponse<>(null, false, "Error during adding author");
        }
    }

    public ServiceResponse<Author> updateAuthor(Author author, Long id) {
        Optional<Author> authorById = authorRepository.findById(id);
        if (!authorById.isPresent()) {
            return new ServiceResponse<>(null, false, "Author is not in the database");
        }

        author.setId(id);
        try {
            authorRepository.save(author);
            return new ServiceResponse<>(author, true, "Author updated");
        } catch (Exception e) {
            return new ServiceResponse<>(null, false, "Error while updating author");
        }
    }

    public ServiceResponse<Author> deleteAuthor(Long id) {
        Optional<Author> authorById = authorRepository.findById(id);
        if (!authorById.isPresent()) {
            return new ServiceResponse<>(null, false, "Author is not in the database");
        }

        try {
            authorRepository.deleteById(id);
            return new ServiceResponse<>(null, true, "Author deleted");
        } catch (Exception e) {
            return new ServiceResponse<>(null, false, "Error during deleting author");
        }
    }
}
