package ds.pamiw.backend.config;

import com.github.javafaker.Faker;
import ds.pamiw.backend.models.Author;
import ds.pamiw.backend.models.Book;
import ds.pamiw.backend.repositories.BookRepository;
import ds.pamiw.backend.repositories.AuthorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Locale;
import java.util.Random;

@Configuration
public class AppConfig {

    @Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository,AuthorRepository authorRepository) {
        return args -> {
//            Book lotr = new Book("Lord of the Rings",new Author("J.R.R.","Tolkien") ,1200,70.2,"https://m.media-amazon.com/images/I/91Yr0n5lNWL._AC_UF1000,1000_QL80_.jpg");
//            Book harryPotter=new Book("Harry Potter",new Author("J.K.","Rowling"),300,24.99,"https://cdn.kobo.com/book-images/f84bd7a6-b9e8-452d-92e9-2d35b6562ccd/353/569/90/False/harry-potter-i-kamien-filozoficzny.jpg");
//            Book hungerGames = new Book("Hunger Games",new Author("Suzanne","Collins"),750,117.2,"https://cdn.kobo.com/book-images/d7b259d7-270f-40f4-9fa4-4cf24f912687/1200/1200/False/the-hunger-games-trilogy.jpg");
//            Book atomicHabits=new Book("Atomic Habits",new Author("James","Clear"),320,19.99,"https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF894,1000_QL80_.jpg");
//            Book bloodSweatAndPixels = new Book("Blood, sweat and pixels",new Author("Jason","Schreier"),340,49.99,"https://m.media-amazon.com/images/I/81KFnMWdq7L._AC_UF1000,1000_QL80_.jpg");
//            Book pressReset=new Book("Press Reset",new Author("Jason","Schreier"),329,54.99,"https://m.media-amazon.com/images/I/81zhnN3yI1L._AC_UF1000,1000_QL80_.jpg");
//
//            bookRepository.saveAll(List.of(lotr,harryPotter,hungerGames,atomicHabits,bloodSweatAndPixels));

            Random random = new Random(123456l);
            Faker faker = new Faker(Locale.ENGLISH,random);
            for(int i=0;i<40;i++){
                Author author = generateFakeAuthor(faker);
                authorRepository.save(author);
                Book book = generateFakeBook(faker,author);
                bookRepository.save(book);
            }
        };
    }

    private Author generateFakeAuthor(Faker faker) {
        Author author = new Author();
        author.setFirstName(faker.name().firstName());
        author.setLastName(faker.name().lastName());

        return author;
    }
    private Book generateFakeBook(Faker faker,Author author) {
        Book book = new Book();
        book.setTitle(faker.book().title());
        book.setAuthor(author);
        book.setPageCount(faker.number().numberBetween(50, 1000));
        book.setPrice(faker.number().randomDouble(2, 5, 100));
        book.setPhotoUrl(faker.internet().image());

        return book;
    }

}
